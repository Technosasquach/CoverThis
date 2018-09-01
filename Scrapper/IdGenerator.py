import pandas as pd
import Scraper2
import time
import codecs

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

		if sum != "":
			#print(sum)
			sum = sum.encode('utf-8')
			f = codecs.open('yeet/'+ids[i]+'.txt','w','utf-8')
			f.write(str(title[i]) + ',' + str(images[i]) + ',"' + str(sum) + '",' + str(aurthor[i]) + ',' + str(category[i]) + ',' + str(ids[i]))
			f.close()

			new_id.append(ids[i])
			new_images.append(images[i])
			new_title.append(title[i])
			new_summaries.append(sum)
			new_aurthor.append(aurthor[i])
			new_category.append(category[i])
			#printing to verify that it works

		counter = counter + 1
		print("--- WORKING --- (" + str(counter)+"/"+ str(total) + ") --- " + str(runningTotal))



length = 8001
runningTotal = 6001
while runningTotal < length:
	stat = runningTotal
	for i in range(20):
		runningTotal = runningTotal + 1
	en = runningTotal
	doit(stat, en)

	print("Break, running total is " + str(runningTotal))



finalInformation= {"Title": new_title, "Images": new_images, "Summary": new_summaries, "Aurthor": new_aurthor, "Category": new_category, "ID": new_id}
df = pd.DataFrame(finalInformation, columns = ['Title', 'Images', 'Summary', 'Aurthor', 'Category', 'ID'])
print("Finished 100%")


#exporting data to csv file
df.to_csv('data4.csv')
