import json
import re
import os
from urllib.parse import unquote

links_file = r'c:\Antigravity\HEMS-website\scratch\pdf_links.json'
with open(links_file, 'r') as f:
    pdf_links = json.load(f)

with open(r'C:\Antigravity\HEMS-website\extracted_poster_links.txt', 'r') as f:
    poster_urls = [line.strip() for line in f if line.strip()]

updated_count = 0

for item in pdf_links:
    if item['url'] in poster_urls and item['type'] != 'Poster':
        item['type'] = 'Poster'
        # Update expected path to replace Abstract/Presentation with Poster
        # Example: 14th/Abstract/14th_..._Abstract.pdf -> 14th/Poster/14th_..._Poster.pdf
        path_parts = item['expected_path'].split('/')
        if len(path_parts) >= 2:
            path_parts[-2] = 'Poster' # Change directory
            
        filename = path_parts[-1]
        # Replace _Abstract or _Presentation with _Poster
        filename = re.sub(r'_(Abstract|Presentation|Oral_Presentation|Final_Program)\.', '_Poster.', filename)
        path_parts[-1] = filename
        
        item['expected_path'] = '/'.join(path_parts)
        updated_count += 1

with open(links_file, 'w') as f:
    json.dump(pdf_links, f, indent=2)

print(f"Successfully updated {updated_count} existing links to type 'Poster' in {links_file}.")
