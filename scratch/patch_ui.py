import os
import re

filepath = r'c:\Antigravity\HEMS-website\scratch\presenter_ingestion_ui.py'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Inject HTML
html_to_inject = """
    <h2 style="color: #f59e0b; margin-top: 40px; border-bottom: 1px solid #334155; padding-bottom: 10px;">
        🖼️ Poster Presentations
        <button class="header-btn" style="float: right;" onclick="addPosterRow()">[+] Add Poster</button>
    </h2>
    <div class="container" style="margin-bottom: 40px;">
        <table id="posters-table">
            <tr>
                <th style="width: 150px;">Name</th>
                <th style="width: 150px;">Affiliation</th>
                <th style="width: 200px;">Title</th>
                <th style="width: 150px;">Poster Presentation</th>
                <th style="width: 150px;">Abstract</th>
            </tr>
            <!-- Dynamic rows will go here -->
        </table>
    </div>
"""

content = content.replace('</table>\n    </div>\n    \n    <script>', '</table>\n    </div>\n' + html_to_inject + '    \n    <script>')

# 2. Inject JS
js_to_inject = """
        function addPosterRow() {
            const table = document.getElementById('posters-table');
            const rowId = 'poster-' + Date.now();
            const tr = document.createElement('tr');
            tr.id = rowId;
            tr.innerHTML = `
                <td><input type="text" id="p-name-${rowId}" placeholder="Name" style="width:100%; padding: 8px; background: #0f172a; color: white; border: 1px solid #475569; border-radius: 4px;"></td>
                <td><input type="text" id="p-affil-${rowId}" placeholder="Affiliation" style="width:100%; padding: 8px; background: #0f172a; color: white; border: 1px solid #475569; border-radius: 4px;"></td>
                <td><input type="text" id="p-title-${rowId}" placeholder="Title" style="width:100%; padding: 8px; background: #0f172a; color: white; border: 1px solid #475569; border-radius: 4px;"></td>
                <td>
                    <div class='drop-zone' id='drop-poster-${rowId}' ondragover='handleDragOver(event)' ondragleave='handleDragLeave(event)' ondrop='handlePosterDrop(event, "${rowId}", "Poster")'>Drop Poster</div>
                    <button class='skip-btn' id='skip-poster-${rowId}' onclick='markPosterMissing("${rowId}", "Poster")'>Mark Not Provided</button>
                    <div class='status' id='status-poster-${rowId}' style='margin-top:5px; font-size:0.9em;'></div>
                </td>
                <td>
                    <div class='drop-zone' id='drop-abstract-${rowId}' ondragover='handleDragOver(event)' ondragleave='handleDragLeave(event)' ondrop='handlePosterDrop(event, "${rowId}", "Abstract")'>Drop Abstract</div>
                    <button class='skip-btn' id='skip-abstract-${rowId}' onclick='markPosterMissing("${rowId}", "Abstract")'>Mark Not Provided</button>
                    <div class='status' id='status-abstract-${rowId}' style='margin-top:5px; font-size:0.9em;'></div>
                </td>
            `;
            table.appendChild(tr);
        }
        
        async function markPosterMissing(rowId, fileType) {
            if (!confirm(`Are you sure the ${fileType} was NOT PROVIDED?`)) return;
            const nameInput = document.getElementById('p-name-' + rowId).value.trim();
            if (!nameInput) {
                alert("Please enter Name before marking missing.");
                return;
            }
            const cleanName = nameInput.replace(/[^a-zA-Z0-9]/g, '_');
            const ext = "missing";
            const expectedName = `14th_${cleanName}_${fileType}.${ext}`;
            const expectedPath = `14th/${fileType}/${expectedName}`;
            
            const res = await fetch('/mark_missing?expected=' + encodeURIComponent(expectedPath), { method: 'POST' });
            if (res.ok) {
                document.getElementById('status-' + fileType.toLowerCase() + '-' + rowId).innerHTML = '<span style="color: #ef4444;">❌ Not Provided</span>';
                document.getElementById('drop-' + fileType.toLowerCase() + '-' + rowId).style.display = 'none';
                document.getElementById('skip-' + fileType.toLowerCase() + '-' + rowId).style.display = 'none';
            }
        }
        
        async function handlePosterDrop(e, rowId, fileType) {
            e.preventDefault();
            e.currentTarget.classList.remove('dragover');
            
            const nameInput = document.getElementById('p-name-' + rowId).value.trim();
            const affilInput = document.getElementById('p-affil-' + rowId).value.trim();
            const titleInput = document.getElementById('p-title-' + rowId).value.trim();
            const file = e.dataTransfer.files[0];
            
            if (!file) return;
            if (!nameInput || !affilInput || !titleInput) {
                alert("Please enter Name, Affiliation, and Title before dropping the file.");
                return;
            }
            
            const cleanName = nameInput.replace(/[^a-zA-Z0-9]/g, '_');
            const ext = file.name.split('.').pop();
            const expectedName = `14th_${cleanName}_${fileType}.${ext}`;
            
            e.currentTarget.innerHTML = "⏳ Uploading...";
            
            const url = `/upload_poster_file?expected=${encodeURIComponent(expectedName)}&type=${fileType}&name=${encodeURIComponent(nameInput)}&affil=${encodeURIComponent(affilInput)}&title=${encodeURIComponent(titleInput)}`;
            
            const res = await fetch(url, { method: 'POST', body: file });
            if (res.ok) {
                document.getElementById('status-' + fileType.toLowerCase() + '-' + rowId).innerHTML = '<span class="found">✅ Staged</span>';
                e.currentTarget.style.display = 'none';
                document.getElementById('skip-' + fileType.toLowerCase() + '-' + rowId).style.display = 'none';
            } else {
                e.currentTarget.innerHTML = "❌ Failed";
                setTimeout(() => e.currentTarget.innerHTML = "Drop " + fileType, 2000);
            }
        }
"""
content = content.replace("window.addEventListener('DOMContentLoaded', () => {", js_to_inject + "\n        window.addEventListener('DOMContentLoaded', () => {")
content = content.replace("addStudentRow();", "addStudentRow();\n            addPosterRow();")

