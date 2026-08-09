const fs = require('fs');
const path = require('path');

const brain = 'C:/Users/offic/.gemini/antigravity-cli/brain/b2f6204c-d20c-43bf-9287-f3dfe7249de0';

const targetDirs = [
  path.join(__dirname, '../public/assets/daily-node-7'),
  path.join(__dirname, '../public/assets/daily-node#7'),
  path.join(__dirname, '../public/assets/daily-node%237'),
  path.join(__dirname, '../public/assets/issue-7'),
  path.join(__dirname, '../public/assets/issue#7'),
  path.join(__dirname, '../public/assets/issue%237')
];

// Ensure all target directories exist
targetDirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

const jpgMappings = [
  { brainFile: 'issue7_jpg_1_1786300430441.jpg', targetName: '1.jpg' },
  { brainFile: 'issue7_jpg_2_1786300446403.jpg', targetName: '2.jpg' },
  { brainFile: 'issue7_jpg_3_1786300465148.jpg', targetName: '3.jpg' },
  { brainFile: 'issue7_jpg_4_1786300483094.jpg', targetName: '4.jpg' },
  { brainFile: 'agent_anatomy_diagram_1786298647879.jpg', targetName: '5.jpg' },
  { brainFile: 'research_agent_flow_1786298663507.jpg', targetName: '6.jpg' },
  { brainFile: 'chatbot_workflow_agent_1786298681597.jpg', targetName: '7.jpg' },
  { brainFile: 'where_agents_break_1786298711958.jpg', targetName: '8.jpg' }
];

jpgMappings.forEach(item => {
  const srcPath = path.join(brain, item.brainFile);
  if (fs.existsSync(srcPath)) {
    targetDirs.forEach(dir => {
      const destPath = path.join(dir, item.targetName);
      fs.copyFileSync(srcPath, destPath);
    });
    console.log(`Copied ${item.brainFile} -> ${item.targetName} in all asset folders.`);
  } else {
    console.warn(`Warning: Brain file ${item.brainFile} not found.`);
  }
});

// Remove any .svg files in targetDirs to enforce JPG ONLY rule
targetDirs.forEach(dir => {
  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir);
    files.forEach(f => {
      if (f.endsWith('.svg')) {
        fs.unlinkSync(path.join(dir, f));
        console.log(`Removed non-JPG file: ${f} from ${dir}`);
      }
    });
  }
});

console.log('JPG asset deployment complete. Only JPG images remain in issue asset folders.');
