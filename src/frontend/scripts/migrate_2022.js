const fs = require('fs/promises');
const path = require('path');

function similarity(s1, s2) {
  let longer = s1.toLowerCase();
  let shorter = s2.toLowerCase();
  if (longer.length < shorter.length) { longer = s2.toLowerCase(); shorter = s1.toLowerCase(); }
  let longerLength = longer.length;
  if (longerLength === 0) return 1.0;
  
  const costs = new Array();
  for (let i = 0; i <= longer.length; i++) {
    let lastValue = i;
    for (let j = 0; j <= shorter.length; j++) {
      if (i == 0) costs[j] = j;
      else {
        if (j > 0) {
          let newValue = costs[j - 1];
          if (longer.charAt(i - 1) != shorter.charAt(j - 1))
            newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
    }
    if (i > 0) costs[shorter.length] = lastValue;
  }
  
  return (longerLength - costs[shorter.length]) / parseFloat(longerLength);
}

function getBestPosterUrl(title, author, posterLinks) {
  if (!title && !author) return "";
  let bestScore = 0;
  let bestUrl = "";
  for (const url of posterLinks) {
    const filename = url.split('/').pop().replace('.pdf', '').replace(/%20/g, ' ').toLowerCase();
    
    // Check if filename matches author name or title
    let score = 0;
    if (author) {
      const authorParts = author.toLowerCase().split(',');
      const firstAuthorLast = authorParts[0].split(' ').pop();
      if (filename.includes(firstAuthorLast)) {
        score = 0.8;
      }
    }
    
    // Fuzzy match
    const fuzzyScore = similarity(title, filename);
    if (fuzzyScore > score) score = fuzzyScore;

    if (score > bestScore) {
      bestScore = score;
      bestUrl = url;
    }
  }
  return bestScore > 0.5 ? bestUrl : "";
}

async function run() {
  const rootDir = path.join(__dirname, '..', '..', '..');
  const masterJsonPath = path.join(__dirname, '..', 'src', 'data', 'master_workshops.json');
  const data2022Path = path.join(__dirname, '..', 'src', 'data', 'archives', '2022.json');
  const posterLinksPath = path.join(rootDir, 'extracted_poster_links.txt');
  const allLinksPath = path.join(rootDir, 'scratch', 'all_extracted_links.json');

  // 1. Load Master Workshops
  let masterWorkshops = [];
  try {
    const rawMaster = await fs.readFile(masterJsonPath, 'utf8');
    masterWorkshops = JSON.parse(rawMaster);
  } catch (err) {
    console.error("Could not read master_workshops.json", err);
    return;
  }

  // Find the 14th Workshop (2022) index
  const wsIndex = masterWorkshops.findIndex(w => w.number === 14);
  if (wsIndex === -1) {
    console.error("14th Workshop not found in master_workshops.json");
    return;
  }

  // 2. Load 2022 Archive Data
  let data2022;
  try {
    const raw2022 = await fs.readFile(data2022Path, 'utf8');
    data2022 = JSON.parse(raw2022);
  } catch (err) {
    console.error("Could not read 2022.json", err);
    return;
  }

  // 3. Load Poster Links
  let posterLinks = [];
  try {
    const rawPosterLinks = await fs.readFile(posterLinksPath, 'utf8');
    posterLinks = rawPosterLinks.split('\n').map(l => l.trim()).filter(l => l);
  } catch (err) {
    console.warn("Could not read extracted_poster_links.txt", err.message);
  }

  // 4. Update Metadata
  masterWorkshops[wsIndex].venue = data2022.venue || "";
  if (data2022.address) {
    const parts = data2022.address.split(',');
    if (parts.length > 1) {
       masterWorkshops[wsIndex].city = parts[1].trim();
    }
  }

  // 5. Update Sponsors
  if (data2022.sponsors) {
    masterWorkshops[wsIndex].sponsors = data2022.sponsors.map(s => ({
      company: s.name,
      year: "2022",
      link: s.url || "",
      logo_file: s.image ? s.image.split('/').pop() : ""
    }));
  }

  // 6. Flatten Schedule into Presentations, Posters & Events
  const presentations = [];
  const posters = [];
  const events = [];

  if (data2022.schedule) {
    for (const day of data2022.schedule) {
      const dateString = day.title; // e.g. "Monday, September 26, 2022"
      
      if (day.items) {
        for (const item of day.items) {
          if (item.type === 'event') {
            events.push({
              date: dateString,
              time: item.time || "",
              title: item.title || "",
              subtitle: item.subtitle || ""
            });
          } else if (item.type === 'session') {
            const sessionTitle = item.title;
            const isPosterSession = sessionTitle.toLowerCase().includes('poster');

            if (item.talks) {
              for (const talk of item.talks) {
                const authorStr = talk.authors || "";
                
                // Parse authors string into array
                const authorNames = authorStr.split(',').map(a => a.trim()).filter(a => a);
                const authorsArray = authorNames.map((name, idx) => ({
                  name: name,
                  isPresenter: idx === 0 // default first author as presenter
                }));

                if (isPosterSession) {
                  // Map to Poster
                  const affiliation = ""; // 2022.json didn't separate affiliation
                  const matchedUrl = getBestPosterUrl(talk.title, authorStr, posterLinks);
                  
                  posters.push({
                    title: talk.title,
                    authors: authorsArray,
                    url: talk.presentationUrl || matchedUrl || "",
                    abstract_url: talk.abstractUrl || ""
                  });
                } else {
                  // Map to Presentation
                  presentations.push({
                    date: dateString,
                    time: talk.time || item.time,
                    session: sessionTitle,
                    title: talk.title,
                    authors: authorsArray,
                    url: talk.presentationUrl || "",
                    abstract_url: talk.abstractUrl || ""
                  });
                }
              }
            }
          }
        }
      }
    }
  }

  masterWorkshops[wsIndex].presentations = presentations;
  masterWorkshops[wsIndex].posters = posters;
  masterWorkshops[wsIndex].events = events;

  // Save changes
  await fs.writeFile(masterJsonPath, JSON.stringify(masterWorkshops, null, 2));
  console.log(`Successfully migrated 2022 (14th) Workshop! Added ${presentations.length} presentations, ${posters.length} posters, ${events.length} events, and ${masterWorkshops[wsIndex].sponsors.length} sponsors.`);
}

run().catch(console.error);
