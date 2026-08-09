const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, '../public/assets');

for (let i = 1; i <= 6; i++) {
  const hashDir = path.join(assetsDir, `issue#${i}`);
  const dashDir = path.join(assetsDir, `issue-${i}`);
  const pctDir = path.join(assetsDir, `issue%23${i}`);

  if (fs.existsSync(hashDir)) {
    console.log(`Syncing ${hashDir} -> ${dashDir}`);
    fs.cpSync(hashDir, dashDir, { recursive: true });
    fs.cpSync(hashDir, pctDir, { recursive: true });
  }
}

console.log('Asset synchronization complete.');
