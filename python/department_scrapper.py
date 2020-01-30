import requests
import urllib.request
import time
from bs4 import BeautifulSoup

url = 'https://www.colgate.edu/academics/course-offerings#/'
response = requests.get(url)

soup = BeautifulSoup(response.text, "html.parser")
print (soup)