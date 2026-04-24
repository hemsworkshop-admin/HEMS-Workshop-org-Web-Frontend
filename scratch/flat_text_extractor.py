import os
import requests
import io
from bs4 import BeautifulSoup
import PyPDF2
from urllib.parse import unquote

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
    2018: "https://www.hems-workshop.org/12thWS_EUROHEMS/12thProgram.html"
}

output_dir = r"c:\Antigravity\HEMS-website\docs\archives_translation\raw_text"

def extract_html(url):
    response = requests.get(url, verify=False)
    soup = BeautifulSoup(response.content, 'html.parser')
    tables = soup.find_all('table')
    
    # We want to extract text from all tables to capture the full program
    text = ""
    for table in tables:
        # Get all text, separated by spaces or newlines to maintain structure
        for row in table.find_all('tr'):
            row_text = []
            for cell in row.find_all(['td', 'th']):
                # get text, stripping whitespace
                cell_text = cell.get_text(separator=' ', strip=True)
                if cell_text:
                    row_text.append(cell_text)
            if row_text:
                text += " | ".join(row_text) + "\n"
        text += "\n" + "="*40 + "\n\n"
    
    if not tables:
        # Fallback to body text if no tables
        text = soup.body.get_text(separator='\n', strip=True) if soup.body else soup.get_text(separator='\n', strip=True)
        
    return text

def extract_pdf(url):
    response = requests.get(url, verify=False)
    with io.BytesIO(response.content) as open_pdf_file:
        reader = PyPDF2.PdfReader(open_pdf_file)
        text = ""
        for page_num in range(len(reader.pages)):
            text += reader.pages[page_num].extract_text() + "\n\n"
    return text

import urllib3
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

for year, url in links.items():
    print(f"Processing {year}...")
    try:
        if url.endswith('.pdf'):
            text = extract_pdf(url)
        else:
            text = extract_html(url)
            
        output_file = os.path.join(output_dir, f"{year}.txt")
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(text)
        print(f"  -> Saved {len(text)} characters to {output_file}")
    except Exception as e:
        print(f"  -> Failed to process {year}: {e}")
