import urllib.request
import urllib.parse
import re
import json
import os
from bs4 import BeautifulSoup

PROGRAM_LINKS = [
    {"year": "14th", "url": "https://www.hems-workshop.org/14thWS/14thProgram.html"},
    {"year": "13th", "url": "https://www.hems-workshop.org/13thWS/13thProgram.html"},
    {"year": "12th", "url": "https://www.hems-workshop.org/12thWS_EUROHEMS/12thProgram.html"},
    {"year": "11th", "url": "https://www.hems-workshop.org/11thWS/11thProgram.html"},
    {"year": "10th", "url": "https://www.hems-workshop.org/10thWS/10thProgram.html"},
    {"year": "9th", "url": "https://www.hems-workshop.org/9thWS/9thProgram.html"},
    {"year": "8th", "url": "https://www.hems-workshop.org/8thWS/8thprogramwpresentations.html"},
    {"year": "7th", "url": "https://www.hems-workshop.org/7thWS/HEMS%207th%20Program.pdf"},
    {"year": "6th", "url": "https://www.hems-workshop.org/6thWS/6thprogrampresentations1.html"},
    {"year": "5th", "url": "https://www.hems-workshop.org/5thWS/5thprogrampresentations.html"},
    {"year": "4th", "url": "https://www.hems-workshop.org/4thWS/4thprogrampresentations.html"},
    {"year": "3rd", "url": "https://www.hems-workshop.org/3rdWS/3rdprogrampresentations.html"},
    {"year": "2nd", "url": "https://www.hems-workshop.org/2ndWS/2hems_program.pdf"},
    {"year": "1st", "url": "https://www.hems-workshop.org/1stWS/1hems_program.pdf"},
]

pdf_links = []

def clean_context(text):
    # Remove times
    text = re.sub(r'\d{1,2}:\d{2}\s*(am|pm)?', '', text, flags=re.IGNORECASE)
    # Remove generic words
    text = re.sub(r'\b(abstract|presentation|slides|download|pdf|ppt|poster|program)\b', '', text, flags=re.IGNORECASE)
    # Keep only alphanumeric
    text = re.sub(r'[^a-zA-Z0-9\s]', ' ', text)
    # Extract longest words
    words = [w.capitalize() for w in text.split() if len(w) > 2]
    # Use up to the last 4 words (often the speaker's name/org at the end of the line)
    return "_".join(words[-4:]) if words else ""

for item in PROGRAM_LINKS:
    url = item['url']
    year = item['year']
    print(f"Fetching {url} ...")
    
    if url.lower().endswith('.pdf'):
        pdf_links.append({
            "year": year, 
            "type": "Final_Program", 
            "url": url, 
            "expected_path": f"{year}/Program/{year}_Final_Program.pdf"
        })
        continue
    
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=10) as response:
            html = response.read().decode('utf-8', errors='ignore')
            soup = BeautifulSoup(html, 'html.parser')
            
            seen = set()
            for a_tag in soup.find_all('a', href=True):
                href = a_tag['href']
                ext = href.split('.')[-1].lower()
                
                if ext in ['pdf', 'ppt', 'pptx']:
                    absolute_url = urllib.parse.urljoin(url, href)
                    if absolute_url in seen:
                        continue
                    seen.add(absolute_url)
                    
                    link_text_raw = a_tag.get_text(strip=True)
                    link_text = link_text_raw.lower()
                    
                    if 'program' in link_text or 'program' in href.lower():
                        doc_type = 'Final_Program'
                        expected_filename = f"{year}_Final_Program.{ext}"
                        expected_path = f"{year}/Program/{expected_filename}"
                        
                        pdf_links.append({
                            "year": year, 
                            "type": doc_type, 
                            "url": absolute_url, 
                            "expected_path": expected_path
                        })
                        continue
                        
                    if 'abs' in link_text or 'abs' in href.lower():
                        doc_type = 'Abstract'
                    elif 'pres' in link_text or 'slide' in link_text or 'pres' in href.lower() or 'ppt' in ext:
                        doc_type = 'Presentation'
                    else:
                        doc_type = 'Oral_Presentation'
                        
                    parent = a_tag.find_parent(['tr', 'li', 'p'])
                    if not parent:
                        parent = a_tag.parent
                        
                    surrounding_text = parent.get_text(separator=' ', strip=True)
                    if link_text_raw:
                        surrounding_text = surrounding_text.replace(link_text_raw, ' ')
                        
                    context = clean_context(surrounding_text)
                    
                    if not context:
                        # Fallback: Maybe the context is in the preceding row (sometimes authors are in a row above)
                        prev_parent = parent.find_previous_sibling(['tr', 'li', 'p'])
                        if prev_parent:
                            context = clean_context(prev_parent.get_text(separator=' ', strip=True))
                            
                    if not context:
                        print(f"  [MALFORMED] Dropped {absolute_url} (No contextual metadata found)")
                        continue
                        
                    expected_filename = f"{year}_{context}_{doc_type}.{ext}"
                    expected_path = f"{year}/{doc_type}/{expected_filename}"
                    
                    pdf_links.append({
                        "year": year, 
                        "type": doc_type, 
                        "url": absolute_url, 
                        "expected_path": expected_path
                    })
                    
    except Exception as e:
        print(f"Error fetching {url}: {e}")

output_path = os.path.join(os.path.dirname(__file__), 'pdf_links.json')
with open(output_path, 'w') as f:
    json.dump(pdf_links, f, indent=2)

print(f"Extraction complete! Found {len(pdf_links)} valid artifact links.")
