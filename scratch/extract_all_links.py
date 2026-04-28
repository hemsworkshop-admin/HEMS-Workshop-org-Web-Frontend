import urllib.request
import ssl
from bs4 import BeautifulSoup
import json
import urllib.parse

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

all_links = []

for url in urls:
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, context=ctx) as response:
            # Read and handle bad encodings
            html = response.read().decode('utf-8', errors='replace')
            soup = BeautifulSoup(html, 'html.parser')
            
            for a in soup.find_all('a', href=True):
                href = a['href']
                text = a.get_text().strip()
                full_url = urllib.parse.urljoin(url, href)
                
                # We want to identify posters. Let's just collect all .pdf or .ppt or .pptx links
                # and later we can filter them.
                if full_url.lower().endswith(('.pdf', '.ppt', '.pptx', '.doc', '.docx')):
                    all_links.append({
                        "source": url,
                        "text": text,
                        "url": full_url
                    })
    except Exception as e:
        print(f"Error fetching {url}: {e}")

with open('all_extracted_links.json', 'w', encoding='utf-8') as f:
    json.dump(all_links, f, indent=2)
print(f"Extracted {len(all_links)} file links to all_extracted_links.json")
