import panda as pd
import re

#Reading files and splitting the data arrays 
csv = pd.read_csv("data.csv")
ids = csv['ID'].values
images = csv['Images'].values
title = csv['Title'].values
aurthor = csv['Aurthor'].values
category = csv['Category'].values
summary = csv['Summary']

#creating new arrays for the clean product to be placed in
final_id = []
final_title = []
final_images = []
final_aurthor = []
final_category = []
final_summary = []


#creating a for loop to clean all individual components
for i in range(len(ids)):
	#clearing data for summary
	summaryFinal = re.sub(r'<[\s\S]*?>', " ", summary[i])
	final_summary.append(summaryFinal[i])
	#code for all the other bits of data
	"""titleFinal = re.sub(r'<[sS]*?>', " ", title[i])
	imageFinal = re.sub(r'<[sS]*?>', " ", images[i])
	idFinal = re.sub(r'<[sS]*?>', " ", ids[i])
	aurthorFinal = re.sub(r'<[sS]*?>', " ", aurthor[i])
	categoryFinal = re.sub(r'<[sS]*?>', " ", category[i])"""
	final_id.append(ids[i])
	final_title.append(title[i])
	final_images.append(images[i])
	final_aurthor.append(aurthor[i])
	final_category.append(category[i])
	max = max - 1
	if max == 0:
		break
		#printing to verify that it works
	counter = counter + 1
	print("--- WORKING --- (" + str(counter)+"/"+ str(total) + ")")
	
finalInformation= {"Title": final_title, "Images": final_images, "Summary": final_summaries, "Aurthor": final_aurthor, "Category": final_category, "ID": final_ids}
df = pd.DataFrame(finalInformation, columns = ['Title', 'Images', 'Summary', 'Aurthor', 'Category', 'ID'])
print("Finished 100%")
