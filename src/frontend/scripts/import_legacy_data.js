const fs = require('fs/promises');
const path = require('path');

// Basic fuzzy matching functions
function editDistance(s1, s2) {
  s1 = s1.toLowerCase();
  s2 = s2.toLowerCase();
  const costs = new Array();
  for (let i = 0; i <= s1.length; i++) {
    let lastValue = i;
    for (let j = 0; j <= s2.length; j++) {
      if (i == 0) costs[j] = j;
      else {
        if (j > 0) {
          let newValue = costs[j - 1];
          if (s1.charAt(i - 1) != s2.charAt(j - 1))
            newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
    }
    if (i > 0) costs[s2.length] = lastValue;
  }
  return costs[s2.length];
}

function similarity(s1, s2) {
  let longer = s1;
  let shorter = s2;
  if (s1.length < s2.length) { longer = s2; shorter = s1; }
  let longerLength = longer.length;
  if (longerLength === 0) return 1.0;
  return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
}

function getBestLegacyLink(title, legacyLinks) {
  if (!title) return "";
  let bestScore = 0;
  let bestUrl = "";
  for (const link of legacyLinks) {
    const score = similarity(title, link.text);
    if (score > bestScore) {
      bestScore = score;
      bestUrl = link.url;
    }
  }
  return bestScore > 0.6 ? bestUrl : "";
}

async function run() {
  const rootDir = path.join(__dirname, '..', '..', '..');
  const masterJsonPath = path.join(__dirname, '..', 'src', 'data', 'master_workshops.json');
  const legacyLinksPath = path.join(rootDir, 'scratch', 'all_extracted_links.json');
  
  let legacyLinks = [];
  try {
    const rawLinks = await fs.readFile(legacyLinksPath, 'utf8');
    legacyLinks = JSON.parse(rawLinks);
    console.log(`Loaded ${legacyLinks.length} legacy links.`);
  } catch (err) {
    console.warn("Could not read all_extracted_links.json", err.message);
  }

  // Define basic metadata for the 14 workshops (you can expand this with real data)
  const workshopYears = [1999, 2001, 2003, 2005, 2007, 2009, 2011, 2013, 2015, 2017, 2019, 2021, 2022, 2023];
  
  let masterWorkshops = [];
  try {
    const rawMaster = await fs.readFile(masterJsonPath, 'utf8');
    masterWorkshops = JSON.parse(rawMaster);
  } catch (err) {
    console.log("No existing master_workshops.json found, creating fresh array.");
  }

  // Seed standard workshop objects if empty
  if (masterWorkshops.length === 0) {
    for (let i = 0; i < 14; i++) {
      masterWorkshops.push({
        number: i + 1,
        year: workshopYears[i],
        city: "",
        venue: "",
        presentations: [],
        sponsors: [],
        student_awards: [],
        posters: []
      });
    }
  }

  // Note: To fully map presentations, you would parse docs/archives_translation/ raw text
  // and inject them here. For demonstration, we just show how fuzzy matching works against existing titles.
  let matchCount = 0;
  for (const ws of masterWorkshops) {
    if (ws.presentations) {
      for (const pres of ws.presentations) {
        if (!pres.url && pres.title) {
          const matchedUrl = getBestLegacyLink(pres.title, legacyLinks);
          if (matchedUrl) {
            pres.url = matchedUrl;
            matchCount++;
          }
        }
      }
    }
  }

  console.log(`Fuzzy matched ${matchCount} legacy URLs to presentations.`);

  // Write back the updated JSON
  await fs.writeFile(masterJsonPath, JSON.stringify(masterWorkshops, null, 2));
  console.log(`Successfully seeded data into ${masterJsonPath}`);
}

run().catch(console.error);
