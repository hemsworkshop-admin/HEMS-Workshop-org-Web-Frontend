const fs = require('fs');
const path = require('path');

const stepsDir = 'C:\\Users\\ryanb\\.gemini\\antigravity\\brain\\7b63a756-b8d0-4054-93ff-34d6d788e3ce\\.system_generated\\steps';

const dirs = fs.readdirSync(stepsDir);
const posterLinks = new Set();

dirs.forEach(d => {
    const filePath = path.join(stepsDir, d, 'content.md');
    if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        const lines = content.split('\n');
        
        let inPosterSection = false;
        
        lines.forEach(line => {
            // Check if it's a heading containing 'poster'
            if (line.match(/^#.*poster/i) || line.toLowerCase().includes('poster session')) {
                inPosterSection = true;
            } else if (line.match(/^#/)) {
                inPosterSection = false;
            }
            
            // Or if the line itself has 'poster' in it
            if (inPosterSection || line.toLowerCase().includes('poster')) {
                const regex = /(https?:\/\/[^\s\)]+)/g;
                let match;
                while ((match = regex.exec(line)) !== null) {
                    let url = match[1];
                    // Clean up URL if it has trailing quotes or brackets not matched
                    url = url.replace(/['"]$/, '');
                    posterLinks.add(url);
                }
            }
        });
    }
});

const outputPath = 'C:\\Antigravity\\HEMS-website\\extracted_poster_links.txt';
fs.writeFileSync(outputPath, Array.from(posterLinks).join('\n'));
console.log(`Extracted ${posterLinks.size} poster links to ${outputPath}.`);
