import urllib.request
with urllib.request.urlopen("https://www.hems-workshop.org/13thWS/13thProgram.html") as response:
    html = response.read().decode('utf-8')
with open("src/frontend/13thprogram.html", "w", encoding='utf-8') as f:
    f.write(html)
