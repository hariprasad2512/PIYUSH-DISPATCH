const fs = require('fs');
const path = require('path');

const issuesDir = path.join(__dirname, '../content/issues');
const files = fs.readdirSync(issuesDir).filter(f => f.endsWith('.mdx') || f.endsWith('.md'));

files.forEach(file => {
  const filePath = path.join(issuesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/\/assets\/issue(%23|#)/gi, '/assets/issue-');
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated image paths in ${file}`);
});

console.log('MDX image path normalization complete.');
