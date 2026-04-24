import os
import urllib.request
import re
from bs4 import BeautifulSoup

def process_links(file_path, out_dir):
    os.makedirs(out_dir, exist_ok=True)
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    skipped_files = []
    processed_count = 0

    for line in lines:
        url = line.strip()
        if not url.startswith('http'):
            continue
            
        if url.lower().endswith('.pdf'):
            skipped_files.append(url)
            print(f"Skipping PDF: {url}")
            continue
            
        print(f"Processing {url}")
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req) as response:
                html = response.read()
            
            soup = BeautifulSoup(html, 'html.parser')
            
            # Protocol: "Read the text of the table on the provided URL only... Treat the page as a flat text document and ignore its structure."
            tables = soup.find_all('table')
            if tables:
                text = '\n'.join([t.get_text(separator='\n', strip=True) for t in tables])
            else:
                body = soup.body if soup.body else soup
                text = body.get_text(separator='\n', strip=True)
            
            # Clean up empty lines
            lines_cleaned = [l.strip() for l in text.split('\n') if l.strip()]
            final_text = '\n'.join(lines_cleaned)
            
            filename = url.split('/')[-1]
            if not filename.endswith('.md') and not filename.endswith('.txt'):
                filename = filename.replace('.html', '.md').replace('.htm', '.md')
            
            out_path = os.path.join(out_dir, filename)
            with open(out_path, 'w', encoding='utf-8') as out_f:
                out_f.write(f"# Extracted from {url}\n\n{final_text}")
            
            processed_count += 1
                
        except Exception as e:
            print(f"Failed to process {url}: {e}")

    print(f"\nFinished. Processed: {processed_count}, Skipped: {len(skipped_files)}")

if __name__ == '__main__':
    process_links(r'c:\Antigravity\HEMS-website\docs\Prgram links.md', r'c:\Antigravity\HEMS-website\docs\archives_translation')
