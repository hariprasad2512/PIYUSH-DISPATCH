const fs = require('fs'); // eslint-disable-line @typescript-eslint/no-require-imports
const path = require('path'); // eslint-disable-line @typescript-eslint/no-require-imports

function auditFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');

  // Check for dummy href="#"
  if (content.includes('href="#"') || content.includes("href='#'")) {
    console.log('DUMMY HREF "#" FOUND IN:', filePath);
  }

  // Check for example.com links in frontmatter or content
  if (content.includes('example.com')) {
    console.log('EXAMPLE.COM LINK FOUND IN:', filePath);
  }

  // Check for relative non-image markdown links
  const mdLinks = content.match(/\[[^\]]+\]\(([^)]+)\)/g) || [];
  mdLinks.forEach(link => {
    if (link.includes('./') || link.includes('../')) {
      console.log('RELATIVE LINK FOUND IN:', filePath, '-->', link);
    }
  });
}

function auditDir(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.next') {
        auditDir(full);
      }
    } else if (file.endsWith('.mdx') || file.endsWith('.tsx') || file.endsWith('.ts')) {
      auditFile(full);
    }
  });
}

auditDir(path.join(__dirname, '..'));
console.log('Audit complete.');
