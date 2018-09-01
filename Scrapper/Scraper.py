#import all the required modules
import re
import csv
from urllib.request import urlopen
from bs4 import BeautifulSoup
import sys
import warnings
from requests_html import HTMLSession

#declare a session object
session = HTMLSession()

#ignore warnings
if not sys.warnoptions:
    warnings.simplefilter("ignore")

url_array=[] #array for urls
asin_array=[] #array for asin numbers
with open('asin_list.csv', 'r') as csvfile:
    asin_reader = csv.reader(csvfile)
    for row in asin_reader:
        url_array.append(row[0]) #This url list is an array containing all the urls from the excel sheet

#The ASIN Number will be between the dp/ and another /
start = 'dp/'
end = '/'
for url in url_array:
    asin_array.append(url[url.find(start)+len(start):url.rfind(end)]) #this array has all the asin numbers

#declare the header.
headers = {
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36'
    }

all_items=[] #The final 2D list containing prices and details of products, that will be converted to a consumable csv

for asin in asin_array:
    item_array=[] #An array to store details of a single product.
    amazon_url="https://www.amazon.com/dp/"+asin #The general structure of a url
    response = session.get(amazon_url, headers=headers, verify=False) #get the response
    item_array.append(response.html.search('a-color-price">${}<')[0]) #Extracting the price
    print(response.body)
    #Extracting the text containing the product details
    details=(response.html.search('P.when("ReplacementPartsBulletLoader").execute(function(module){ module.initializeDPX(); }){}</ul>;')[0])
    details_arr=[] #Declaring an array to store individual details
    details=re.sub("\n|\r", "", details) #Separate the details from text
    details_arr=re.findall(r'\>(.*?)\<', details) #Store details in the array.
    for i,row in enumerate(details_arr):
        details_arr[i]=row.replace("\t","") #Remove tabs from details
    details_arr=list(filter(lambda a: a != '', details_arr)) #Remove empty spaces.
    details_arr=[row.strip() for row in details_arr] #Remove trailing and starting spaces.

    #Store the details with the price in the same row
    for row in details_arr:
        item_array.append(row)
    #Append this array to the master-array of items
    all_items.append(item_array)

#Convert mmaster array to csv
with open("new_file.csv","w+", encoding="utf-8") as my_csv:
    csvWriter = csv.writer(my_csv,delimiter=',')
    csvWriter.writerows(all_items)
