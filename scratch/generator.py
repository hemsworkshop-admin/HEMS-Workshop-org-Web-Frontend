import os
import re

# Data mapping
workshops = [
    {"num": 1, "year": "1999", "file": "1stProgram.md", "title": "1st HEMS Workshop"},
    {"num": 2, "year": "2001", "file": "2ndProgram.md", "title": "2nd HEMS Workshop"},
    {"num": 3, "year": "2002", "file": "3rdprogrampresentations.md", "title": "3rd HEMS Workshop"},
    {"num": 4, "year": "2003", "file": "4thprogrampresentations.md", "title": "4th HEMS Workshop"},
    {"num": 5, "year": "2005", "file": "5thprogrampresentations.md", "title": "5th HEMS Workshop"},
    {"num": 6, "year": "2007", "file": "6thprogrampresentations1.md", "title": "6th HEMS Workshop"},
    {"num": 7, "year": "2009", "file": "7thProgram.md", "title": "7th HEMS Workshop"},
    {"num": 8, "year": "2011", "file": "8thprogramwpresentations.md", "title": "8th HEMS Workshop"},
    {"num": 9, "year": "2013", "file": "9thProgram.md", "title": "9th HEMS Workshop"},
    {"num": 10, "year": "2015", "file": "10thProgram.md", "title": "10th HEMS Workshop"},
    {"num": 11, "year": "2017", "file": "11thProgram.md", "title": "11th HEMS Workshop"},
    {"num": 12, "year": "2018", "file": "12thProgram.md", "title": "12th HEMS Workshop"}
]

input_dir = r"c:\Antigravity\HEMS-website\docs\archives_translation"
output_dir = r"c:\Antigravity\HEMS-website\src\frontend\src\app\archive"

template = """import Link from "next/link";
import Image from "next/image";
import {{ Calendar, MapPin, Users, FileText, Download, Building, ArrowLeft }} from "lucide-react";

export default function Workshop{year}() {{
  return (
    <div className="flex flex-col flex-grow py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
      <Link href="/archive" className="flex items-center gap-2 text-primary font-bold hover:text-primary/80 transition-colors mb-8 w-fit">
        <ArrowLeft size={{16}} /> Back to Archives
      </Link>

      <div className="bg-surface border border-foreground/10 rounded-lg p-8 md:p-12 mb-12 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>

        <span className="inline-block bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-6 font-mono">
          {num}th Annual Workshop
        </span>
        
        <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tight mb-6">
          {year} HEMS Workshop
        </h1>
        
        <p className="text-xl text-foreground/80 max-w-3xl mb-8 leading-relaxed">
          Archive of the {num}th Workshop on Harsh-Environment Mass Spectrometry.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 text-foreground/70 font-medium border-b border-foreground/10 pb-8 mb-8">
          <div className="flex items-center gap-3">
            <Calendar className="text-secondary" size={{20}} />
            <span>{year} Archive</span>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="text-secondary mt-1 flex-shrink-0" size={{20}} />
            <span>Historical Location<br/></span>
          </div>
        </div>

        {{/* Legacy Corporate Sponsors Grid */}}
        <div className="mt-8 border-t border-foreground/10 pt-8">
          <h3 className="text-sm font-bold uppercase tracking-widest text-foreground/50 mb-6">Legacy Corporate Sponsors</h3>
          <div className="flex flex-wrap gap-8 items-center opacity-60 hover:opacity-100 transition-opacity duration-300">
            <Image 
              src="/images/sponsors/inficon.png" 
              alt="INFICON" 
              width={{140}} 
              height={{40}} 
              className="grayscale hover:grayscale-0 transition-all duration-300 object-contain h-10 w-auto" 
            />
            <Image 
              src="/images/sponsors/pfeiffer.png" 
              alt="PFEIFFER" 
              width={{140}} 
              height={{40}} 
              className="grayscale hover:grayscale-0 transition-all duration-300 object-contain h-10 w-auto" 
            />
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
          <FileText className="text-primary" /> Technical Program
        </h2>
        
        <div className="bg-background border border-foreground/10 rounded-lg overflow-hidden">
          {content}
        </div>
      </div>
    </div>
  );
}}
"""

