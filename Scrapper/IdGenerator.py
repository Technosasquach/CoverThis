import pandas as pd
import Scraper2

csv = pd.read_csv("./book30-listing-test.csv")
ids = csv['AMAZON ID'].values
images = csv['IMAGE URL'].values
title = csv['TITLE'].values
#print(ids)


new_id = []
new_images = []
new_title = []
new_summaries = []

blockchain = 10

for i in range(len(ids)):
	sum = Scraper2.get_summary(ids[i])
	if sum != "":
		#print(sum)
		new_id.append(ids[i])
		new_images.append(images[i])
		new_title.append(title[i])
		new_summaries.append(sum)
	blockchain = blockchain - 1
	if blockchain == 0:
		break
		#printing to verify that it works


for i in range(len(new_id)):
	df = {"Title": new_title[i], "Images_Link": new_images[i], "Summary": new_summaries[i]}

#exporting data to csv file	
df.to_csv('data.csv', sep=',', encoding='utf-8')

