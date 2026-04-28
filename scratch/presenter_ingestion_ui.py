import os
import json
import re
from http.server import SimpleHTTPRequestHandler, HTTPServer
from urllib.parse import unquote

PORT = 18081
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "docs", "archives_translation"))
PROCEEDINGS_DIR = os.path.join(BASE_DIR, "proceedings")

# Try to load pypdf
try:
    import pypdf
    HAS_PYPDF = True
except ImportError:
    HAS_PYPDF = False

def extract_text_from_file(file_path):
    ext = file_path.lower().split('.')[-1]
    if ext == 'pdf' and HAS_PYPDF:
        try:
            with open(file_path, 'rb') as f:
                reader = pypdf.PdfReader(f)
                return "\\n".join([page.extract_text() for page in reader.pages if page.extract_text()])
        except Exception as e:
            return f"Error extracting PDF: {e}"
    else:
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                return f.read()
        except UnicodeDecodeError:
            with open(file_path, 'r', encoding='latin-1') as f:
                return f.read()

def heuristic_parse_program(text):
    presentations = []
    lines = text.split('\\n')
    current_session = ""
    current_date = ""
    
    time_pattern = re.compile(r'\\b\\d{1,2}:\\d{2}\\s*(?:AM|PM|am|pm)?\\b')
    
    for i, line in enumerate(lines):
        line = line.strip()
        if not line:
            continue
            
        if any(day in line for day in ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']):
            if len(line) < 30:
                current_date = line
                continue
                
        if "Session" in line and len(line) < 60:
            current_session = line
            continue
            
        time_match = time_pattern.search(line)
        if time_match:
            time_str = time_match.group(0)
            title = lines[i+1].strip() if i+1 < len(lines) else ""
            authors = lines[i+2].strip() if i+2 < len(lines) else ""
            
            presentations.append({
                "date": current_date,
                "time": time_str,
                "session": current_session,
                "title": title,
                "authors": authors
            })
            
    if len(presentations) == 0:
        for _ in range(5):
            presentations.append({
                "date": "", "time": "", "session": "", "title": "", "authors": ""
            })
    return presentations

class IngestionHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/':
            self.send_response(200)
            self.send_header('Content-type', 'text/html; charset=utf-8')
            self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
            self.end_headers()
            ui_path = os.path.join(os.path.dirname(__file__), 'ui.html')
            with open(ui_path, 'r', encoding='utf-8') as f:
                self.wfile.write(f.read().encode('utf-8'))
                
        elif self.path == '/legacy_links':
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            links_path = os.path.join(os.path.dirname(__file__), 'all_extracted_links.json')
            if os.path.exists(links_path):
                with open(links_path, 'r', encoding='utf-8') as f:
                    self.wfile.write(f.read().encode('utf-8'))
            else:
                self.wfile.write(b'[]')
                
        elif self.path == '/open_folder':
            os.makedirs(PROCEEDINGS_DIR, exist_ok=True)
            if os.name == 'nt':
                os.startfile(PROCEEDINGS_DIR)
            self.send_response(204)
            self.end_headers()
        else:
            super().do_GET()

    def do_POST(self):
        path_parts = self.path.split('?')
        route = path_parts[0]
        query = path_parts[1] if len(path_parts) > 1 else ""
        
        params = {}
        for param in query.split('&'):
            if '=' in param:
                k, v = param.split('=', 1)
                params[k] = unquote(v)
                
        content_length = int(self.headers.get('Content-Length', 0))
        file_data = self.rfile.read(content_length) if content_length > 0 else b''

        if route == '/parse_program':
            temp_path = os.path.join(os.path.dirname(__file__), "temp_program.tmp")
            with open(temp_path, 'wb') as f:
                f.write(file_data)
            
            text = extract_text_from_file(temp_path)
            presentations = heuristic_parse_program(text)
            
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({"presentations": presentations}).encode('utf-8'))
            
        elif route == '/upload_presenters':
            ws_num = params.get('number', 'Unknown')
            safe_dir = os.path.join(PROCEEDINGS_DIR, f"{ws_num}th", "Administrative")
            os.makedirs(safe_dir, exist_ok=True)
            safe_path = os.path.join(safe_dir, f"{ws_num}th_Participants_List.pdf")
            
            with open(safe_path, 'wb') as f:
                f.write(file_data)
            self.send_response(200)
            self.end_headers()
            
        elif route == '/upload_presentation':
            ws_num = params.get('number', 'Unknown')
            title = params.get('title', '')
            authors = params.get('authors', 'Unknown_Author')
            session = params.get('session', 'General')
            file_type = params.get('type', 'Presentation')
            
            clean_authors = re.sub(r'[^a-zA-Z0-9]', '_', authors)
            clean_session = re.sub(r'[^a-zA-Z0-9]', '_', session)
            expected_name = f"{ws_num}th_{clean_authors}_{file_type}.pdf"
            
            safe_dir = os.path.join(PROCEEDINGS_DIR, f"{ws_num}th", clean_session)
            os.makedirs(safe_dir, exist_ok=True)
            safe_path = os.path.join(safe_dir, expected_name)
            
            with open(safe_path, 'wb') as f:
                f.write(file_data)
                
            meta_file = os.path.join(PROCEEDINGS_DIR, f"{ws_num}th", "presentations_metadata.json")
            all_meta = []
            if os.path.exists(meta_file):
                try:
                    with open(meta_file, 'r') as rf:
                        all_meta = json.load(rf)
                except:
                    pass
            
            entry = next((item for item in all_meta if item["title"] == title), None)
            if not entry:
                entry = {
                    "date": params.get('date', ''),
                    "time": params.get('time', ''),
                    "session": session,
                    "title": title,
                    "authors": authors,
                    "url": params.get('url', '')
                }
                all_meta.append(entry)
            else:
                if not entry.get('url'): entry['url'] = params.get('url', '')
            
            if file_type == 'Presentation':
                entry['presentation_file'] = expected_name
            else:
                entry['abstract_file'] = expected_name
                
            with open(meta_file, 'w') as wf:
                json.dump(all_meta, wf, indent=2)
                
            self.send_response(200)
            self.end_headers()
            
        elif route == '/upload_sponsor':
            company = params.get('company', 'Unknown')
            year = params.get('year', '')
            clean_company = re.sub(r'[^a-zA-Z0-9]', '_', company)
            expected_name = f"{clean_company}_{year}.png"
            
            sponsors_dir = os.path.join(BASE_DIR, "sponsors")
            os.makedirs(sponsors_dir, exist_ok=True)
            safe_path = os.path.join(sponsors_dir, expected_name)
            with open(safe_path, 'wb') as f:
                f.write(file_data)
            self.send_response(200)
            self.end_headers()

        elif route == '/upload_student':
            ws_num = params.get('number', 'Unknown')
            name = params.get('name', 'Unknown')
            clean_name = re.sub(r'[^a-zA-Z0-9]', '_', name)
            expected_name = f"{ws_num}th_{clean_name}_Student_Award.pdf"
            
            students_dir = os.path.join(PROCEEDINGS_DIR, f"{ws_num}th", "Student_Award")
            os.makedirs(students_dir, exist_ok=True)
            safe_path = os.path.join(students_dir, expected_name)
            with open(safe_path, 'wb') as f:
                f.write(file_data)
            self.send_response(200)
            self.end_headers()

        elif route == '/upload_poster':
            ws_num = params.get('number', 'Unknown')
            name = params.get('name', 'Unknown')
            file_type = params.get('type', 'Poster')
            clean_name = re.sub(r'[^a-zA-Z0-9]', '_', name)
            expected_name = f"{ws_num}th_{clean_name}_{file_type}.pdf"
            
            poster_dir = os.path.join(PROCEEDINGS_DIR, f"{ws_num}th", "Posters")
            os.makedirs(poster_dir, exist_ok=True)
            safe_path = os.path.join(poster_dir, expected_name)
            with open(safe_path, 'wb') as f:
                f.write(file_data)
            self.send_response(200)
            self.end_headers()

        else:
            self.send_response(400)
            self.end_headers()

if __name__ == '__main__':
    os.makedirs(PROCEEDINGS_DIR, exist_ok=True)
    print("="*60)
    print(f"Presenter Ingestion UI running at: http://localhost:{PORT}")
    print("="*60)
    server = HTTPServer(('localhost', PORT), IngestionHandler)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\\nShutting down ingestion server...")
