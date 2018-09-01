import panda as pd
import re

#Reading files and splitting the data arrays 
csv = pd.read_csv("data.csv")
ids = csv['AMAZON ID'].values
images = csv['IMAGE URL'].values
title = csv['TITLE'].values
aurthor = csv['AURTHOR'].values
category = csv['CATEGORY'].values

#creating new arrays for the clean product to be placed in
final_id = []
final_title = []
final_images = []
final_aurthor = []
final_category = []


#creating a for loop to clean all individual components
for i in range(len(ids)):
	titleFinal = re.sub(r'<[\s\S]*?>', " ", title[i])
	imageFinal = re.sub(r'<[\s\S]*?>', " ", images[i])
	idFinal = re.sub(r'<[\s\S]*?>', " ", ids[i])
	aurthorFinal = re.sub(r'<[\s\S]*?>', " ", aurthor[i])
	categoryFinal = re.sub(r'<[\s\S]*?>', " ", category[i])
	final_id.append(ids[i])
	final_title.append(title[i])
	final_images.append(images[i])
	final_aurthor.append(aurthor[i])
	final_category.append(category[i])
	