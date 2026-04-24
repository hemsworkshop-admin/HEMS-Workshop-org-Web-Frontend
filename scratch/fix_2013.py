import os
import re

template_path = r"c:\Antigravity\HEMS-website\docs\templates\archive-template.tsx"
raw_file = r"c:\Antigravity\HEMS-website\docs\archives_translation\raw_text\2013.txt"
out_file = r"c:\Antigravity\HEMS-website\src\frontend\src\app\archive\2013\page.tsx"

meta = {"ordinal": "9th", "dates": "September 22-25, 2013", "venue": "TradeWinds Island Grand Resort", "address": "St. Pete Beach, FL"}
year = 2013

with open(template_path, 'r', encoding='utf-8') as f:
    template = f.read()

with open(raw_file, 'r', encoding='utf-8') as f:
    text = f.read()

def parse_text(text):
    lines = [line.strip() for line in text.split('\n') if line.strip()]
    days = []
    current_day = None
    current_event = None
    current_session = None

    time_pattern = re.compile(r'^(\d{1,2}:\d{2}\s*(?:[apAP]\.?[mM]\.?|A\.M\.|P\.M\.|noon|Noon)?)(?:\s*-\s*\d{1,2}:\d{2}\s*(?:[apAP]\.?[mM]\.?|noon)?)?\s*(?:\|\s*)?(.*)')
    day_pattern = re.compile(r'^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday|Mon|Tue|Wed|Thu|Fri|Sat|Sun)[, ]+(.*)', re.IGNORECASE)

    for line in lines:
        day_match = day_pattern.match(line)
        time_match = time_pattern.match(line)

        if day_match and len(line) < 50:
            current_day = {"title": line, "events": [], "sessions": []}
            days.append(current_day)
            current_event = None
            current_session = None
            continue
        
        if not current_day:
            if time_match:
                current_day = {"title": "Workshop Schedule", "events": [], "sessions": []}
                days.append(current_day)
            else:
                continue

        if time_match:
            time_str = time_match.group(1).strip()
            rest = time_match.group(2).strip()
            
            if "technical session" in rest.lower() or "plenary" in rest.lower() or "poster session" in rest.lower():
                current_session = {"time": time_str, "title": rest, "talks": []}
                current_day["sessions"].append(current_session)
                current_event = None
            elif current_session and len(rest) > 10 and not ("Break" in rest and len(rest)<30):
                talk = {"time": time_str, "raw_text": rest}
                current_session["talks"].append(talk)
                current_event = None
            elif len(rest) > 50 and "Abstract" in rest:
                # Missing technical session header (e.g. Wednesday 2013)
                if not current_session:
                    current_session = {"time": time_str, "title": "Technical Session", "talks": []}
                    current_day["sessions"].append(current_session)
                talk = {"time": time_str, "raw_text": rest}
                current_session["talks"].append(talk)
                current_event = None
            else:
                current_event = {"time": time_str, "title": rest, "subtitle": ""}
                current_day["events"].append(current_event)
                current_session = None
        else:
            if current_session and current_session["talks"]:
                current_session["talks"][-1]["raw_text"] += " " + line
            elif current_event:
                if not current_event["subtitle"]:
                    current_event["subtitle"] = line
                elif len(current_event["subtitle"]) < 200:
                    current_event["subtitle"] += " " + line

    for day in days:
        for sess in day["sessions"]:
            for talk in sess["talks"]:
                raw = talk.get("raw_text", "")
                # Regex for 2013: find the first initial like J. Mikucki, or C.R. Arkin,
                # we match everything before it as title.
                m = re.match(r'^(.*?)\s+([A-Z]\.[A-Z]?\.?\s*[A-Z][a-zA-Z\-]+,.*)Abstract\s*$', raw)
                if m:
                    talk["title"] = m.group(1).strip()
                    talk["authors"] = m.group(2).strip()
                else:
                    # fallback
                    m2 = re.match(r'^(.*?)\s+([A-Z]\.[A-Z]?\.?\s*[A-Z][a-zA-Z\-]+,.*)', raw)
                    if m2:
                        talk["title"] = m2.group(1).strip()
                        talk["authors"] = m2.group(2).strip()
                    else:
                        talk["title"] = raw
                        talk["authors"] = ""
    return days

