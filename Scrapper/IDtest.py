import pandas as pd
import Scraper2

csv = pd.read_csv("./book30-listing-test.csv")
ids = csv['AMAZON ID'].values
images = csv['IMAGE URL'].values
title = csv['TITLE'].values
print(ids)


new_id = []
new_images = []
new_title = []
new_summaries = []

for i in range(len(ids)):
	sum = Scraper2.get_summary(ids[i])
	if sum != "":
		new_id.append(i)
		print(new_id)
