const fs = require('fs'); // eslint-disable-line @typescript-eslint/no-require-imports
const path = require('path'); // eslint-disable-line @typescript-eslint/no-require-imports
const matter = require('gray-matter'); // eslint-disable-line @typescript-eslint/no-require-imports

const issuesDir = path.join(__dirname, '..', 'content', 'issues');
const files = fs.readdirSync(issuesDir);

let deletedCount = 0;
let keptCount = 0;

files.forEach(file => {
  if (!file.endsWith('.mdx') && !file.endsWith('.md')) return;
  const filePath = path.join(issuesDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const { data } = matter(content);

  const num = Number(data.issueNumber);
  if (num >= 1 && num <= 25) {
    fs.unlinkSync(filePath);
    console.log(`DELETED sample issue #${num}: ${file}`);
    deletedCount++;
  } else {
    console.log(`KEPT real vault issue #${num}: ${file}`);
    keptCount++;
  }
});

console.log(`Deletion complete. Deleted ${deletedCount} sample files. Kept ${keptCount} real vault issues.`);
