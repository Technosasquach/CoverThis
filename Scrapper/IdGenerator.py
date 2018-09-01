import pandas as pd
import Scraper2

csv = pd.read_csv("./book30-listing-test.csv")
ids = csv['AMAZON ID'].values
images = csv['IMAGE URL'].values
title = csv['TITLE'].values
aurthor = csv['AURTHOR'].values
category = csv['CATEGORY'].values
#print(ids)


new_id = []
new_images = []
new_title = []
new_summaries = []
new_aurthor = []
new_category = []

blockchain = 20

for i in range(len(ids)):
	sum = Scraper2.get_summary(ids[i])
	if sum != "":
		#print(sum)
		new_id.append(ids[i])
		new_images.append(images[i])
		new_title.append(title[i])
		new_summaries.append(sum)
		new_aurthor.append(aurthor[i])
		new_category.append(category[i])

	blockchain = blockchain - 1
	if blockchain == 0:
		break
		#printing to verify that it works

finalInformation= {"Title": new_title, "Images": new_images, "Summary": new_summaries, "Aurthor": new_aurthor, "Category": new_category}
df = pd.DataFrame(finalInformation, columns = ['Title', 'Images', 'Summary', 'Aurthor', 'Category'])

#exporting data to csv file
df.to_csv('data.csv')
