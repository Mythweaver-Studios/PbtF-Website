/* eslint-env node */
// scripts/generate-voiceline-manifest.js
const fs = require('fs');
const path = require('path');

const voicelinesDir = path.join(__dirname, '../public/assets/audio/voicelines');
const manifestPath = path.join(__dirname, '../src/assets/audio', 'voiceline-manifest.json');

const manifest = {};

try {
    const characters = fs.readdirSync(voicelinesDir);

    characters.forEach(char => {
        const charDir = path.join(voicelinesDir, char);
        if (fs.statSync(charDir).isDirectory()) {
            const files = fs.readdirSync(charDir)
                .filter(file => file.endsWith('.wav'))
                .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
                .map(file => `/assets/audio/voicelines/${char}/${encodeURI(file)}`);
            manifest[char] = files;
        }
    });

    // Ensure the target directory exists
    const manifestDir = path.dirname(manifestPath);
    if (!fs.existsSync(manifestDir)) {
        fs.mkdirSync(manifestDir, { recursive: true });
    }

    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
    console.log('Voiceline manifest generated successfully!');

} catch (error) {
    if (error.code === 'ENOENT') {
        console.warn('Voicelines directory not found. Skipping manifest generation.');
        // Create an empty manifest if the dir doesn't exist
        fs.writeFileSync(manifestPath, JSON.stringify({}, null, 2));
    } else {
        console.error('Error generating voiceline manifest:', error);
    }
}