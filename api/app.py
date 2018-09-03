from flask import Flask, request, jsonify
from sklearn.externals import joblib
from scipy.spatial.distance import euclidean
import numpy as np
import pandas as pd
from skimage import io
from numpy.random import randint
from random import choice
import base64
from flask_cors import CORS

df = pd.read_csv("./TheGreatCombination.csv")

app = Flask(__name__)
CORS(app)

img_folder = "./combo_imgs"
df = pd.read_csv("TheGreatCombination.csv", index_col=0)
df['path'] = df['ID'].apply(lambda s: f"{img_folder}/{s}.jpg")

tsne = joblib.load("./tsne3D.model")
lda_model = joblib.load("./lda.model")
cv = joblib.load("./cv.model")

lda_points = lda_model.transform(cv.transform(df["Summary"]))

k = 10

def s_to_tsne_space_knn(s, cv, lda_model, lda_points, tsne_points, k):
    # calculate distances
    ldcvs = lda_model.transform(cv.transform([s]))
    dists = list(map(lambda p: euclidean(p, ldcvs), lda_points))
    
    k_nearest_idxs = []
    lda_points_list = lda_points.tolist()
    # find the knn
    for _ in range(k):
        closest_idx = np.argmin(dists)
        lda_points_list.pop(closest_idx)
        k_nearest_idxs.append(closest_idx)

    # do a mean on the values of the knn
    return np.stack([tsne_points[idx] for idx in k_nearest_idxs]).mean(axis=0)

def generate(text, lda_model, cv, df, k=5):
    point = np.nan_to_num(lda_model.transform(cv.transform([text])))
    lda_points = np.nan_to_num(lda_model.transform(cv.transform(df['Summary'])))
        
    dists = list(map(lambda p: euclidean(p, point), lda_points))
    closest_idxs = []
    for _ in range(k):
        closest_idx = np.argmin(dists)
        dists.pop(closest_idx)
        closest_idxs.append(closest_idx)
    
    imgs = [io.imread(df.iloc[idx]['path']) for idx in closest_idxs]
    imgs = [img/np.max(img) for img in imgs]
    canvas = np.full((600, 450, 3), np.nan)
    
    iters = 0
    for _ in range(400):
        source = choice(imgs)
        cols, rows, chans = source.shape
        sxs = randint(0, rows, 2)
        syys = randint(0, cols, 2)
        patch = source[min(sxs):max(sxs), min(syys):max(syys)]
        try:
            pass
#             patch = ft.gaussian(rotate(swirl(patch, strength=np.sqrt(randint(0,50)), mode='reflect'), randint(0, 1)))
        except ValueError:
            continue

        ydif, xdif, c = patch.shape

        cols, rows, chans = canvas.shape
        cx = randint(0, rows)
        cy = randint(0, cols)
        try:
            canvas[cx:cx+patch.shape[0], cy:cy+patch.shape[1]] = patch
        except ValueError:
            continue
    canvas = np.nan_to_num(canvas)

    return canvas

@app.route("/visualiseds")
def visualiseds():
    return "404"

@app.route("/generateCover", methods=['GET', 'POST'])
def generateCover():
    text = request.json['summary']
    point = s_to_tsne_space_knn(text, cv, lda_model, lda_points, tsne.embedding_, k)
    point = list(map(float, point))
    img = generate(text, lda_model, cv, df)
    io.imsave("./tempimg.jpg", img)
    to_send = base64.b64encode(open("./tempimg.jpg", 'rb').read()).decode('UTF-8')
    return jsonify({
        "d1": point[0],
        "d2": point[1],
        "d3": point[2],
        "image": to_send
    }), 200

if __name__ == "__main__":
    app.run(debug=True)