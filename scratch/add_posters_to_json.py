import json
import re
import os
from urllib.parse import unquote

links_file = r'c:\Antigravity\HEMS-website\scratch\pdf_links.json'
with open(links_file, 'r') as f:
    pdf_links = json.load(f)

with open(r'C:\Antigravity\HEMS-website\extracted_poster_links.txt', 'r') as f:
    poster_urls = [line.strip() for line in f if line.strip()]

added_count = 0

for url in poster_urls:
    # Extract year:
    match = re.search(r'/(\d+(?:st|nd|rd|th))WS(?:_EUROHEMS)?/', url)
    if match:
        year = match.group(1)
    else:
        year = "Unknown"
        
    # Extract filename/author part
    if '#' in url:
        base, hash_part = url.split('#', 1)
        name_part = hash_part
        ext = ".htm"
    else:
        filename = unquote(url.split('/')[-1])
        name_part, ext = os.path.splitext(filename)
        
    name_part = name_part.replace(' ', '_').replace('%20', '_')
    
    # Clean up name_part
    name_part = re.sub(r'[^A-Za-z0-9_]', '', name_part)
    if not name_part:
        name_part = "Poster"
        
    expected_path = f"{year}/Poster/{year}_{name_part}_Poster{ext}"
    
    # Check if this exact url is already in pdf_links
    if not any(item['url'] == url for item in pdf_links):
        pdf_links.append({
            "year": year,
            "type": "Poster",
            "url": url,
            "expected_path": expected_path
        })
        added_count += 1

with open(links_file, 'w') as f:
    json.dump(pdf_links, f, indent=2)

print(f"Successfully added {added_count} poster links to {links_file}.")
