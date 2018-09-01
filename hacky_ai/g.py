import argparse
import os
import random
import torch
import torch.nn as nn
import torch.nn.parallel
import torch.backends.cudnn as cudnn
import torch.optim as optim
import torch.utils.data
import torchvision.datasets as dset
import torchvision.transforms as transforms
import torchvision.utils as vutils
import gensim
import pandas as pd
import numpy as np
import scipy
from skimage import io
from gensim.models.doc2vec import Doc2Vec, TaggedDocument

random.seed(2018)
torch.manual_seed(2018)

netGp = ''
netDp = ''
outf = '.'
beta1 = 0.5
lr = 25
niter = 25
batchSize = 64
imageSize = 64
workers = 2


ngpu = 64
nz = 64
ngf = 64
ndf = 64
nc = 3

class DS(torch.utils.data.Dataset):
    def __init__(self, csv_path, d2v, transform=None):
        self.csv = pd.read_csv(csv_path)
        self.titles = self.csv['Title']
        self.vecs = [d2v.infer_vector(doc) for doc in self.titles]
        self.urls = self.csv['Image Link']
        self.transform = transform
    
    def __getitem__(self, idx):
        # img = io.imread(self.urls[idx], as_gray=False)
        img = scipy.misc.face()
        if self.transform is not None:
            img = self.transform(img)
        
        vec = self.vecs[idx]
        return img, torch.Tensor(vec)
    
    def __len__(self):
        return 10

from nltk import RegexpTokenizer
toker = RegexpTokenizer('[a-zA-Z]\w+\'?\w*')

# d2v = gensim.models.Doc2Vec.load("./title.doc2vec")

d2v = Doc2Vec(vector_size=nz)
csv = pd.read_csv('./temp.csv')
docs = csv['Title'].values
d2v.build_vocab([TaggedDocument(toker.tokenize(doc), [i]) for i, doc in enumerate(docs)])
d2v.save('./title.doc2vec')

tfms = transforms.Compose([transforms.ToPILImage(), transforms.Resize((imageSize, imageSize)), transforms.ToTensor()])
dataset = DS("./temp.csv", d2v, transform=tfms)

# breakpoint()

# dataset = dset.FakeData(image_size=(3, imageSize, imageSize), transform=transforms.ToTensor())
dataloader = torch.utils.data.DataLoader(dataset, batch_size=batchSize, shuffle=True, num_workers=2)

# custom weights initialization called on netG and netD
def weights_init(m):
    classname = m.__class__.__name__
    if classname.find('Conv') != -1:
        m.weight.data.normal_(0.0, 0.02)
    elif classname.find('BatchNorm') != -1:
        m.weight.data.normal_(1.0, 0.02)
        m.bias.data.fill_(0)


class Generator(nn.Module):
    def __init__(self, ngpu):
        super(Generator, self).__init__()
        self.ngpu = ngpu
        self.main = nn.Sequential(
            # input is Z, going into a convolution
            nn.ConvTranspose2d(     nz, ngf * 8, 4, 1, 0, bias=False),
            nn.BatchNorm2d(ngf * 8),
            nn.ReLU(True),
            # state size. (ngf*8) x 4 x 4
            nn.ConvTranspose2d(ngf * 8, ngf * 4, 4, 2, 1, bias=False),
            nn.BatchNorm2d(ngf * 4),
            nn.ReLU(True),
            # state size. (ngf*4) x 8 x 8
            nn.ConvTranspose2d(ngf * 4, ngf * 2, 4, 2, 1, bias=False),
            nn.BatchNorm2d(ngf * 2),
            nn.ReLU(True),
            # state size. (ngf*2) x 16 x 16
            nn.ConvTranspose2d(ngf * 2,     ngf, 4, 2, 1, bias=False),
            nn.BatchNorm2d(ngf),
            nn.ReLU(True),
            # state size. (ngf) x 32 x 32
            nn.ConvTranspose2d(    ngf,      nc, 4, 2, 1, bias=False),
            nn.Tanh()
            # state size. (nc) x 64 x 64
        )

    def forward(self, input):
        if input.is_cuda and self.ngpu > 1:
            output = nn.parallel.data_parallel(self.main, input, range(self.ngpu))
        else:
            output = self.main(input)
        return output


