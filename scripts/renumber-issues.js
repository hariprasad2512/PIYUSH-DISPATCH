const fs = require('fs'); // eslint-disable-line @typescript-eslint/no-require-imports
const path = require('path'); // eslint-disable-line @typescript-eslint/no-require-imports

const issuesDir = path.join(__dirname, '..', 'content', 'issues');

const mapping = [
  { file: '026-prompt-engineering-isnt-dead-its-evolving.mdx', newNum: 1 },
  { file: '027-rag-isnt-dead-most-people-just-dont-understand-it.mdx', newNum: 2 },
  { file: '028-better-input-better-output-thats-context-engineering.mdx', newNum: 3 },
  { file: '029-the-prompt-is-just-one-ingredient-the-harness-is-the-kitchen.mdx', newNum: 4 },
  { file: '030-loop-engineering-what-makes-ai-agents-improve-themselves.mdx', newNum: 5 },
  { file: '031-graph-engineering-beyond-single-ai-loops.mdx', newNum: 6 }
];

mapping.forEach(item => {
  const filePath = path.join(issuesDir, item.file);
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');

  // Update frontmatter issueNumber
  content = content.replace(/^issueNumber:\s*\d+/m, `issueNumber: ${item.newNum}`);

  // Update body heading if present (e.g. # Issue #6: -> # Issue #1:)
  content = content.replace(/^#\s*Issue\s*#\d+:/m, `# Issue #${item.newNum}:`);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Renumbered ${item.file} -> Issue #${item.newNum}`);
});

console.log('Renumbering complete.');
