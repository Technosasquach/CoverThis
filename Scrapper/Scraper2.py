import requests
from bs4 import BeautifulSoup
import re

def get_summary(id):
    yoat = ""
    url = 'https://www.amazon.com.au/dp/' + id
    page = requests.get(url)
    yeet = page.content.decode("utf-8")
    checker = re.findall(r"We're sorry. The Web address you entered is not a functioning page on our site", yeet, re.I|re.M)

    if(checker == []):
        matches = re.findall(r' <noscript[\s\S]*?\/', yeet, re.I |re.M)
        if(matches != []):
	        text = matches[0]
	        text = text[20:]
	        text = text[:-2]
	        text = text.replace("<li>", " ")
	        yoat = text
    return yoat
