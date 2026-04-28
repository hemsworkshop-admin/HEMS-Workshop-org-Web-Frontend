import glob
from bs4 import BeautifulSoup
import re

for file in sorted(glob.glob('page_*.html')):
    with open(file, 'rb') as f:
        html = f.read().decode('utf-8', errors='replace')
        soup = BeautifulSoup(html, 'html.parser')
        
        poster_links = []
        for a in soup.find_all('a', href=True):
            href = a['href']
            text = a.get_text()
            if 'poster' in href.lower() or 'poster' in text.lower():
                poster_links.append(href)
        
        if poster_links:
            print(f"{file} has posters: {poster_links}")
        else:
            print(f"{file} has NO posters.")
