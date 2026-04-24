import os
import re

workshops = {
    1999: {"ordinal": "1st", "dates": "February 21-23, 1999", "venue": "University of South Florida", "address": "St. Petersburg, FL"},
    2001: {"ordinal": "2nd", "dates": "March 18-21, 2001", "venue": "Unknown", "address": "St. Petersburg, FL"},
    2002: {"ordinal": "3rd", "dates": "March 25-28, 2002", "venue": "Jet Propulsion Laboratory", "address": "Pasadena, CA"},
    2003: {"ordinal": "4th", "dates": "October 7-9, 2003", "venue": "St. Petersburg", "address": "St. Petersburg, FL"},
    2005: {"ordinal": "5th", "dates": "September 20-22, 2005", "venue": "Lido Beach", "address": "Lido Beach, FL"},
    2007: {"ordinal": "6th", "dates": "September 17-20, 2007", "venue": "Cocoa Beach", "address": "Cocoa Beach, FL"},
    2009: {"ordinal": "7th", "dates": "September 21-24, 2009", "venue": "Fess Parker's Doubletree Resort", "address": "Santa Barbara, CA"},
    2011: {"ordinal": "8th", "dates": "September 19-22, 2011", "venue": "TradeWinds Island Grand Resort", "address": "St. Pete Beach, FL"},
    2013: {"ordinal": "9th", "dates": "September 22-25, 2013", "venue": "TradeWinds Island Grand Resort", "address": "St. Pete Beach, FL"},
    2015: {"ordinal": "10th", "dates": "August 11-13, 2015", "venue": "Lord Baltimore Hotel", "address": "Baltimore, MD"},
    2017: {"ordinal": "11th", "dates": "September 18-21, 2017", "venue": "Embassy Suites Mandalay Beach", "address": "Oxnard, CA"},
    2018: {"ordinal": "12th", "dates": "October 16-18, 2018", "venue": "Maritim Hotel", "address": "Cologne, Germany"},
}

template_path = r"c:\Antigravity\HEMS-website\docs\templates\archive-template.tsx"
raw_dir = r"c:\Antigravity\HEMS-website\docs\archives_translation\raw_text"
output_dir = r"c:\Antigravity\HEMS-website\src\frontend\src\app\archive"

with open(template_path, 'r', encoding='utf-8') as f:
    template = f.read()

# We need to split the template into the top part, day wrapper, event templates, and bottom part.
# This requires some string manipulation.

def parse_text(text):
    # This is a very basic heuristic parser.
    # It looks for Days, Times, and Sessions.
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

        if day_match and len(line) < 50: # Likely a day header
            current_day = {"title": line, "events": [], "sessions": []}
            days.append(current_day)
            current_event = None
            current_session = None
            continue
        
        if not current_day:
            # If no day matched yet, we create a dummy day if we see a time
            if time_match:
                current_day = {"title": "Workshop Schedule", "events": [], "sessions": []}
                days.append(current_day)
            else:
                continue

        if time_match:
            time_str = time_match.group(1).strip()
            rest = time_match.group(2).strip()
            
            # Is it a technical session?
            if "technical session" in rest.lower() or "plenary" in rest.lower():
                current_session = {"time": time_str, "title": rest, "talks": []}
                current_day["sessions"].append(current_session)
                current_event = None
            elif current_session and len(rest) > 10:
                # This is a talk inside the current session
                title = rest
                # Next line might be authors, we'll try to guess later.
                talk = {"time": time_str, "title": title, "authors": "", "abstract": "#"}
                current_session["talks"].append(talk)
                current_event = None
            else:
                # Just a normal event
                current_event = {"time": time_str, "title": rest, "subtitle": ""}
                current_day["events"].append(current_event)
                current_session = None
        else:
            # Append to current talk or event
            if current_session and current_session["talks"]:
                if not current_session["talks"][-1]["authors"]:
                    current_session["talks"][-1]["authors"] = line
                elif len(current_session["talks"][-1]["authors"]) < 200:
                    current_session["talks"][-1]["authors"] += " " + line
            elif current_event:
                if not current_event["subtitle"]:
                    current_event["subtitle"] = line
                elif len(current_event["subtitle"]) < 200:
                    current_event["subtitle"] += " " + line

    return days

