import os
import re
import json

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

raw_dir = r"c:\Antigravity\HEMS-website\docs\archives_translation\raw_text"
output_dir = r"c:\Antigravity\HEMS-website\src\frontend\src\data\archives"

def parse_text(text, year):
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
            current_day = {"title": line, "items": []}
            days.append(current_day)
            current_event = None
            current_session = None
            continue
        
        if not current_day:
            if time_match:
                current_day = {"title": "Workshop Schedule", "items": []}
                days.append(current_day)
            else:
                continue

        if time_match:
            time_str = time_match.group(1).strip()
            rest = time_match.group(2).strip()
            
            is_explicit_session = any(k in rest.lower() for k in ["technical session", "plenary", "poster session"])
            is_event = any(k in rest.lower() for k in ["breakfast", "lunch", "dinner", "break", "reception", "registration", "remarks", "excursion", "social", "tour", "adjourn", "welcome", "set-up", "free time", "meeting", "business", "banquet", "cocktail", "happy hour", "departure", "adjournment"])

            if is_explicit_session:
                current_session = {"type": "session", "time": time_str, "title": rest, "talks": []}
                current_day["items"].append(current_session)
                current_event = None
            elif not is_event and len(rest) > 10:
                if not current_session:
                    current_session = {"type": "session", "time": time_str, "title": "Technical Session", "talks": []}
                    current_day["items"].append(current_session)
                talk = {"time": time_str, "raw_text": rest, "title": "", "authors": ""}
                current_session["talks"].append(talk)
                current_event = None
            else:
                current_event = {"type": "event", "time": time_str, "title": rest, "subtitle": ""}
                current_day["items"].append(current_event)
                current_session = None
        else:
            if current_session and current_session["talks"]:
                if year in [2003, 2013]:
                    current_session["talks"][-1]["raw_text"] += " " + line
                else:
                    if not current_session["talks"][-1]["authors"]:
                        current_session["talks"][-1]["authors"] = line
                    elif len(current_session["talks"][-1]["authors"]) < 200:
                        current_session["talks"][-1]["authors"] += " " + line
            elif current_event:
                if not current_event["subtitle"]:
                    current_event["subtitle"] = line
                elif len(current_event["subtitle"]) < 200:
                    current_event["subtitle"] += " " + line

    for day in days:
        for item in day["items"]:
            if item["type"] == "session":
                for talk in item["talks"]:
                    if year == 2003:
                        raw = talk.get("raw_text", "")
                        m = re.match(r'^(.*?)\s*"(.*?)",?\s*(.*)$', raw)
                        if m:
                            authors = m.group(1).strip()
                            title = m.group(2).strip()
                            rest = m.group(3).strip()
                            talk["title"] = title
                            talk["authors"] = authors + (", " + rest if rest and len(rest) < 100 else "")
                        else:
                            talk["title"] = raw
                            talk["authors"] = ""
                    elif year == 2013:
                        raw = talk.get("raw_text", "")
                        m = re.match(r'^(.*?)\s+([A-Z]\.[A-Z]?\.?\s*[A-Z][a-zA-Z\-]+,.*)Abstract\s*$', raw)
                        if m:
                            talk["title"] = m.group(1).strip()
                            talk["authors"] = m.group(2).strip()
                        else:
                            m2 = re.match(r'^(.*?)\s+([A-Z]\.[A-Z]?\.?\s*[A-Z][a-zA-Z\-]+,.*)', raw)
                            if m2:
                                talk["title"] = m2.group(1).strip()
                                talk["authors"] = m2.group(2).strip()
                            else:
                                talk["title"] = raw
                                talk["authors"] = ""
                    else:
                        talk["title"] = talk.get("raw_text", talk.get("title", ""))
                    
                    # Cleanup talk dict
                    if "raw_text" in talk:
                        del talk["raw_text"]

    return days

for year, meta in workshops.items():
    raw_file = os.path.join(raw_dir, f"{year}.txt")
    if not os.path.exists(raw_file):
        continue
    with open(raw_file, 'r', encoding='utf-8') as f:
        text = f.read()
    
    days = parse_text(text, year)
    
    data = {
        "year": year,
        "ordinal": meta["ordinal"],
        "dates": meta["dates"],
        "venue": meta["venue"],
        "address": meta["address"],
        "resources": [
            {"label": "Abstracts & Presentations", "url": "#", "icon": "Download"},
            {"label": "Participant List (PDF)", "url": "#", "icon": "Users"},
            {"label": "Corporate Sponsors", "url": "#", "icon": "Building"}
        ],
        "sponsors": [],
        "schedule": days
    }
    
    out_file = os.path.join(output_dir, f"{year}.json")
    with open(out_file, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print(f"Generated {out_file}")

# Generate template.json
template_data = {
    "year": 2024,
    "ordinal": "15th",
    "dates": "October 1-4, 2024",
    "venue": "Example Hotel",
    "address": "City, ST",
    "resources": [
        {"label": "Abstracts", "url": "#", "icon": "Download"}
    ],
    "sponsors": [],
    "schedule": [
        {
            "title": "Monday, Oct 1 | Travel Day",
            "items": [
                {"type": "event", "time": "6:00 p.m.", "title": "Welcome Reception", "subtitle": "Lobby"}
            ]
        },
        {
            "title": "Tuesday, Oct 2 | Workshop",
            "items": [
                {"type": "event", "time": "8:00 a.m.", "title": "Breakfast", "subtitle": "Lobby"},
                {
                    "type": "session",
                    "time": "9:00 a.m.",
                    "title": "Technical Session I",
                    "talks": [
                        {
                            "time": "9:00 a.m.",
                            "title": "Talk Title",
                            "authors": "First Last, Institution"
                        }
                    ]
                }
            ]
        }
    ]
}

with open(os.path.join(output_dir, "template.json"), 'w', encoding='utf-8') as f:
    json.dump(template_data, f, indent=2, ensure_ascii=False)