def escape_react(text):
    return text.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;').replace('{', '&#123;').replace('}', '&#125;')

for ws in workshops:
    filepath = os.path.join(input_dir, ws['file'])
    if not os.path.exists(filepath):
        print(f"Skipping {ws['year']}, file not found: {filepath}")
        continue
    
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        raw_text = f.read()
    
    lines = raw_text.splitlines()
    
    days = []
    current_day = {"title": "Workshop Schedule", "events": []}
    current_event = None
    
    for line in lines:
        orig_line = line
        line = line.strip()
        if not line: continue
        if line.startswith('# Extracted from'): continue
        
        # Heuristic for new Day
        if re.match(r'^(Mon|Tue|Wed|Thu|Fri|Sat|Sun|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday|Day \d+)', line, re.IGNORECASE):
            # Start new day
            if current_day["events"] or len(days) > 0:
                days.append(current_day)
            current_day = {"title": line, "events": []}
            current_event = None
            continue
            
        # Heuristic for time
        if re.match(r'^\d{1,2}:\d{2}\s*(a\.m\.|p\.m\.|AM|PM|A\.M\.|P\.M\.)', line, re.IGNORECASE):
            if current_event:
                current_day["events"].append(current_event)
            current_event = {"time": line, "lines": []}
        else:
            if current_event:
                current_event["lines"].append(line)
            else:
                # Top level description or intro text before a time block
                if line != current_day["title"]:
                    current_event = {"time": "Info", "lines": [line]}

    if current_event:
        current_day["events"].append(current_event)
    if current_day["events"]:
        days.append(current_day)
        
    # If no days generated (some edge case), wrap all lines in one event
    if not days:
        days = [{"title": "Workshop Schedule", "events": [{"time": "General", "lines": [l.strip() for l in lines if l.strip()]}]}]

    formatted_content = ""
    for day in days:
        formatted_content += f'''
          <div className="border-b border-foreground/10 last:border-0">
            <div className="bg-surface px-6 py-4 border-b border-foreground/10">
              <h3 className="font-bold text-lg">{escape_react(day["title"])}</h3>
            </div>
            <div className="divide-y divide-foreground/5">'''
        for event in day["events"]:
            time = escape_react(event["time"])
            lines_data = event["lines"]
            title = escape_react(lines_data[0]) if len(lines_data) > 0 else "Event"
            
            # Special Styling for Plenary and Technical Sessions
            if "plenary" in title.lower():
                formatted_content += f'''
              <div className="px-4 py-4 flex flex-col md:flex-row gap-4 bg-secondary/5 border-l-4 border-secondary transition-colors">
                <div className="md:w-32 font-mono text-sm font-bold text-foreground flex-shrink-0">{time}</div>
                <div className="flex-1">
                  <h4 className="font-bold text-secondary text-lg">{title}</h4>'''
            elif "technical session" in title.lower() or "session" in title.lower():
                formatted_content += f'''
              <div className="px-4 py-4 flex flex-col md:flex-row gap-4 bg-primary/5 border-l-4 border-primary transition-colors">
                <div className="md:w-32 font-mono text-sm font-bold text-foreground flex-shrink-0">{time}</div>
                <div className="flex-1">
                  <h4 className="font-bold text-primary text-lg">{title}</h4>'''
            else:
                formatted_content += f'''
              <div className="px-4 py-3 flex flex-col md:flex-row gap-4 hover:bg-surface/30 transition-colors border-l-4 border-transparent">
                <div className="md:w-32 font-mono text-sm font-bold text-foreground flex-shrink-0">{time}</div>
                <div>
                  <h4 className="font-bold">{title}</h4>'''
                  
            for additional_line in lines_data[1:]:
                al = escape_react(additional_line)
                formatted_content += f'''
                  <p className="text-sm text-foreground/70 mt-1">{al}</p>'''
            formatted_content += '''
                </div>
              </div>'''
        formatted_content += '''
            </div>
          </div>'''
          
    out_dir = os.path.join(output_dir, ws['year'])
    os.makedirs(out_dir, exist_ok=True)
    out_file = os.path.join(out_dir, "page.tsx")
    
    page_content = template.format(
        year=ws['year'],
        num=ws['num'],
        content=formatted_content
    )
    
    with open(out_file, 'w', encoding='utf-8') as f:
        f.write(page_content)
    print(f"Generated {out_file}")

print("Done generating pages.")
