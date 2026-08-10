const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const dir = path.join(__dirname, '../content/issues');

fs.readdirSync(dir).forEach(file => {
  if (file.endsWith('.mdx')) {
    const filePath = path.join(dir, file);
    const rawContent = fs.readFileSync(filePath, 'utf8');
    const parsed = matter(rawContent);

    // Set nodeType to daily-node for all 7 issues
    parsed.data.nodeType = 'daily-node';

    // Ensure heroImage uses normalized asset path /assets/daily-node-N/1.jpg or /assets/issue-N/1.jpg
    const issueNum = parsed.data.issueNumber;

    let content = parsed.content;
    // Clean H1 titles in MDX body if they start with "# Issue #N:"
    content = content.replace(/^#\s+Issue\s+#\d+:\s*/i, '# ');

    const updatedRaw = matter.stringify(content, parsed.data);
    fs.writeFileSync(filePath, updatedRaw, 'utf8');
    console.log(`Updated ${file} -> nodeType: daily-node, issueNumber: ${issueNum}`);
  }
});
