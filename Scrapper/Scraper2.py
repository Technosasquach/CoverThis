import requests
from bs4 import BeautifulSoup
import re

def get_summary(id):
    yoat = ""
    url = 'https://www.amazon.com/dp/' + id
    headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'}
    page = requests.get(url, headers = headers)
    yeet = page.content.decode("utf-8")
    checker = re.findall(r"We're sorry. The Web address you entered is not a functioning page on our site", yeet, re.I|re.M)

    if(checker == []):
        matches = re.findall(r' \<noscript[\s\S]*?\/div', yeet, re.I |re.M)
        try:
            if(len(matches) > 1):
    	        text = matches[1]
    	        text = text[20:]
    	        text = text[:-5]
    	        text = text.replace("<li>", " ")
    	        yoat = text
        except ValueError:
            pass
    return yoat
