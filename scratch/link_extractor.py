import json
import os
import requests
from bs4 import BeautifulSoup
import difflib

links = {
    1999: "https://www.hems-workshop.org/1stWS/1hems_program.pdf",
    2001: "https://www.hems-workshop.org/2ndWS/2hems_program.pdf",
    2002: "https://www.hems-workshop.org/3rdWS/3rdprogrampresentations.html",
    2003: "https://www.hems-workshop.org/4thWS/4thprogrampresentations.html",
    2005: "https://www.hems-workshop.org/5thWS/5thprogrampresentations.html",
    2007: "https://www.hems-workshop.org/6thWS/6thprogrampresentations1.html",
    2009: "https://www.hems-workshop.org/7thWS/HEMS%207th%20Program.pdf",
    2011: "https://www.hems-workshop.org/8thWS/8thprogramwpresentations.html",
    2013: "https://www.hems-workshop.org/9thWS/9thProgram.html",
    2015: "https://www.hems-workshop.org/10thWS/10thProgram.html",
    2017: "https://www.hems-workshop.org/11thWS/11thProgram.html",
    2018: "https://www.hems-workshop.org/12thWS_EUROHEMS/12thProgram.html",
    2019: "https://www.hems-workshop.org/13thWS/13thProgram.html",
    2022: "https://www.hems-workshop.org/14thWS/14thProgram.html"
}

data_dir = r"c:\Antigravity\HEMS-website\src\frontend\src\data\archives"

def resolve_url(base, url):
    if url.startswith("http"):
        return url
    from urllib.parse import urljoin
    return urljoin(base, url)

for year, link in links.items():
    if link.endswith(".pdf"):
        print(f"Skipping {year} because program is a PDF (no HTML to parse).")
        continue
    
    file_path = os.path.join(data_dir, f"{year}.json")
    if not os.path.exists(file_path):
        continue
        
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    all_talks = []
    for day in data.get("schedule", []):
        for item in day.get("items", []):
            if item.get("type") == "session":
                for talk in item.get("talks", []):
                    all_talks.append(talk)
                    
    try:
        response = requests.get(link, headers={'User-Agent': 'Mozilla/5.0'})
        response.raise_for_status()
        html = response.text
    except Exception as e:
        print(f"Failed to fetch {link}: {e}")
        continue
        
    soup = BeautifulSoup(html, 'html.parser')
    a_tags = soup.find_all('a', href=True)
    
    last_matched_talk = None
    matches = 0
    
    for a in a_tags:
        href = a['href'].strip()
        text = a.get_text(separator=" ", strip=True)
        
        # skip nav links
        if any(nav in href.lower() for nav in ['index.html', 'aboutus.html', 'archive.html', 'contact.html', 'join.html', 'sponsors.html', 'mailto:']):
            continue
            
        full_url = resolve_url(link, href)
        
        if "abstract" in text.lower():
            if last_matched_talk:
                last_matched_talk["abstractUrl"] = full_url
            continue
            
        best_ratio = 0
        best_talk = None
        for talk in all_talks:
            title = talk["title"].lower().replace(' abstract', '')
            t_clean = ''.join(e for e in title if e.isalnum() or e.isspace())
            a_clean = ''.join(e for e in text.lower() if e.isalnum() or e.isspace())
            
            ratio = difflib.SequenceMatcher(None, a_clean, t_clean).ratio()
            
            # Boost if exact substring found
            if len(a_clean) > 10 and a_clean in t_clean:
                ratio = max(ratio, 0.85)
                
            if ratio > best_ratio:
                best_ratio = ratio
                best_talk = talk
                
        if best_ratio > 0.45 and best_talk:
            best_talk["presentationUrl"] = full_url
            last_matched_talk = best_talk
            matches += 1
        elif href.lower().endswith(".pdf") and last_matched_talk and len(text) < 10:
            pass

    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print(f"Updated {year} with {matches} extracted links.")
