const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const dir = path.join(__dirname, '../content/issues');

fs.readdirSync(dir).forEach(file => {
  if (file.endsWith('.mdx')) {
    const filePath = path.join(dir, file);
    let rawContent = fs.readFileSync(filePath, 'utf8');

    // Fix bad inline concatenation if present
    rawContent = rawContent.replace(/"\s+- title:\s*"node-wiki/g, '"\n  - title: "node-wiki');

    const parsed = matter(rawContent);
    const sources = parsed.data.sources || [];
    
    // Clean duplicate node-wiki entries if any
    const cleanSources = sources.filter(s => !(s.title && s.title.includes('node-wiki')));
    cleanSources.push({
      title: 'node-wiki (My Knowledge Base)',
      publisher: 'Infinity Brain Vault',
      date: parsed.data.date || '2026-08-10',
      url: '/about'
    });

    parsed.data.sources = cleanSources;

    const newContent = matter.stringify(parsed.content, parsed.data);
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log('Successfully formatted frontmatter sources in:', file);
  }
});
