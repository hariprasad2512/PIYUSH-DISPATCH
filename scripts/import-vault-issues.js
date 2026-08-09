const fs = require('fs'); // eslint-disable-line @typescript-eslint/no-require-imports
const path = require('path'); // eslint-disable-line @typescript-eslint/no-require-imports

const vaultFolder = 'C:\\Users\\offic\\OneDrive\\Desktop\\obsidean\\nexusdb\\AREAS\\newsletter';
const outputFolder = 'C:\\Users\\offic\\OneDrive\\Desktop\\newsletter\\content\\issues';

const issueFiles = [
  { file: 'issue#6.md', num: 31, date: '2026-08-09', topics: ['AI', 'Agentic AI', 'Graph Engineering'] },
  { file: 'issue#5.md', num: 30, date: '2026-08-08', topics: ['AI', 'Agents', 'Loop Engineering'] },
  { file: 'issue#4.md', num: 29, date: '2026-08-07', topics: ['AI', 'Software Engineering', 'Harness Engineering'] },
  { file: 'issue#3.md', num: 28, date: '2026-08-06', topics: ['AI', 'Technology', 'Context Engineering'] },
  { file: 'issue#2.md', num: 27, date: '2026-08-05', topics: ['AI', 'Machine Learning', 'RAG'] },
  { file: 'issue#1.md', num: 26, date: '2026-08-04', topics: ['AI', 'Technology', 'Prompt Engineering'] },
];

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

for (const item of issueFiles) {
  const filePath = path.join(vaultFolder, item.file);
  if (!fs.existsSync(filePath)) continue;

  let raw = fs.readFileSync(filePath, 'utf8');
  raw = raw.replace(/\.\/assets\//g, '/assets/');

  const lines = raw.split('\n');
  let title = '';
  let subtitle = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith('# ')) {
      title = line.replace('# ', '').replace(/^Issue #\d+:\s*/, '').trim();
    } else if (line.startsWith('*') && line.endsWith('*') && !subtitle) {
      subtitle = line.replace(/^\*|\*$/g, '').trim();
    }
  }

  const slug = slugify(title);
  const heroMatch = raw.match(/!\[.*?\]\((.*?)\)/);
  const heroImage = heroMatch ? heroMatch[1] : '/images/issues/placeholder.svg';
  const plainText = raw.replace(/#+\s+.+/g, '').replace(/!\[.*?\]\(.*?\)/g, '').replace(/[*_~`]/g, '').trim();
  const excerpt = subtitle || plainText.substring(0, 160) + '...';

  const mdxContent = `---
issueNumber: ${item.num}
date: "${item.date}"
title: "${title.replace(/"/g, '\\"')}"
subtitle: "${subtitle.replace(/"/g, '\\"')}"
excerpt: "${excerpt.replace(/"/g, '\\"')}"
heroImage: "${heroImage}"
topics:
${item.topics.map(t => `  - ${t}`).join('\n')}
tags:
${item.topics.map(t => `  - ${slugify(t)}`).join('\n')}
sources:
  - title: "Piyush's Dispatch Original"
    publisher: "Piyush's Dispatch"
    date: "${item.date}"
    url: "https://dispatch.piyush.dev"
published: true
---

${raw}
`;

  const targetFile = path.join(outputFolder, `${String(item.num).padStart(3, '0')}-${slug}.mdx`);
  fs.writeFileSync(targetFile, mdxContent, 'utf8');
  console.log(`Updated Issue #${item.num} (${title}) -> ${targetFile}`);
}

console.log('Vault issue renumbering complete!');
