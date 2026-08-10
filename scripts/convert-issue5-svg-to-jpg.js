const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const issue5Dir = path.join(__dirname, '../public/assets/issue-5');

async function convertSvgsToJpgs() {
  const files = fs.readdirSync(issue5Dir);
  const svgFiles = files.filter(f => f.endsWith('.svg'));

  console.log(`Found ${svgFiles.length} SVG files in ${issue5Dir}`);

  for (const svgFile of svgFiles) {
    const baseName = path.basename(svgFile, '.svg');
    const svgPath = path.join(issue5Dir, svgFile);
    const jpgPath = path.join(issue5Dir, `${baseName}.jpg`);

    const svgBuffer = fs.readFileSync(svgPath);

    await sharp(svgBuffer, { density: 300 })
      .flatten({ background: { r: 15, g: 23, b: 42 } }) // Dark slate background matching AMOLED/Dark aesthetic
      .jpeg({ quality: 90 })
      .toFile(jpgPath);

    console.log(`Converted ${svgFile} -> ${baseName}.jpg`);
  }

  console.log('Conversion complete!');
}

convertSvgsToJpgs().catch(err => {
  console.error('Error converting SVGs:', err);
  process.exit(1);
});
