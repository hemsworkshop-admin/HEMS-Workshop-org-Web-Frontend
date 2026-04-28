import json
import re

MASTER_FILE = 'src/frontend/src/data/master_workshops.json'
BASE_GCS_URL = 'https://storage.googleapis.com/hems-archive-assets/proceedings/14th'

def clean_session(session_name):
    # Same logic as route.ts: session.replace(/\s*\(.*?\)\s*/g, '').trim().replace(/[^a-zA-Z0-9]/g, '_')
    name = re.sub(r'\s*\(.*?\)\s*', '', session_name).strip()
    name = re.sub(r'[^a-zA-Z0-9]', '_', name)
    return name

with open(MASTER_FILE, 'r') as f:
    data = json.load(f)

for ws in data:
    if str(ws.get('number')) == '14':
        print("Processing Workshop 14...")
        
        # Admin files
        if ws.get('program_file'):
            ws['program_url'] = f"{BASE_GCS_URL}/Administrative/{ws['program_file']}"
        if ws.get('participant_list_file'):
            ws['participant_list_url'] = f"{BASE_GCS_URL}/Administrative/{ws['participant_list_file']}"
            
        # Presentations
        for pres in ws.get('presentations', []):
            if pres.get('presentation_file'):
                session_dir = clean_session(pres.get('session', 'General'))
                pres['url'] = f"{BASE_GCS_URL}/{session_dir}/{pres['presentation_file']}"
            if pres.get('abstract_file'):
                session_dir = clean_session(pres.get('session', 'General'))
                pres['abstract_url'] = f"{BASE_GCS_URL}/{session_dir}/{pres['abstract_file']}"
                
        # Posters
        for poster in ws.get('posters', []):
            if poster.get('presentation_file'):
                poster['url'] = f"{BASE_GCS_URL}/Posters/{poster['presentation_file']}"
            if poster.get('abstract_file'):
                poster['abstract_url'] = f"{BASE_GCS_URL}/Posters/{poster['abstract_file']}"
                
        # Student Awards
        for award in ws.get('student_awards', []):
            if award.get('presentation_file'):
                award['url'] = f"{BASE_GCS_URL}/Student_Award/{award['presentation_file']}"

with open(MASTER_FILE, 'w') as f:
    json.dump(data, f, indent=2)

print("Migration complete for Workshop 14.")
