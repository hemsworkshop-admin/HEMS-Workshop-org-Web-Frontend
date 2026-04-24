import json
import os

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

for year, link in links.items():
    file_path = os.path.join(data_dir, f"{year}.json")
    if os.path.exists(file_path):
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        valid_resources = []
        for res in data.get("resources", []):
            if res["label"] == "Abstracts & Presentations":
                res["url"] = link
                res["label"] = "Program Book"
                res["icon"] = "Download" if link.endswith(".pdf") else "FileText"
                valid_resources.append(res)
            elif res["url"] != "#":
                valid_resources.append(res)
                
        # Fallback if label didn't match
        if not any(r["url"] == link for r in valid_resources):
            valid_resources.insert(0, {
                "label": "Program Book",
                "url": link,
                "icon": "Download" if link.endswith(".pdf") else "FileText"
            })
            
        data["resources"] = valid_resources
        
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        print(f"Updated {year}.json")
