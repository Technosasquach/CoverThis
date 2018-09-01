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


total = len(ids)
max = -1
if max > 0:
	total = max
counter = 0

for i in range(len(ids)):
	sum = Scraper2.get_summary(ids[i])
	if sum != "":
		#print(sum)
		new_id.append(ids[i])
		new_images.append(images[i])
		new_title.append(title[i])
		new_summaries.append(sum)
	max = max - 1
	if max == 0:
		break
		#printing to verify that it works
	counter = counter + 1
	print("--- WORKING --- (" + str(counter)+"/"+ str(total) + ")")

finalInformation= {"Title": new_title, "Images": new_images, "Summary": new_summaries}

df = pd.DataFrame(finalInformation, columns = ['Title', 'Images', 'Summary'])

#exporting data to csv file
df.to_csv('data.csv')
