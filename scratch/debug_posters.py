import urllib.request
import ssl
from bs4 import BeautifulSoup

url = "https://www.hems-workshop.org/11thWS/quicklinkalpha.html"

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req, context=ctx) as response:
    html = response.read()
    soup = BeautifulSoup(html, 'html.parser')
    
    print("ALL TEXT WITH 'POSTER':")
    for text in soup.stripped_strings:
        if 'poster' in text.lower():
            print(text)
            
    print("\nALL LINKS:")
    for a in soup.find_all('a', href=True):
        print(a['href'], a.get_text().strip())
