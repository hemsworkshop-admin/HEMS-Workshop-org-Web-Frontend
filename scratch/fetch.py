import urllib.request
import gzip

url = "https://www.hems-workshop.org/14thWS/14thProgram.html"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    response = urllib.request.urlopen(req)
    data = response.read()
    
    # Try decompression if it's gzip
    try:
        data = gzip.decompress(data)
    except Exception:
        pass
        
    html = data.decode('utf-8', errors='ignore')
    with open('scratch/14thProgram.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print("Success")
except Exception as e:
    print(f"Error: {e}")
