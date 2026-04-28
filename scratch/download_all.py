import urllib.request
import ssl
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

for i, url in enumerate(urls):
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, context=ctx) as response:
            html = response.read()
            with open(f"page_{i}.html", "wb") as f:
                f.write(html)
    except Exception as e:
        print(f"Failed {url}: {e}")