# 3. Inject Python handler
py_to_inject = """
        elif self.path.startswith('/upload_poster_file?'):
            query = self.path.split('?')[1]
            params = {}
            for param in query.split('&'):
                if '=' in param:
                    key, val = param.split('=', 1)
                    params[key] = unquote(val)
                    
            expected = params.get('expected', '')
            file_type = params.get('type', 'Poster')
            name = params.get('name', '')
            affil = params.get('affil', '')
            title = params.get('title', '')
            
            content_length = int(self.headers.get('Content-Length', 0))
            if content_length > 0:
                file_data = self.rfile.read(content_length)
                
                target_dir = os.path.join(PROCEEDINGS_DIR, "14th", file_type)
                safe_path = os.path.join(target_dir, expected)
                os.makedirs(os.path.dirname(safe_path), exist_ok=True)
                
                with open(safe_path, 'wb') as f:
                    f.write(file_data)
                    
                # Append to poster_metadata.json
                metadata_dir = os.path.join(PROCEEDINGS_DIR, "14th")
                os.makedirs(metadata_dir, exist_ok=True)
                metadata_file = os.path.join(metadata_dir, 'poster_metadata.json')
                metadata = []
                if os.path.exists(metadata_file):
                    try:
                        with open(metadata_file, 'r', encoding='utf-8') as rf:
                            metadata = json.load(rf)
                    except:
                        pass
                
                # Update or append
                found = False
                for m in metadata:
                    if m.get('name') == name and m.get('title') == title:
                        if file_type == 'Poster':
                            m['poster_file'] = expected
                        else:
                            m['abstract_file'] = expected
                        found = True
                        break
                        
                if not found:
                    new_meta = {
                        "name": name,
                        "affiliation": affil,
                        "title": title,
                        "poster_file": expected if file_type == 'Poster' else "",
                        "abstract_file": expected if file_type == 'Abstract' else ""
                    }
                    metadata.append(new_meta)
                    
                with open(metadata_file, 'w', encoding='utf-8') as wf:
                    json.dump(metadata, wf, indent=2)
                    
                self.send_response(200)
                self.end_headers()
                self.wfile.write(b"OK")
            else:
                self.send_response(400)
                self.end_headers()
                self.wfile.write(b"No data")
"""
content = content.replace("elif self.path.startswith('/mark_missing?expected='):", py_to_inject.strip() + "\n        elif self.path.startswith('/mark_missing?expected='):")

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
print("Patched presenter_ingestion_ui.py successfully.")
