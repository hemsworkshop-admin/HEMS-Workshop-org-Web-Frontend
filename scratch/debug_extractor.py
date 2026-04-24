import json
import os
import urllib.request
from bs4 import BeautifulSoup
import difflib

link = "https://www.hems-workshop.org/11thWS/11thProgram.html"
file_path = r"c:\Antigravity\HEMS-website\src\frontend\src\data\archives\2017.json"

with open(file_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

all_talks = []
for day in data.get("schedule", []):
    for item in day.get("items", []):
        if item.get("type") == "session":
            for talk in item.get("talks", []):
                all_talks.append(talk)

req = urllib.request.Request(link, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req) as response:
    html = response.read()

soup = BeautifulSoup(html, 'html.parser')
a_tags = soup.find_all('a', href=True)
print(f"Fetched HTML length: {len(html)}")
print(f"Found {len(a_tags)} a_tags with href.")

last_matched_talk = None
matches = 0

for a in a_tags:
    href = a['href'].strip()
    text = a.get_text(separator=" ", strip=True)
    if any(nav in href.lower() for nav in ['index.html', 'aboutus.html', 'archive.html', 'contact.html', 'join.html', 'sponsors.html', 'mailto:', '11thws.html']):
        continue
            
    print(f"Evaluating: {text.encode('utf-8', 'ignore')}")
        
    if "abstract" in text.lower():
        if last_matched_talk:
            last_matched_talk["abstractUrl"] = href
            print(f"Assigned Abstract: {last_matched_talk['title'][:30].encode('utf-8', 'ignore')}...")
        else:
            print(f"WARNING: Orphaned Abstract link: {href}")
        continue
        
    best_ratio = 0
    best_talk = None
    for talk in all_talks:
        title = talk["title"].lower().replace(' abstract', '')
        # Remove weird characters
        t_clean = ''.join(e for e in title if e.isalnum() or e.isspace())
        a_clean = ''.join(e for e in text.lower() if e.isalnum() or e.isspace())
        
        ratio = difflib.SequenceMatcher(None, a_clean, t_clean).ratio()
        
        if len(a_clean) > 10 and a_clean in t_clean:
            ratio = max(ratio, 0.85)
            
        if ratio > best_ratio:
            best_ratio = ratio
            best_talk = talk
            
    if best_ratio > 0.45 and best_talk:
        print(f"Matched {best_ratio:.2f}: '{text[:30].encode('utf-8', 'ignore')}' -> '{best_talk['title'][:30].encode('utf-8', 'ignore')}'")
        best_talk["presentationUrl"] = href
        last_matched_talk = best_talk
        matches += 1
    elif len(text) > 10:
        print(f"Failed to match: '{text.encode('utf-8', 'ignore')}'")
        
print(f"Total presentation matches: {matches}")
