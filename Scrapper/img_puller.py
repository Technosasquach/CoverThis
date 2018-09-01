import pandas as pd
from skimage import io
from tqdm import tqdm

csv = pd.read_csv("./dataF.csv")

for url, ID in tqdm(zip(csv["Images"].values, csv["ID"].values)):
	try:
		img = io.imread(url)
		io.imsave("./imgs/"+ID+".jpg", img)
	except Exception as e:
		print(e)
