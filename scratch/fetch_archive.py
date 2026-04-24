import urllib.request
with urllib.request.urlopen('https://www.hems-workshop.org/Archive.html') as response:
    html = response.read().decode('utf-8')
with open('scratch/archive.html', 'w', encoding='utf-8') as f:
    f.write(html)
