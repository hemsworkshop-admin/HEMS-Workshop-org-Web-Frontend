import urllib.request
import ssl

url = "https://www.hems-workshop.org/11thWS/quicklinkalpha.html"

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req, context=ctx) as response:
    html = response.read()
    with open('11thWS_quicklink.html', 'wb') as f:
        f.write(html)
