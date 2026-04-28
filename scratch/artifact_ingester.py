import os
import json
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
import time

ws_links = {
    2022: "https://www.hems-workshop.org/14thWS/14thWS.html",
    2019: "https://www.hems-workshop.org/13thWS/13thWS.html",
    2018: "https://www.hems-workshop.org/12thWS_EUROHEMS/12thWS.html",
    2017: "https://www.hems-workshop.org/11thWS/11thWS.html",
    2015: "https://www.hems-workshop.org/10thWS/10thWS.html",
    2013: "https://www.hems-workshop.org/9thWS/9thWS.html",
    2011: "https://www.hems-workshop.org/8thWS/8thWS.html",
    2009: "https://www.hems-workshop.org/7thWS/7thWS.html",
    2007: "https://www.hems-workshop.org/6thWS/6thWS.html",
    2005: "https://www.hems-workshop.org/5thWS/5thWS.html",
    2003: "https://www.hems-workshop.org/4thWS/4thWS.html",
    2002: "https://www.hems-workshop.org/3rdWS/3rdWS.html",
    2001: "https://www.hems-workshop.org/2ndWS/2ndWS.html",
    1999: "https://www.hems-workshop.org/1stWS/1stWS.html"
}

data_dir = r"c:\Antigravity\HEMS-website\src\frontend\src\data\archives"
assets_base_dir = r"c:\Antigravity\HEMS-website\src\frontend\public\assets\archives"

def sanitize_filename(filename):
    # Remove weird characters but keep extension
    import re
    filename = requests.utils.unquote(filename)
    return re.sub(r'[^a-zA-Z0-9_\-\.]', '_', filename).lower()

def download_file(url, dest_path):
    if os.path.exists(dest_path):
        return True # already downloaded
    try:
        r = requests.get(url, stream=True, headers={'User-Agent': 'Mozilla/5.0'})
        r.raise_for_status()
        with open(dest_path, 'wb') as f:
            for chunk in r.iter_content(chunk_size=8192):
                f.write(chunk)
        return True
    except Exception as e:
        print(f"Failed to download {url}: {e}")
        return False

# For testing, we might want to restrict to a single year to verify
test_year = 2018

for year, ws_link in ws_links.items():
    if year != test_year:
        continue # ONLY run for 2017 to verify logic without downloading 5GB!
        
    print(f"--- Processing {year} ---")
    json_path = os.path.join(data_dir, f"{year}.json")
    if not os.path.exists(json_path):
        print(f"No JSON for {year}")
        continue
        
    with open(json_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    year_assets_dir = os.path.join(assets_base_dir, str(year))
    for sub in ['presentations', 'abstracts', 'documents', 'sponsors']:
        os.makedirs(os.path.join(year_assets_dir, sub), exist_ok=True)
        
    # 1. Download presentations and abstracts
    for day in data.get("schedule", []):
        for item in day.get("items", []):
            if item.get("type") == "session":
                for talk in item.get("talks", []):
                    # Presentation
                    p_url = talk.get("presentationUrl")
                    if p_url and p_url.startswith("http"):
                        fname = sanitize_filename(os.path.basename(urlparse(p_url).path))
                        local_path = os.path.join(year_assets_dir, "presentations", fname)
                        if download_file(p_url, local_path):
                            talk["presentationUrl"] = f"/assets/archives/{year}/presentations/{fname}"
                    # Abstract
                    a_url = talk.get("abstractUrl")
                    if a_url and a_url.startswith("http"):
                        fname = sanitize_filename(os.path.basename(urlparse(a_url).path))
                        local_path = os.path.join(year_assets_dir, "abstracts", fname)
                        if download_file(a_url, local_path):
                            talk["abstractUrl"] = f"/assets/archives/{year}/abstracts/{fname}"
                            
    # We should search BOTH the WS link and the Program link since they might be split
    # For Program link, we already parsed it earlier in link_extractor, but let's re-fetch it here
    program_link = None
    if "Program Book" in [r.get("label") for r in data.get("resources", [])]:
        program_link = next(r["url"] for r in data["resources"] if r["label"] == "Program Book" and not r["url"].startswith('/assets'))
        
    links_to_check = [ws_link]
    if program_link:
        links_to_check.append(program_link)
        
    for link_url in set(links_to_check):
        try:
            r = requests.get(link_url, headers={'User-Agent': 'Mozilla/5.0'})
            r.raise_for_status()
            soup = BeautifulSoup(r.text, 'html.parser')
            
            # Participant Contact Info
            for a in soup.find_all('a', href=True):
                text = a.get_text().lower()
                href = a['href']
                if 'participant' in text or 'contact information' in text or 'contactinfo' in href.lower() or 'participant' in href.lower() or 'roster' in text:
                    full_url = urljoin(link_url, href)
                    if full_url.endswith('.pdf'):
                        fname = sanitize_filename(os.path.basename(urlparse(full_url).path))
                        local_path = os.path.join(year_assets_dir, "documents", fname)
                        if download_file(full_url, local_path):
                            if "resources" not in data:
                                data["resources"] = []
                            if not any(r.get("label") == "Participant Contact Information" for r in data["resources"]):
                                data["resources"].append({
                                    "label": "Participant Contact Information",
                                    "url": f"/assets/archives/{year}/documents/{fname}",
                                    "icon": "Users"
                                })
                                print(f"Added Participant Contact Info: {fname}")
                                
            # Sponsor Logos
            if "sponsors" not in data:
                data["sponsors"] = []
                
            for img in soup.find_all('img'):
                src = img.get('src')
                if not src: continue
                alt = img.get('alt', '').lower()
                
                # Check if it looks like a sponsor logo
                if 'logo' in src.lower() or 'sponsor' in src.lower() or 'logo' in alt or 'sponsor' in alt:
                    full_url = urljoin(link_url, src)
                    fname = sanitize_filename(os.path.basename(urlparse(full_url).path))
                    local_path = os.path.join(year_assets_dir, "sponsors", fname)
                    if download_file(full_url, local_path):
                        logo_url = f"/assets/archives/{year}/sponsors/{fname}"
                        if not any(s.get("logoUrl") == logo_url for s in data["sponsors"]):
                            name = img.get('alt', fname.split('.')[0])
                            if not name: name = fname.split('.')[0]
                            data["sponsors"].append({
                                "name": name.title().replace('_', ' '),
                                "logoUrl": logo_url
                            })
                            print(f"Added Sponsor Logo: {fname}")
                            
        except Exception as e:
            print(f"Failed to process link {link_url}: {e}")

    # Write back
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
        
    print(f"Finished {year}")