def build_tsx(year, days, meta):
    # Base replacements
    tsx = template.replace("[WORKSHOP_YEAR]", str(year))
    tsx = tsx.replace("[WORKSHOP_YEAR: e.g. 2022]", str(year))
    tsx = tsx.replace("[WORKSHOP_EDITION_NUMBER: e.g. 14th]", meta['ordinal'])
    tsx = tsx.replace("[WORKSHOP_DESCRIPTION_PARAGRAPH: e.g. The 14th Workshop on Harsh-Environment Mass Spectrometry gathered leading scientists and engineers to discuss the latest advancements in ruggedized instrumentation and field-deployable analytical systems.]", f"The {meta['ordinal']} Workshop on Harsh-Environment Mass Spectrometry.")
    tsx = tsx.replace("[WORKSHOP_DATES: e.g. September 26-29, 2022]", meta['dates'])
    tsx = tsx.replace("[WORKSHOP_VENUE_NAME: e.g. Courtyard Cocoa Beach Cape Canaveral]", meta['venue'])
    tsx = tsx.replace("[WORKSHOP_VENUE_ADDRESS: e.g. 3435 N. Atlantic Ave, Cocoa Beach, FL 32931]", meta['address'])
    
    # We will just wipe the resources links to '#'
    tsx = re.sub(r'href="\[LINK_URL_[^\]]+\]"', 'href="#"', tsx)
    
    # We will remove the sponsor block because legacy sponsors are too hard to extract programmatically right now,
    # or just leave it empty.
    # Actually, we can leave the empty container or remove the repetitive inner Image.
    tsx = re.sub(r'\{/\* \[REPEAT FOR EACH SPONSOR LOGO\] \*/\}.*?\{/\* \[END REPEAT\] \*/\}', '', tsx, flags=re.DOTALL)

    # Now for the program block. We need to extract the loop templates from the template string.
    # It's easier to just construct the JSX for the days manually using the exact class names from the instructions.

    program_jsx = ""
    for day in days:
        program_jsx += f'''
            <div className="border-b border-foreground/10 last:border-0">
              <div className="bg-surface px-6 py-4 border-b border-foreground/10">
                <h3 className="font-bold text-lg">{day['title']}</h3>
              </div>
              <div className="divide-y divide-foreground/5">
        '''
        
        # Combine events and sessions in order of appearance? We separated them in parsing.
        # This is a bit hacky, so we will just print events then sessions.
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
                program_jsx += f'''
                      <div className="py-3 first:pt-0 last:pb-0">
                        <p className="text-sm font-bold">
                          <span className="text-foreground/50 font-mono font-normal mr-2">{talk['time']}</span>
                          <a href="#" className="text-primary hover:underline">{talk['title']}</a>
                        </p>
                        <p className="text-sm text-foreground/70 mt-1"><span className="underline">{talk['authors'].split(',')[0]}</span>{',' + ','.join(talk['authors'].split(',')[1:]) if ',' in talk['authors'] else ''}</p>
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

    # Replace the program section in TSX
    tsx = re.sub(r'\{/\* \[REPEAT THIS BLOCK FOR EACH DAY\] \*/\}.*?\{/\* \[END DAY REPEAT\] \*/\}', program_jsx, tsx, flags=re.DOTALL)
    
    return tsx

for year, meta in workshops.items():
    raw_file = os.path.join(raw_dir, f"{year}.txt")
    if not os.path.exists(raw_file):
        continue
    with open(raw_file, 'r', encoding='utf-8') as f:
        text = f.read()
    
    days = parse_text(text)
    
    tsx = build_tsx(year, days, meta)
    
    out_file = os.path.join(output_dir, str(year), "page.tsx")
    os.makedirs(os.path.dirname(out_file), exist_ok=True)
    with open(out_file, 'w', encoding='utf-8') as f:
        f.write(tsx)
    print(f"Generated {out_file}")

