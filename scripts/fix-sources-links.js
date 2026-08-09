const fs = require('fs'); // eslint-disable-line @typescript-eslint/no-require-imports
const path = require('path'); // eslint-disable-line @typescript-eslint/no-require-imports

const issuesDir = path.join(__dirname, '..', 'content', 'issues');
const files = fs.readdirSync(issuesDir);

let fixedCount = 0;

const domainReplacements = [
  'https://arxiv.org',
  'https://ai.google/research',
  'https://openai.com/index/research',
  'https://github.com/trending',
  'https://news.ycombinator.com',
  'https://techcrunch.com/category/artificial-intelligence',
  'https://huggingface.co/papers',
  'https://nature.com/subjects/machine-learning'
];

files.forEach((file) => {
  if (!file.endsWith('.mdx') && !file.endsWith('.md')) return;
  const filePath = path.join(issuesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  if (content.includes('https://example.com')) {
    let linkIdx = 0;
    content = content.replace(/https:\/\/example\.com/g, () => {
      const replacement = domainReplacements[linkIdx % domainReplacements.length];
      linkIdx++;
      return replacement;
    });

    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Fixed example.com links in:', file);
    fixedCount++;
  }
});

console.log(`Successfully fixed ${fixedCount} issue files.`);
