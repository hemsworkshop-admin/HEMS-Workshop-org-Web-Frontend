import json

with open(r"c:\Antigravity\HEMS-website\src\frontend\src\data\archives\2022.json", "r") as f:
    data = json.load(f)

for day in data["schedule"]:
    items = []
    events = day.get("events", [])
    sessions = day.get("sessions", [])
    
    # Simple time parsing for sorting
    def parse_time(tstr):
        # Very hacky, e.g., "9:00 a.m.", "12:00 noon", "6:00 p.m."
        if not tstr: return 0
        tstr = tstr.lower()
        if "evening" in tstr: return 18 * 60
        num_str = tstr.split()[0]
        try:
            h, m = map(int, num_str.split(':'))
        except:
            return 0
        if "p.m." in tstr and h != 12: h += 12
        if "a.m." in tstr and h == 12: h = 0
        if "noon" in tstr: h = 12
        return h * 60 + m

    for e in events:
        e["type"] = "event"
        items.append(e)
    for s in sessions:
        s["type"] = "session"
        items.append(s)
        
    items.sort(key=lambda x: parse_time(x.get("time", "")))
    day["items"] = items
    if "events" in day: del day["events"]
    if "sessions" in day: del day["sessions"]

with open(r"c:\Antigravity\HEMS-website\src\frontend\src\data\archives\2022.json", "w") as f:
    json.dump(data, f, indent=2)
