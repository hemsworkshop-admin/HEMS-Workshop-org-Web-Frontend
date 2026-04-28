import glob, re, collections

counter = collections.Counter()
for file in glob.glob('page_*.html'):
    with open(file, 'rb') as f:
        html = f.read().decode('utf-8', errors='replace')
        # find all hrefs ending in pdf, ppt, pptx, doc, docx
        links = re.findall(r'href=[\"\']?([^\"\' >]+(?:\.pdf|\.ppt|\.pptx|\.doc|\.docx))', html, re.IGNORECASE)
        counter.update(links)

for k, v in counter.most_common(20):
    print(f"{k}: {v}")
