import urllib.request
import ssl
from bs4 import BeautifulSoup
import json
import re

urls = [
    "https://www.hems-workshop.org/14thWS/quicklinkalpha.html",
    "https://www.hems-workshop.org/13thWS/quicklinkalpha.html",
    "https://www.hems-workshop.org/11thWS/quicklinkalpha.html",
    "https://www.hems-workshop.org/10thWS/quicklinkalpha.html",
    "https://www.hems-workshop.org/9thWS/quicklinkalpha.html",
    "https://www.hems-workshop.org/8thWS/quicklinkalpha.html",
    "https://www.hems-workshop.org/7thWS/quicklinkalpha1.html",
    "https://www.hems-workshop.org/6thWS/quicklinkalpha.html",
    "https://www.hems-workshop.org/5thWS/5thquicklinksalpha.html",
    "https://www.hems-workshop.org/4thWS/4thquicklinksauthor.html",
    "https://www.hems-workshop.org/3rdWS/3rdquicklinksalpha.html",
    "https://www.hems-workshop.org/2ndWS/2ndquicklinksalpha.html"
]

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

poster_links = []

for url in urls:
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, context=ctx) as response:
            html = response.read()
            soup = BeautifulSoup(html, 'html.parser')
            for a in soup.find_all('a', href=True):
                href = a['href']
                text = a.get_text().strip()
                # Check if poster is in text or href
                if 'poster' in text.lower() or 'poster' in href.lower():
                    # Resolve relative URLs
                    full_url = urllib.parse.urljoin(url, href)
                    poster_links.append({"url": full_url, "text": text, "source": url})
    except Exception as e:
        print(f"Error fetching {url}: {e}")

print(json.dumps(poster_links, indent=2))
