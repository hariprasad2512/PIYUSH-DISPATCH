const fs = require('fs');
const path = require('path');

const brain = 'C:/Users/offic/.gemini/antigravity-cli/brain/b2f6204c-d20c-43bf-9287-f3dfe7249de0';
const target = path.join(__dirname, '../public/assets/issue-7');

if (!fs.existsSync(target)) {
  fs.mkdirSync(target, { recursive: true });
}

const files = [
  { src: 'agent_concept_diagram_1786298592777.jpg', name: '2.jpg' },
  { src: 'agent_loop_diagram_1786298610407.jpg', name: '3.jpg' },
  { src: 'agent_tools_diagram_1786298629565.jpg', name: '4.jpg' },
  { src: 'agent_anatomy_diagram_1786298647879.jpg', name: '5.jpg' },
  { src: 'research_agent_flow_1786298663507.jpg', name: '6.jpg' },
  { src: 'chatbot_workflow_agent_1786298681597.jpg', name: '7.jpg' },
  { src: 'where_agents_break_1786298711958.jpg', name: '8.jpg' }
];

files.forEach(f => {
  const srcPath = path.join(brain, f.src);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, path.join(target, f.name));
    console.log(`Copied ${f.name} to ${target}`);
  }
});