def build_tsx(year, days, meta):
    tsx = template.replace("[WORKSHOP_YEAR]", str(year))
    tsx = tsx.replace("[WORKSHOP_YEAR: e.g. 2022]", str(year))
    tsx = tsx.replace("[WORKSHOP_EDITION_NUMBER: e.g. 14th]", meta['ordinal'])
    tsx = tsx.replace("[WORKSHOP_DESCRIPTION_PARAGRAPH: e.g. The 14th Workshop on Harsh-Environment Mass Spectrometry gathered leading scientists and engineers to discuss the latest advancements in ruggedized instrumentation and field-deployable analytical systems.]", f"The {meta['ordinal']} Workshop on Harsh-Environment Mass Spectrometry.")
    tsx = tsx.replace("[WORKSHOP_DATES: e.g. September 26-29, 2022]", meta['dates'])
    tsx = tsx.replace("[WORKSHOP_VENUE_NAME: e.g. Courtyard Cocoa Beach Cape Canaveral]", meta['venue'])
    tsx = tsx.replace("[WORKSHOP_VENUE_ADDRESS: e.g. 3435 N. Atlantic Ave, Cocoa Beach, FL 32931]", meta['address'])
    
    tsx = re.sub(r'href="\[LINK_URL_[^\]]+\]"', 'href="#"', tsx)
    tsx = re.sub(r'\{/\* \[REPEAT FOR EACH SPONSOR LOGO\] \*/\}.*?\{/\* \[END REPEAT\] \*/\}', '', tsx, flags=re.DOTALL)

    program_jsx = ""
    for day in days:
        program_jsx += f'''
            <div className="border-b border-foreground/10 last:border-0">
              <div className="bg-surface px-6 py-4 border-b border-foreground/10">
                <h3 className="font-bold text-lg">{day['title']}</h3>
              </div>
              <div className="divide-y divide-foreground/5">
        '''
        
        for ev in day['events']:
            program_jsx += f'''
                <div className="px-4 py-3 flex flex-col md:flex-row gap-4 hover:bg-surface/30 transition-colors border-l-4 border-transparent">
                  <div className="md:w-32 font-mono text-sm font-bold text-foreground flex-shrink-0">{ev['time']}</div>
                  <div>
                    <h4 className="font-bold">{ev['title']}</h4>
                    <p className="text-sm text-foreground/70 mt-1">{ev['subtitle']}</p>
                  </div>
                </div>
            '''
            
        for sess in day['sessions']:
            is_plenary = 'plenary' in sess['title'].lower()
            bg_color = 'bg-secondary/5' if is_plenary else 'bg-primary/5'
            border_color = 'border-secondary' if is_plenary else 'border-primary'
            text_color = 'text-secondary' if is_plenary else 'text-primary'
            
            program_jsx += f'''
                <div className="px-4 py-4 flex flex-col md:flex-row gap-4 {bg_color} border-l-4 {border_color} transition-colors">
                  <div className="md:w-32 font-mono text-sm font-bold text-foreground flex-shrink-0">{sess['time']}</div>
                  <div className="flex-1">
                    <h4 className="font-bold {text_color} text-lg">{sess['title']}</h4>
                    <div className="mt-3 divide-y divide-primary/10">
            '''
            
            for talk in sess['talks']:
                author_parts = talk['authors'].split(',') if talk['authors'] else []
                first_author = author_parts[0] if author_parts else ''
                rest_authors = ',' + ','.join(author_parts[1:]) if len(author_parts) > 1 else ''
                
                program_jsx += f'''
                      <div className="py-3 first:pt-0 last:pb-0">
                        <p className="text-sm font-bold">
                          <span className="text-foreground/50 font-mono font-normal mr-2">{talk['time']}</span>
                          <a href="#" className="text-primary hover:underline">{talk['title']}</a>
                        </p>
                        <p className="text-sm text-foreground/70 mt-1"><span className="underline">{first_author}</span>{rest_authors}</p>
                        <p className="text-xs mt-1">
                          <a href="#" className="text-secondary hover:underline">Abstract</a>
                        </p>
                      </div>
                '''
                
            program_jsx += '''
                    </div>
                  </div>
                </div>
            '''
            
        program_jsx += '''
              </div>
            </div>
        '''

    tsx = re.sub(r'\{/\* \[REPEAT THIS BLOCK FOR EACH DAY\] \*/\}.*?\{/\* \[END DAY REPEAT\] \*/\}', program_jsx, tsx, flags=re.DOTALL)
    
    return tsx

days = parse_text(text)
tsx = build_tsx(year, days, meta)
with open(out_file, 'w', encoding='utf-8') as f:
    f.write(tsx)
print("Fixed 2013 TSX")
