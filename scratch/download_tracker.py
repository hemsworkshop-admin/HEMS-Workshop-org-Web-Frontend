import os
import json
import urllib.request
import urllib.parse
import re
from http.server import SimpleHTTPRequestHandler, HTTPServer
from urllib.parse import unquote, urlparse

PORT = 18080
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "docs", "archives_translation"))
PROCEEDINGS_DIR = os.path.join(BASE_DIR, "proceedings")
MASTER_JSON_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "src", "frontend", "src", "data", "master_workshops.json"))
LINKS_FILE = os.path.join(os.path.dirname(__file__), 'pdf_links.json')

def load_json(path):
    if os.path.exists(path):
        with open(path, 'r', encoding='utf-8') as f:
            return json.load(f)
    return []

def clean_session(session):
    cleaned = re.sub(r'\s*\(.*?\)\s*', '', session).strip()
    return re.sub(r'[^a-zA-Z0-9]', '_', cleaned)

def get_presenter_name(authors, index=0, default_prefix="Author"):
    if not authors: return f"{default_prefix}_{index}"
    presenter = next((a for a in authors if a.get('isPresenter')), authors[0])
    name_part = presenter.get('name', '').split(',')[0].strip()
    name_words = name_part.split(' ')
    last_word = name_words[-1] if name_words else ""
    return re.sub(r'[^a-zA-Z0-9]', '', last_word)

def get_title_snippet(title, index=0, default_prefix="Talk"):
    if not title: return f"{default_prefix}_{index}"
    cleaned = re.sub(r'[^a-zA-Z0-9\s]', '', title)
    words = [w for w in re.split(r'\s+', cleaned) if w]
    return "_".join(words[:3]) if words else f"{default_prefix}_{index}"

def generate_expected_path(ws_num, session, category, presenter_name, title_snippet):
    clean_sess = clean_session(session) if category != 'Poster' else 'Posters'
    filename = f"{ws_num}th_{presenter_name}_{title_snippet}_{category}.pdf"
    return os.path.join(f"{ws_num}th", clean_sess, filename).replace('\\', '/')

def find_best_link(year_str, presenter_name, title, pdf_links):
    candidates = [link for link in pdf_links if link['year'] == year_str]
    for link in candidates:
        url_file = unquote(link['url'].split('/')[-1].lower())
        if presenter_name.lower() in url_file:
            return link['url']
        # secondary check: first word of title
        title_words = [w for w in title.lower().split() if len(w) > 3]
        if title_words and any(w in url_file for w in title_words):
             return link['url']
    return ""

def generate_download_tasks():
    master_data = load_json(MASTER_JSON_PATH)
    pdf_links = load_json(LINKS_FILE)
    
    tasks = []
    mapped_urls = set()
    
    for ws_idx, ws in enumerate(master_data):
        ws_num = str(ws.get('number', ''))
        year_str = f"{ws_num}th"
        
        # Process Presentations
        presentations = ws.get('presentations', [])
        for p_idx, p in enumerate(presentations):
            pres_file = p.get('presentation_file', '')
            legacy_url = p.get('url', '')
            if legacy_url: mapped_urls.add(legacy_url)
            
            presenter_name = get_presenter_name(p.get('authors', []), p_idx, "Author")
            title_snippet = get_title_snippet(p.get('title', ''), p_idx, "Talk")
            expected_path = generate_expected_path(ws_num, p.get('session', 'General'), 'Presentation', presenter_name, title_snippet)
            
            # If no pres_file, queue it
            if not pres_file:
                suggested_url = legacy_url if legacy_url else find_best_link(year_str, presenter_name, p.get('title', ''), pdf_links)
                if suggested_url: mapped_urls.add(suggested_url)
                tasks.append({
                    "ws_idx": ws_idx, "p_idx": p_idx, "type": "Presentation",
                    "expected_path": expected_path, "suggested_url": suggested_url,
                    "title": p.get('title', ''), "presenter": presenter_name
                })
                
        # Process Posters
        posters = ws.get('posters', [])
        for p_idx, p in enumerate(posters):
            poster_file = p.get('poster_file', '')
            legacy_url = p.get('url', '')
            if legacy_url: mapped_urls.add(legacy_url)
            
            presenter_name = get_presenter_name(p.get('authors', []), p_idx, "Poster")
            title_snippet = get_title_snippet(p.get('title', ''), p_idx, "Topic")
            expected_path = generate_expected_path(ws_num, 'Posters', 'Poster', presenter_name, title_snippet)
            
            if not poster_file:
                suggested_url = legacy_url if legacy_url else find_best_link(year_str, presenter_name, p.get('title', ''), pdf_links)
                if suggested_url: mapped_urls.add(suggested_url)
                tasks.append({
                    "ws_idx": ws_idx, "p_idx": p_idx, "type": "Poster",
                    "expected_path": expected_path, "suggested_url": suggested_url,
                    "title": p.get('title', ''), "presenter": presenter_name
                })
                
    # Gather unmapped links
    unmapped = []
    for link in pdf_links:
        if link['url'] not in mapped_urls and link['type'] != 'Final_Program':
            ws_num_str = link['year'].replace('th', '').replace('rd', '').replace('nd', '').replace('st', '')
            try:
                ws_idx = next(i for i, w in enumerate(master_data) if str(w.get('number', '')) == ws_num_str)
            except StopIteration:
                continue
            
            unmapped.append({
                "ws_idx": ws_idx,
                "ws_num": ws_num_str,
                "type": link['type'],
                "url": link['url'],
                "legacy_path": link['expected_path']
            })
                
    return tasks, unmapped

class TrackerHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/':
            tasks, unmapped = generate_download_tasks()
            
            html = f"""<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>HEMS Artifact Download Tracker</title>
                <style>
                    body {{ font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #0f172a; color: #e2e8f0; margin: 40px; }}
                    h1, h2 {{ color: #38bdf8; border-bottom: 2px solid #334155; padding-bottom: 10px; margin-top: 40px; }}
                    .instructions {{ background: #1e293b; padding: 15px; border-radius: 8px; border-left: 4px solid #f59e0b; margin-bottom: 20px; }}
                    table {{ width: 100%; border-collapse: collapse; background: #1e293b; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.3); }}
                    th, td {{ padding: 10px 14px; border-bottom: 1px solid #334155; text-align: left; vertical-align: middle; }}
                    th {{ background: #0f172a; font-weight: 600; color: #94a3b8; position: sticky; top: 0; z-index: 10; }}
                    tr:hover {{ background: #334155; }}
                    a {{ color: #38bdf8; text-decoration: none; font-weight: bold; word-break: break-all; }}
                    a:hover {{ text-decoration: underline; color: #7dd3fc; }}
                    code {{ background: #0f172a; padding: 4px 8px; border-radius: 4px; color: #f87171; font-family: monospace; font-size: 0.85em; }}
                    .btn {{ background: #0284c7; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-weight: bold; font-size: 0.85em; transition: background 0.2s; white-space: nowrap; }}
                    .btn.inject {{ background: #10b981; }}
                    .btn.inject:hover {{ background: #059669; }}
                    .btn:hover {{ background: #0369a1; }}
                    .btn:disabled {{ background: #475569; cursor: not-allowed; color: #94a3b8; }}
                    .container {{ max-height: 50vh; overflow-y: auto; border: 1px solid #334155; border-radius: 8px; }}
                </style>
                <script>
                    async function downloadDirect(wsIdx, pIdx, type, url, expectedPath, btnId, isInject) {{
                        if (!url) {{ alert('No URL provided!'); return; }}
                        const btn = document.getElementById(btnId);
                        btn.innerText = "⏳ Downloading...";
                        btn.disabled = true;
                        
                        try {{
                            const body = JSON.stringify({{ ws_idx: wsIdx, p_idx: pIdx, type: type, url: url, expected_path: expectedPath, inject: isInject }});
                            const res = await fetch('/download_remote', {{
                                method: 'POST',
                                headers: {{ 'Content-Type': 'application/json' }},
                                body: body
                            }});
                            
                            if (res.ok) {{
                                const data = await res.json();
                                const previewUrl = "http://localhost:3000/api/manager/preview?file=" + encodeURIComponent(data.path);
                                btn.innerHTML = "✅ Done<br><a href='" + previewUrl + "' target='_blank' style='display:inline-block; margin-top:4px; font-size:12px; color:#4ade80; text-decoration:none;'>👁️ View Preview</a>";
                                btn.parentElement.parentElement.style.opacity = '0.7';
                            }} else {{
                                const err = await res.text();
                                btn.innerText = "❌ Failed: " + err;
                                btn.disabled = false;
                            }}
                        }} catch (e) {{
                            console.error("Download error:", e);
                            btn.innerText = "❌ Error";
                            btn.disabled = false;
                        }}
                    }}
                </script>
            </head>
            <body>
                <h1>📥 HEMS Artifact Download Tracker</h1>
                <div class="instructions">
                    <p><strong>Goal:</strong> Download missing files directly to the Manager UI's exact expected path and auto-attach them to the Master JSON.</p>
                </div>
                
                <h2>1. Matched Master JSON Talks</h2>
                <div class="container">
                    <table>
                        <tr><th>Talk Title & Presenter</th><th>Type</th><th>Suggested URL</th><th>Tidy Target Path</th><th style="width: 150px;">Action</th></tr>
            """
            
            for i, task in enumerate(tasks):
                btn_id = f"btn-task-{i}"
                url_display = f"<a href='{task['suggested_url']}' target='_blank'>Direct Link ↗</a><br><span style='font-size: 0.7em; color: #64748b;'>{task['suggested_url']}</span>" if task['suggested_url'] else "<span style='color:red'>No URL Found</span>"
                
                html += f"""
                    <tr>
                        <td><strong>{task['title']}</strong><br><span style='font-size: 0.85em; color: #94a3b8;'>Presenter: {task['presenter']}</span></td>
                        <td>{task['type']}</td>
                        <td>{url_display}</td>
                        <td><code>{task['expected_path']}</code></td>
                        <td>
                            <button class='btn' id='{btn_id}' onclick='downloadDirect({task["ws_idx"]}, {task["p_idx"]}, "{task["type"]}", "{task["suggested_url"]}", "{task["expected_path"]}", "{btn_id}", false)'>
                                ⬇️ Download & Attach
                            </button>
                        </td>
                    </tr>
                """
                
            html += f"""
                    </table>
                </div>

                <h2>2. Unmapped Legacy Files ({len(unmapped)})</h2>
                <div class="instructions" style="border-left-color: #10b981;">
                    <p>These files from the scraped legacy sites don't have a matching entry in your Master JSON yet. Click <strong>Inject & Download</strong> to auto-create a new row in the Manager UI for that year.</p>
                </div>
                <div class="container">
                    <table>
                        <tr><th>Workshop</th><th>Type</th><th>Legacy URL</th><th>Legacy Extracted Name</th><th style="width: 150px;">Action</th></tr>
            """
            
            for i, u in enumerate(unmapped):
                btn_id = f"btn-unmapped-{i}"
                url_display = f"<a href='{u['url']}' target='_blank'>Direct Link ↗</a><br><span style='font-size: 0.7em; color: #64748b;'>{u['url']}</span>"
                
                html += f"""
                    <tr>
                        <td>{u['ws_num']}th</td>
                        <td>{u['type']}</td>
                        <td>{url_display}</td>
                        <td><code>{os.path.basename(u['legacy_path'])}</code></td>
                        <td>
                            <button class='btn inject' id='{btn_id}' onclick='downloadDirect({u["ws_idx"]}, null, "{u["type"]}", "{u["url"]}", "{u["legacy_path"]}", "{btn_id}", true)'>
                                ➕ Inject & Download
                            </button>
                        </td>
                    </tr>
                """
                
            html += """
                    </table>
                </div>
            </body>
            </html>
            """
            self.send_response(200)
            self.send_header('Content-type', 'text/html; charset=utf-8')
            self.end_headers()
            self.wfile.write(html.encode('utf-8'))
        else:
            self.send_response(404)
            self.end_headers()
            
    def do_POST(self):
        if self.path == '/download_remote':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data)
            
            ws_idx = data.get('ws_idx')
            p_idx = data.get('p_idx')
            p_type = data.get('type')
            remote_url = data.get('url')
            expected = data.get('expected_path')
            is_inject = data.get('inject', False)
            
            if not remote_url or not expected:
                self.send_response(400)
                self.wfile.write(b"Missing params")
                self.end_headers()
                return
                
            try:
                parsed_remote = urllib.parse.urlparse(remote_url)
                quoted_path = urllib.parse.quote(unquote(parsed_remote.path))
                safe_remote_url = parsed_remote._replace(path=quoted_path).geturl()
                
                req = urllib.request.Request(safe_remote_url, headers={'User-Agent': 'Mozilla/5.0'})
                with urllib.request.urlopen(req, timeout=30) as response:
                    file_data = response.read()
                    
                master_data = load_json(MASTER_JSON_PATH)
                ws = master_data[ws_idx]
                ws_num = str(ws.get('number', ''))
                
                if is_inject:
                    # Logic for Unmapped Injection
                    # Parse author from legacy path (e.g. 12th_Smith_Presentation.pdf)
                    base_name = os.path.basename(expected)
                    parts = base_name.replace('.pdf', '').split('_')
                    guessed_author = parts[1] if len(parts) > 1 else "Unknown"
                    
                    # Target path for injected file
                    session_folder = "Posters" if p_type == 'Poster' else "Unknown"
                    target_category = "Poster" if p_type == 'Poster' else ("Abstract" if p_type == "Abstract" else "Presentation")
                    
                    target_filename = f"{ws_num}th_{guessed_author}_Imported_from_Legacy_{target_category}.pdf"
                    safe_path = os.path.join(PROCEEDINGS_DIR, f"{ws_num}th", session_folder, target_filename).replace('\\', '/')
                    
                    # Update master data by appending
                    new_entry = {
                        "session": "Posters" if p_type == 'Poster' else "Unknown",
                        "title": "Imported from Legacy",
                        "authors": [{"name": guessed_author, "isPresenter": True}],
                        "url": remote_url
                    }
                    if target_category == 'Poster':
                        new_entry['poster_file'] = target_filename
                        ws.setdefault('posters', []).append(new_entry)
                    elif target_category == 'Abstract':
                        new_entry['abstract_file'] = target_filename
                        new_entry['abstract_url'] = remote_url
                        # We append it to presentations since there is no standalone abstract list
                        ws.setdefault('presentations', []).append(new_entry)
                    else:
                        new_entry['presentation_file'] = target_filename
                        ws.setdefault('presentations', []).append(new_entry)
                        
                else:
                    # Logic for Mapped Update
                    safe_path = os.path.join(PROCEEDINGS_DIR, unquote(expected)).replace('\\', '/')
                    filename = os.path.basename(expected)
                    
                    if p_type == 'Presentation':
                        ws['presentations'][p_idx]['presentation_file'] = filename
                        ws['presentations'][p_idx]['url'] = remote_url
                    elif p_type == 'Poster':
                        ws['posters'][p_idx]['poster_file'] = filename
                        ws['posters'][p_idx]['url'] = remote_url
                    elif p_type == 'Abstract':
                        # Depending on structure, it might be in presentations
                        ws['presentations'][p_idx]['abstract_file'] = filename
                        ws['presentations'][p_idx]['abstract_url'] = remote_url

                # Save file
                os.makedirs(os.path.dirname(safe_path), exist_ok=True)
                with open(safe_path, 'wb') as f:
                    f.write(file_data)
                    
                # Generate Preview
                try:
                    import subprocess
                    script_path = os.path.join(os.path.dirname(__file__), 'preview_generator.py')
                    subprocess.run(["python", script_path, safe_path], check=True)
                except Exception as e:
                    print(f"Warning: Failed to generate preview for {safe_path}: {e}")
                    
                # Save JSON
                with open(MASTER_JSON_PATH, 'w', encoding='utf-8') as f:
                    json.dump(master_data, f, indent=2, ensure_ascii=False)
                        
                # Determine final relative path for response
                if is_inject:
                    final_relative = f"{ws_num}th/{session_folder}/{target_filename}"
                else:
                    final_relative = unquote(expected)
                        
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                response_data = {"status": "OK", "path": final_relative}
                self.wfile.write(json.dumps(response_data).encode('utf-8'))
            except Exception as e:
                print(f"Error downloading {remote_url}: {e}")
                self.send_response(500)
                self.end_headers()
                self.wfile.write(str(e).encode())
        else:
            self.send_response(404)
            self.end_headers()

if __name__ == '__main__':
    os.makedirs(PROCEEDINGS_DIR, exist_ok=True)
    print("="*60)
    print(f"HEMS Artifact Tracker running at: http://localhost:{PORT}")
    print("="*60)
    print(f"Monitoring master_workshops.json against pdf_links.json")
    print(f"Keep this terminal open and navigate to http://localhost:{PORT} in your browser.")
    server = HTTPServer(('localhost', PORT), TrackerHandler)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\\nShutting down tracker...")