netG = Generator(ngpu)
netG.apply(weights_init)
if netGp != '':
    netG.load_state_dict(torch.load(netGp))
# print(netG)


class Discriminator(nn.Module):
    def __init__(self, ngpu):
        super(Discriminator, self).__init__()
        self.ngpu = ngpu
        self.main = nn.Sequential(
            # input is (nc) x 64 x 64
            nn.Conv2d(nc, ndf, 4, 2, 1, bias=False),
            nn.LeakyReLU(0.2, inplace=True),
            # state size. (ndf) x 32 x 32
            nn.Conv2d(ndf, ndf * 2, 4, 2, 1, bias=False),
            nn.BatchNorm2d(ndf * 2),
            nn.LeakyReLU(0.2, inplace=True),
            # state size. (ndf*2) x 16 x 16
            nn.Conv2d(ndf * 2, ndf * 4, 4, 2, 1, bias=False),
            nn.BatchNorm2d(ndf * 4),
            nn.LeakyReLU(0.2, inplace=True),
            # state size. (ndf*4) x 8 x 8
            nn.Conv2d(ndf * 4, ndf * 8, 4, 2, 1, bias=False),
            nn.BatchNorm2d(ndf * 8),
            nn.LeakyReLU(0.2, inplace=True),
            # state size. (ndf*8) x 4 x 4
            nn.Conv2d(ndf * 8, 1, 4, 1, 0, bias=False),
            nn.Sigmoid()
        )

    def forward(self, input):
        if input.is_cuda and self.ngpu > 1:
            output = nn.parallel.data_parallel(self.main, input, range(self.ngpu))
        else:
            output = self.main(input)

        return output.view(-1, 1).squeeze(1)



netD = Discriminator(ngpu)
netD.apply(weights_init)
if netDp != '':
    netD.load_state_dict(torch.load(netDp))
# print(netD)

criterion = nn.BCELoss()

fixed_noise = torch.randn(batchSize, nz, 1, 1)
real_label = 1
fake_label = 0

# setup optimizer
optimizerD = optim.Adam(netD.parameters(), lr=lr, betas=(beta1, 0.999))
optimizerG = optim.Adam(netG.parameters(), lr=lr, betas=(beta1, 0.999))

if __name__ == "__main__":
    print("beginning training")
    for epoch in range(niter):
        for i, data in enumerate(dataloader):
            print("================================")
            ############################
            # (1) Update D network: maximize log(D(x)) + log(1 - D(G(z)))
            ###########################
            # train with real
            netD.zero_grad()
            real_cpu = data[0]
            batch_size = real_cpu.size(0)
            label = torch.full((batch_size,), real_label)

            output = netD(real_cpu)
            errD_real = criterion(output, label)
            errD_real.backward()
            D_x = output.mean().item()

            # train with fake
            noise = torch.randn(batch_size, nz, 1, 1)
            fake = netG(noise)
            label.fill_(fake_label)
            output = netD(fake.detach())
            errD_fake = criterion(output, label)
            errD_fake.backward()
            D_G_z1 = output.mean().item()
            errD = errD_real + errD_fake
            optimizerD.step()

            ############################
            # (2) Update G network: maximize log(D(G(z)))
            ###########################
            netG.zero_grad()
            label.fill_(real_label)  # fake labels are real for generator cost
            output = netD(fake)
            errG = criterion(output, label)
            errG.backward()
            D_G_z2 = output.mean().item()
            optimizerG.step()

            print('[%d/%d][%d/%d] Loss_D: %.4f Loss_G: %.4f D(x): %.4f D(G(z)): %.4f / %.4f'
                % (epoch, niter, i, len(dataloader),
                    errD.item(), errG.item(), D_x, D_G_z1, D_G_z2))
            if i % 100 == 0:
                vutils.save_image(real_cpu,
                        '%s/real_samples.png' % outf,
                        normalize=True)
                fake = netG(fixed_noise)
                vutils.save_image(fake.detach(),
                        '%s/fake_samples_epoch_%03d.png' % (outf, epoch),
                        normalize=True)

        # do checkpointing
        torch.save(netG.state_dict(), '%s/netG_epoch_%d.pth' % (outf, epoch))
        torch.save(netD.state_dict(), '%s/netD_epoch_%d.pth' % (outf, epoch))
