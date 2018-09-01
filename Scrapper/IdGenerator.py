import pandas as pd
import Scraper2
import time

csv = pd.read_csv("./data_set2.csv", encoding = "ISO-8859-1")
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

def doit(s, e):

	total = len(ids)
	start = s
	end = e

	total = end - start
	counter = 0

	for i in range(start, end):
		sum = Scraper2.get_summary(ids[i])
		time.sleep(1)
		if sum != "":
			#print(sum)
			new_id.append(ids[i])
			new_images.append(images[i])
			new_title.append(title[i])
			new_summaries.append(sum)
			new_aurthor.append(aurthor[i])
			new_category.append(category[i])
			#printing to verify that it works

		counter = counter + 1
		print("--- WORKING --- (" + str(counter)+"/"+ str(total) + ")")



length = 1000
runningTotal = 0
while runningTotal < length:
	stat = runningTotal
	for i in range(20):
		runningTotal = runningTotal + 1
	en = runningTotal
	doit(stat, en)
	
	time.sleep(5)
	print("Break, running total is " + str(runningTotal))



finalInformation= {"Title": new_title, "Images": new_images, "Summary": new_summaries, "Aurthor": new_aurthor, "Category": new_category, "ID": new_id}
df = pd.DataFrame(finalInformation, columns = ['Title', 'Images', 'Summary', 'Aurthor', 'Category', 'ID'])
print("Finished 100%")


#exporting data to csv file
df.to_csv('data1.csv')
