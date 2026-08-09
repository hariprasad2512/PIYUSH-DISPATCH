const fs = require('fs');
const path = require('path');

const dirs = [
  path.join(__dirname, '../public/assets/issue-7'),
  path.join(__dirname, '../public/assets/issue#7'),
  path.join(__dirname, '../public/assets/issue%237'),
  path.join(__dirname, '../public/assets/daily-node-7'),
  path.join(__dirname, '../public/assets/daily-node#7'),
  path.join(__dirname, '../public/assets/daily-node%237')
];

dirs.forEach(d => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

// SVG Templates matching Issue 5 vibe exactly (#0F172A background, indigo/cyan/emerald/amber gradients, rounded cards, dashed loop paths)

const svg1 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="100%" height="100%">
  <defs>
    <linearGradient id="bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0F172A"/>
      <stop offset="100%" stop-color="#1E293B"/>
    </linearGradient>
    <linearGradient id="accent-indigo" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#6366F1"/>
      <stop offset="100%" stop-color="#38BDF8"/>
    </linearGradient>
    <linearGradient id="accent-emerald" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#10B981"/>
      <stop offset="100%" stop-color="#34D399"/>
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="8" stdDeviation="6" flood-color="#000000" flood-opacity="0.4"/>
    </filter>
    <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 8 5 L 0 9 z" fill="#38BDF8"/>
    </marker>
    <marker id="arrow-amber" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 8 5 L 0 9 z" fill="#F59E0B"/>
    </marker>
  </defs>

  <rect width="800" height="450" fill="url(#bg-grad)" rx="16"/>
  <rect x="20" y="20" width="760" height="410" fill="none" stroke="#334155" stroke-width="1" rx="12" stroke-dasharray="4 4"/>

  <!-- Title Badge -->
  <rect x="230" y="32" width="340" height="34" rx="17" fill="#1E293B" stroke="#6366F1" stroke-width="1.5"/>
  <text x="400" y="54" fill="#38BDF8" font-family="Inter, system-ui, sans-serif" font-size="13" font-weight="700" text-anchor="middle" letter-spacing="1">DAILY-NODES#007 · AI AGENTS 101</text>

  <!-- Flow Pipeline -->
  <g transform="translate(45, 145)" filter="url(#shadow)">
    <rect width="115" height="75" rx="12" fill="#1E293B" stroke="#475569" stroke-width="1.5"/>
    <text x="57.5" y="33" fill="#94A3B8" font-family="Inter, system-ui, sans-serif" font-size="10" font-weight="600" text-anchor="middle">INPUT</text>
    <text x="57.5" y="52" fill="#F8FAFC" font-family="Inter, system-ui, sans-serif" font-size="13" font-weight="700" text-anchor="middle">User Goal</text>
  </g>

  <path d="M 160 182 L 195 182" stroke="#38BDF8" stroke-width="2" marker-end="url(#arrow)"/>

  <g transform="translate(200, 145)" filter="url(#shadow)">
    <rect width="125" height="75" rx="12" fill="#1E293B" stroke="#6366F1" stroke-width="2"/>
    <text x="62.5" y="33" fill="#818CF8" font-family="Inter, system-ui, sans-serif" font-size="10" font-weight="600" text-anchor="middle">ENGINE</text>
    <text x="62.5" y="52" fill="#F8FAFC" font-family="Inter, system-ui, sans-serif" font-size="13" font-weight="700" text-anchor="middle">Reasoning (LLM)</text>
  </g>

  <path d="M 325 182 L 360 182" stroke="#38BDF8" stroke-width="2" marker-end="url(#arrow)"/>

  <g transform="translate(365, 145)" filter="url(#shadow)">
    <rect width="125" height="75" rx="12" fill="#1E293B" stroke="#F59E0B" stroke-width="2"/>
    <text x="62.5" y="33" fill="#F59E0B" font-family="Inter, system-ui, sans-serif" font-size="10" font-weight="600" text-anchor="middle">ACTION</text>
    <text x="62.5" y="52" fill="#F8FAFC" font-family="Inter, system-ui, sans-serif" font-size="13" font-weight="700" text-anchor="middle">Tool Execution</text>
  </g>

  <path d="M 490 182 L 525 182" stroke="#38BDF8" stroke-width="2" marker-end="url(#arrow)"/>

  <g transform="translate(530, 145)" filter="url(#shadow)">
    <rect width="115" height="75" rx="12" fill="#1E293B" stroke="#A855F7" stroke-width="2"/>
    <text x="57.5" y="33" fill="#C084FC" font-family="Inter, system-ui, sans-serif" font-size="10" font-weight="600" text-anchor="middle">FEEDBACK</text>
    <text x="57.5" y="52" fill="#F8FAFC" font-family="Inter, system-ui, sans-serif" font-size="13" font-weight="700" text-anchor="middle">Observation</text>
  </g>

  <!-- Repeat Loop -->
  <path d="M 587 220 C 587 305, 262 305, 262 225" fill="none" stroke="#F59E0B" stroke-width="2.5" stroke-dasharray="6 4" marker-end="url(#arrow-amber)"/>
  
  <g transform="translate(365, 275)">
    <rect x="-70" y="-14" width="140" height="28" rx="14" fill="#0F172A" stroke="#F59E0B" stroke-width="1.5"/>
    <text x="0" y="4" fill="#FBBF24" font-family="Inter, system-ui, sans-serif" font-size="11" font-weight="700" text-anchor="middle">🔄 AGENTIC LOOP</text>
  </g>

  <!-- Goal Met Result -->
  <path d="M 645 182 L 675 182" stroke="#34D399" stroke-width="2.5" marker-end="url(#arrow)"/>

  <g transform="translate(680, 140)" filter="url(#shadow)">
    <rect width="80" height="85" rx="12" fill="url(#accent-emerald)"/>
    <text x="40" y="35" fill="#ECFDF5" font-family="Inter, system-ui, sans-serif" font-size="10" font-weight="700" text-anchor="middle">COMPLETE</text>
    <text x="40" y="55" fill="#FFFFFF" font-family="Inter, system-ui, sans-serif" font-size="12" font-weight="800" text-anchor="middle">Goal Met</text>
  </g>

  <text x="400" y="390" fill="#94A3B8" font-family="Inter, system-ui, sans-serif" font-size="13" font-weight="500" text-anchor="middle">An AI Agent reasons about goals, executes tools, observes feedback, and iterates until finished.</text>
</svg>`;

const svg2 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="100%" height="100%">
  <defs>
    <linearGradient id="bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0F172A"/>
      <stop offset="100%" stop-color="#1E293B"/>
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="6" stdDeviation="5" flood-color="#000000" flood-opacity="0.4"/>
    </filter>
  </defs>

  <rect width="800" height="450" fill="url(#bg-grad)" rx="16"/>
  <rect x="20" y="20" width="760" height="410" fill="none" stroke="#334155" stroke-width="1" rx="12" stroke-dasharray="4 4"/>

  <!-- Section Badge -->
  <rect x="250" y="32" width="300" height="32" rx="16" fill="#1E293B" stroke="#38BDF8" stroke-width="1.5"/>
  <text x="400" y="53" fill="#38BDF8" font-family="Inter, system-ui, sans-serif" font-size="12" font-weight="700" text-anchor="middle" letter-spacing="1">01 — WHAT IS AN AI AGENT?</text>

  <!-- 5 Nodes Circle/Loop -->
  <!-- 1. GOAL -->
  <g transform="translate(110, 140)" filter="url(#shadow)">
    <rect width="110" height="65" rx="10" fill="#1E293B" stroke="#6366F1" stroke-width="2"/>
    <text x="55" y="28" fill="#818CF8" font-family="Inter, system-ui, sans-serif" font-size="10" font-weight="600" text-anchor="middle">STEP 1</text>
    <text x="55" y="47" fill="#FFFFFF" font-family="Inter, system-ui, sans-serif" font-size="14" font-weight="700" text-anchor="middle">GOAL</text>
  </g>

  <!-- 2. REASON -->
  <g transform="translate(260, 140)" filter="url(#shadow)">
    <rect width="110" height="65" rx="10" fill="#1E293B" stroke="#38BDF8" stroke-width="2"/>
    <text x="55" y="28" fill="#38BDF8" font-family="Inter, system-ui, sans-serif" font-size="10" font-weight="600" text-anchor="middle">STEP 2</text>
    <text x="55" y="47" fill="#FFFFFF" font-family="Inter, system-ui, sans-serif" font-size="14" font-weight="700" text-anchor="middle">REASON</text>
  </g>

  <!-- 3. ACT -->
  <g transform="translate(410, 140)" filter="url(#shadow)">
    <rect width="110" height="65" rx="10" fill="#1E293B" stroke="#F59E0B" stroke-width="2"/>
    <text x="55" y="28" fill="#F59E0B" font-family="Inter, system-ui, sans-serif" font-size="10" font-weight="600" text-anchor="middle">STEP 3</text>
    <text x="55" y="47" fill="#FFFFFF" font-family="Inter, system-ui, sans-serif" font-size="14" font-weight="700" text-anchor="middle">ACT</text>
  </g>

  <!-- 4. OBSERVE -->
  <g transform="translate(560, 140)" filter="url(#shadow)">
    <rect width="110" height="65" rx="10" fill="#1E293B" stroke="#A855F7" stroke-width="2"/>
    <text x="55" y="28" fill="#C084FC" font-family="Inter, system-ui, sans-serif" font-size="10" font-weight="600" text-anchor="middle">STEP 4</text>
    <text x="55" y="47" fill="#FFFFFF" font-family="Inter, system-ui, sans-serif" font-size="14" font-weight="700" text-anchor="middle">OBSERVE</text>
  </g>

  <!-- Arrows -->
  <path d="M 220 172 L 255 172" stroke="#64748B" stroke-width="2"/>
  <path d="M 370 172 L 405 172" stroke="#64748B" stroke-width="2"/>
  <path d="M 520 172 L 555 172" stroke="#64748B" stroke-width="2"/>

  <!-- Loop back arrow -->
  <path d="M 615 210 C 615 290, 315 290, 315 210" fill="none" stroke="#10B981" stroke-width="2.5" stroke-dasharray="5 5"/>

  <g transform="translate(415, 275)">
    <rect x="-80" y="-14" width="160" height="28" rx="14" fill="#0F172A" stroke="#10B981" stroke-width="1.5"/>
    <text x="0" y="4" fill="#34D399" font-family="Inter, system-ui, sans-serif" font-size="11" font-weight="700" text-anchor="middle">🔄 REPEAT UNTIL DONE</text>
  </g>

  <text x="400" y="380" fill="#94A3B8" font-family="Inter, system-ui, sans-serif" font-size="13" font-weight="500" text-anchor="middle">Chatbot = Prompt → Answer.  Agent = Goal → Reason → Act → Observe → Repeat.</text>
</svg>`;

const svg3 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="100%" height="100%">
  <defs>
    <linearGradient id="bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0F172A"/>
      <stop offset="100%" stop-color="#1E293B"/>
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="6" stdDeviation="5" flood-color="#000000" flood-opacity="0.4"/>
    </filter>
  </defs>

  <rect width="800" height="450" fill="url(#bg-grad)" rx="16"/>
  <rect x="20" y="20" width="760" height="410" fill="none" stroke="#334155" stroke-width="1" rx="12" stroke-dasharray="4 4"/>

  <!-- Badge -->
  <rect x="260" y="32" width="280" height="32" rx="16" fill="#1E293B" stroke="#F59E0B" stroke-width="1.5"/>
  <text x="400" y="53" fill="#F59E0B" font-family="Inter, system-ui, sans-serif" font-size="12" font-weight="700" text-anchor="middle" letter-spacing="1">02 — THE AGENTIC REASONING LOOP</text>

  <!-- Flowchart Diagram -->
  <g transform="translate(100, 130)" filter="url(#shadow)">
    <rect width="130" height="60" rx="10" fill="#1E293B" stroke="#6366F1" stroke-width="2"/>
    <text x="65" y="35" fill="#FFFFFF" font-family="Inter, system-ui, sans-serif" font-size="13" font-weight="700" text-anchor="middle">1. Search Web</text>
  </g>

  <path d="M 230 160 L 265 160" stroke="#38BDF8" stroke-width="2"/>

  <g transform="translate(270, 130)" filter="url(#shadow)">
    <rect width="130" height="60" rx="10" fill="#1E293B" stroke="#38BDF8" stroke-width="2"/>
    <text x="65" y="35" fill="#FFFFFF" font-family="Inter, system-ui, sans-serif" font-size="13" font-weight="700" text-anchor="middle">2. Read Sources</text>
  </g>

  <path d="M 400 160 L 435 160" stroke="#38BDF8" stroke-width="2"/>

  <g transform="translate(440, 130)" filter="url(#shadow)">
    <polygon points="65,0 130,30 65,60 0,30" fill="#1E293B" stroke="#F59E0B" stroke-width="2"/>
    <text x="65" y="34" fill="#FBBF24" font-family="Inter, system-ui, sans-serif" font-size="11" font-weight="700" text-anchor="middle">Info Complete?</text>
  </g>

  <!-- Branch No -> Loop back -->
  <path d="M 505 130 L 505 90 L 165 90 L 165 125" fill="none" stroke="#EF4444" stroke-width="2" stroke-dasharray="4 4"/>
  <rect x="310" y="78" width="80" height="22" rx="11" fill="#0F172A" stroke="#EF4444" stroke-width="1"/>
  <text x="350" y="93" fill="#FCA5A5" font-family="Inter, system-ui, sans-serif" font-size="10" font-weight="700" text-anchor="middle">No: Search Again</text>

  <!-- Branch Yes -> Finish -->
  <path d="M 570 160 L 605 160" stroke="#10B981" stroke-width="2.5"/>
  <g transform="translate(610, 130)" filter="url(#shadow)">
    <rect width="120" height="60" rx="10" fill="#10B981"/>
    <text x="60" y="35" fill="#FFFFFF" font-family="Inter, system-ui, sans-serif" font-size="13" font-weight="800" text-anchor="middle">Write Summary</text>
  </g>

  <text x="400" y="375" fill="#94A3B8" font-family="Inter, system-ui, sans-serif" font-size="13" font-weight="500" text-anchor="middle">The agent continuously assesses missing information before delivering the final answer.</text>
</svg>`;

const svg4 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="100%" height="100%">
  <defs>
    <linearGradient id="bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0F172A"/>
      <stop offset="100%" stop-color="#1E293B"/>
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="6" stdDeviation="5" flood-color="#000000" flood-opacity="0.4"/>
    </filter>
  </defs>

  <rect width="800" height="450" fill="url(#bg-grad)" rx="16"/>
  <rect x="20" y="20" width="760" height="410" fill="none" stroke="#334155" stroke-width="1" rx="12" stroke-dasharray="4 4"/>

  <!-- Badge -->
  <rect x="250" y="32" width="300" height="32" rx="16" fill="#1E293B" stroke="#6366F1" stroke-width="1.5"/>
  <text x="400" y="53" fill="#818CF8" font-family="Inter, system-ui, sans-serif" font-size="12" font-weight="700" text-anchor="middle" letter-spacing="1">03 — TOOL CALLING &amp; EXECUTION ENGINE</text>

  <!-- Core LLM Hub -->
  <g transform="translate(320, 175)" filter="url(#shadow)">
    <circle cx="80" cy="40" r="45" fill="#6366F1" stroke="#A855F7" stroke-width="3"/>
    <text x="80" y="44" fill="#FFFFFF" font-family="Inter, system-ui, sans-serif" font-size="14" font-weight="800" text-anchor="middle">LLM BRAIN</text>
  </g>

  <!-- Satellite Tools -->
  <g transform="translate(80, 110)">
    <rect width="130" height="45" rx="8" fill="#1E293B" stroke="#38BDF8" stroke-width="1.5"/>
    <text x="65" y="27" fill="#38BDF8" font-family="Inter, system-ui, sans-serif" font-size="11" font-weight="700" text-anchor="middle">🔎 Web Search</text>
  </g>
  <path d="M 210 1325 L 340 190" stroke="#38BDF8" stroke-width="1.5" stroke-dasharray="3 3"/>

  <g transform="translate(80, 270)">
    <rect width="130" height="45" rx="8" fill="#1E293B" stroke="#10B981" stroke-width="1.5"/>
    <text x="65" y="27" fill="#34D399" font-family="Inter, system-ui, sans-serif" font-size="11" font-weight="700" text-anchor="middle">🗄️ Database Query</text>
  </g>

  <g transform="translate(590, 110)">
    <rect width="130" height="45" rx="8" fill="#1E293B" stroke="#F59E0B" stroke-width="1.5"/>
    <text x="65" y="27" fill="#F59E0B" font-family="Inter, system-ui, sans-serif" font-size="11" font-weight="700" text-anchor="middle">💻 Code Execution</text>
  </g>

  <g transform="translate(590, 270)">
    <rect width="130" height="45" rx="8" fill="#1E293B" stroke="#EC4899" stroke-width="1.5"/>
    <text x="65" y="27" fill="#F472B6" font-family="Inter, system-ui, sans-serif" font-size="11" font-weight="700" text-anchor="middle">📧 API / Email</text>
  </g>

  <text x="400" y="380" fill="#94A3B8" font-family="Inter, system-ui, sans-serif" font-size="13" font-weight="500" text-anchor="middle">Function calling enables the model to issue structured commands to external services.</text>
</svg>`;

const svg5 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="100%" height="100%">
  <defs>
    <linearGradient id="bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0F172A"/>
      <stop offset="100%" stop-color="#1E293B"/>
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="6" stdDeviation="5" flood-color="#000000" flood-opacity="0.4"/>
    </filter>
  </defs>

  <rect width="800" height="450" fill="url(#bg-grad)" rx="16"/>
  <rect x="20" y="20" width="760" height="410" fill="none" stroke="#334155" stroke-width="1" rx="12" stroke-dasharray="4 4"/>

  <!-- Badge -->
  <rect x="270" y="32" width="260" height="32" rx="16" fill="#1E293B" stroke="#38BDF8" stroke-width="1.5"/>
  <text x="400" y="53" fill="#38BDF8" font-family="Inter, system-ui, sans-serif" font-size="12" font-weight="700" text-anchor="middle" letter-spacing="1">04 — ANATOMY OF AN AI AGENT</text>

  <!-- 4 Pillars Grid -->
  <g transform="translate(80, 110)" filter="url(#shadow)">
    <rect width="140" height="180" rx="12" fill="#1E293B" stroke="#6366F1" stroke-width="2"/>
    <text x="70" y="35" fill="#818CF8" font-family="Inter, system-ui, sans-serif" font-size="11" font-weight="700" text-anchor="middle">🧠 BRAIN</text>
    <text x="70" y="65" fill="#FFFFFF" font-family="Inter, system-ui, sans-serif" font-size="13" font-weight="700" text-anchor="middle">LLM Engine</text>
    <text x="70" y="95" fill="#94A3B8" font-family="Inter, system-ui, sans-serif" font-size="10" font-weight="500" text-anchor="middle">Reasoning &amp; Planning</text>
  </g>

  <g transform="translate(245, 110)" filter="url(#shadow)">
    <rect width="140" height="180" rx="12" fill="#1E293B" stroke="#38BDF8" stroke-width="2"/>
    <text x="70" y="35" fill="#38BDF8" font-family="Inter, system-ui, sans-serif" font-size="11" font-weight="700" text-anchor="middle">💾 MEMORY</text>
    <text x="70" y="65" fill="#FFFFFF" font-family="Inter, system-ui, sans-serif" font-size="13" font-weight="700" text-anchor="middle">Short &amp; Long Term</text>
    <text x="70" y="95" fill="#94A3B8" font-family="Inter, system-ui, sans-serif" font-size="10" font-weight="500" text-anchor="middle">Context &amp; Vector Stores</text>
  </g>

  <g transform="translate(410, 110)" filter="url(#shadow)">
    <rect width="140" height="180" rx="12" fill="#1E293B" stroke="#F59E0B" stroke-width="2"/>
    <text x="70" y="35" fill="#F59E0B" font-family="Inter, system-ui, sans-serif" font-size="11" font-weight="700" text-anchor="middle">🛠️ TOOLS</text>
    <text x="70" y="65" fill="#FFFFFF" font-family="Inter, system-ui, sans-serif" font-size="13" font-weight="700" text-anchor="middle">Integrations</text>
    <text x="70" y="95" fill="#94A3B8" font-family="Inter, system-ui, sans-serif" font-size="10" font-weight="500" text-anchor="middle">APIs &amp; Code Executors</text>
  </g>

  <g transform="translate(575, 110)" filter="url(#shadow)">
    <rect width="140" height="180" rx="12" fill="#1E293B" stroke="#10B981" stroke-width="2"/>
    <text x="70" y="35" fill="#34D399" font-family="Inter, system-ui, sans-serif" font-size="11" font-weight="700" text-anchor="middle">🔄 LOOP</text>
    <text x="70" y="65" fill="#FFFFFF" font-family="Inter, system-ui, sans-serif" font-size="13" font-weight="700" text-anchor="middle">Control Flow</text>
    <text x="70" y="95" fill="#94A3B8" font-family="Inter, system-ui, sans-serif" font-size="10" font-weight="500" text-anchor="middle">Reason → Act → Observe</text>
  </g>

  <text x="400" y="380" fill="#94A3B8" font-family="Inter, system-ui, sans-serif" font-size="13" font-weight="500" text-anchor="middle">An agent is the complete system surrounding the LLM brain.</text>
</svg>`;

const svg6 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="100%" height="100%">
  <defs>
    <linearGradient id="bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0F172A"/>
      <stop offset="100%" stop-color="#1E293B"/>
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="6" stdDeviation="5" flood-color="#000000" flood-opacity="0.4"/>
    </filter>
  </defs>

  <rect width="800" height="450" fill="url(#bg-grad)" rx="16"/>
  <rect x="20" y="20" width="760" height="410" fill="none" stroke="#334155" stroke-width="1" rx="12" stroke-dasharray="4 4"/>

  <!-- Badge -->
  <rect x="240" y="32" width="320" height="32" rx="16" fill="#1E293B" stroke="#A855F7" stroke-width="1.5"/>
  <text x="400" y="53" fill="#C084FC" font-family="Inter, system-ui, sans-serif" font-size="12" font-weight="700" text-anchor="middle" letter-spacing="1">05 — RESEARCH AGENT WORKFLOW</text>

  <!-- Flowchart Steps -->
  <g transform="translate(60, 150)" filter="url(#shadow)">
    <rect width="110" height="60" rx="8" fill="#1E293B" stroke="#6366F1" stroke-width="1.5"/>
    <text x="55" y="35" fill="#FFFFFF" font-family="Inter, system-ui, sans-serif" font-size="12" font-weight="700" text-anchor="middle">Goal</text>
  </g>

  <path d="M 170 180 L 205 180" stroke="#64748B" stroke-width="2"/>

  <g transform="translate(210, 150)" filter="url(#shadow)">
    <rect width="110" height="60" rx="8" fill="#1E293B" stroke="#38BDF8" stroke-width="1.5"/>
    <text x="55" y="35" fill="#FFFFFF" font-family="Inter, system-ui, sans-serif" font-size="12" font-weight="700" text-anchor="middle">Search</text>
  </g>

  <path d="M 320 180 L 355 180" stroke="#64748B" stroke-width="2"/>

  <g transform="translate(360, 150)" filter="url(#shadow)">
    <rect width="110" height="60" rx="8" fill="#1E293B" stroke="#F59E0B" stroke-width="1.5"/>
    <text x="55" y="35" fill="#FFFFFF" font-family="Inter, system-ui, sans-serif" font-size="12" font-weight="700" text-anchor="middle">Observe</text>
  </g>

  <path d="M 470 180 L 505 180" stroke="#64748B" stroke-width="2"/>

  <g transform="translate(510, 150)" filter="url(#shadow)">
    <rect width="110" height="60" rx="8" fill="#1E293B" stroke="#A855F7" stroke-width="1.5"/>
    <text x="55" y="35" fill="#FFFFFF" font-family="Inter, system-ui, sans-serif" font-size="12" font-weight="700" text-anchor="middle">Synthesize</text>
  </g>

  <path d="M 620 180 L 655 180" stroke="#10B981" stroke-width="2"/>

  <g transform="translate(660, 150)" filter="url(#shadow)">
    <rect width="80" height="60" rx="8" fill="#10B981"/>
    <text x="40" y="35" fill="#FFFFFF" font-family="Inter, system-ui, sans-serif" font-size="12" font-weight="800" text-anchor="middle">Report</text>
  </g>

  <text x="400" y="375" fill="#94A3B8" font-family="Inter, system-ui, sans-serif" font-size="13" font-weight="500" text-anchor="middle">Branching decision paths handle gaps in real-time information gathering.</text>
</svg>`;

const svg7 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="100%" height="100%">
  <defs>
    <linearGradient id="bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0F172A"/>
      <stop offset="100%" stop-color="#1E293B"/>
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="6" stdDeviation="5" flood-color="#000000" flood-opacity="0.4"/>
    </filter>
  </defs>

  <rect width="800" height="450" fill="url(#bg-grad)" rx="16"/>
  <rect x="20" y="20" width="760" height="410" fill="none" stroke="#334155" stroke-width="1" rx="12" stroke-dasharray="4 4"/>

  <!-- Badge -->
  <rect x="240" y="32" width="320" height="32" rx="16" fill="#1E293B" stroke="#38BDF8" stroke-width="1.5"/>
  <text x="400" y="53" fill="#38BDF8" font-family="Inter, system-ui, sans-serif" font-size="12" font-weight="700" text-anchor="middle" letter-spacing="1">06 — CHATBOT vs WORKFLOW vs AGENT</text>

  <!-- 3 Comparison Columns -->
  <g transform="translate(70, 110)" filter="url(#shadow)">
    <rect width="200" height="190" rx="12" fill="#1E293B" stroke="#475569" stroke-width="1.5"/>
    <text x="100" y="35" fill="#94A3B8" font-family="Inter, system-ui, sans-serif" font-size="12" font-weight="700" text-anchor="middle">CHATBOT</text>
    <text x="100" y="65" fill="#FFFFFF" font-family="Inter, system-ui, sans-serif" font-size="13" font-weight="700" text-anchor="middle">Single Turn Response</text>
    <text x="100" y="105" fill="#94A3B8" font-family="Inter, system-ui, sans-serif" font-size="11" font-weight="500" text-anchor="middle">• Responds to user</text>
    <text x="100" y="128" fill="#94A3B8" font-family="Inter, system-ui, sans-serif" font-size="11" font-weight="500" text-anchor="middle">• Static input -> output</text>
  </g>

  <g transform="translate(300, 110)" filter="url(#shadow)">
    <rect width="200" height="190" rx="12" fill="#1E293B" stroke="#F59E0B" stroke-width="1.5"/>
    <text x="100" y="35" fill="#F59E0B" font-family="Inter, system-ui, sans-serif" font-size="12" font-weight="700" text-anchor="middle">WORKFLOW</text>
    <text x="100" y="65" fill="#FFFFFF" font-family="Inter, system-ui, sans-serif" font-size="13" font-weight="700" text-anchor="middle">Deterministic Steps</text>
    <text x="100" y="105" fill="#94A3B8" font-family="Inter, system-ui, sans-serif" font-size="11" font-weight="500" text-anchor="middle">• Pre-planned paths</text>
    <text x="100" y="128" fill="#94A3B8" font-family="Inter, system-ui, sans-serif" font-size="11" font-weight="500" text-anchor="middle">• High predictability</text>
  </g>

  <g transform="translate(530, 110)" filter="url(#shadow)">
    <rect width="200" height="190" rx="12" fill="#1E293B" stroke="#10B981" stroke-width="2"/>
    <text x="100" y="35" fill="#34D399" font-family="Inter, system-ui, sans-serif" font-size="12" font-weight="700" text-anchor="middle">AI AGENT</text>
    <text x="100" y="65" fill="#FFFFFF" font-family="Inter, system-ui, sans-serif" font-size="13" font-weight="700" text-anchor="middle">Dynamic Decision Loop</text>
    <text x="100" y="105" fill="#94A3B8" font-family="Inter, system-ui, sans-serif" font-size="11" font-weight="500" text-anchor="middle">• Chooses next action</text>
    <text x="100" y="128" fill="#94A3B8" font-family="Inter, system-ui, sans-serif" font-size="11" font-weight="500" text-anchor="middle">• Adapts to environment</text>
  </g>

  <text x="400" y="375" fill="#94A3B8" font-family="Inter, system-ui, sans-serif" font-size="13" font-weight="500" text-anchor="middle">A workflow follows the path you designed. An agent decides which path to take.</text>
</svg>`;

const svg8 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="100%" height="100%">
  <defs>
    <linearGradient id="bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0F172A"/>
      <stop offset="100%" stop-color="#1E293B"/>
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="6" stdDeviation="5" flood-color="#000000" flood-opacity="0.4"/>
    </filter>
  </defs>

  <rect width="800" height="450" fill="url(#bg-grad)" rx="16"/>
  <rect x="20" y="20" width="760" height="410" fill="none" stroke="#334155" stroke-width="1" rx="12" stroke-dasharray="4 4"/>

  <!-- Badge -->
  <rect x="220" y="32" width="360" height="32" rx="16" fill="#1E293B" stroke="#EF4444" stroke-width="1.5"/>
  <text x="400" y="53" fill="#FCA5A5" font-family="Inter, system-ui, sans-serif" font-size="12" font-weight="700" text-anchor="middle" letter-spacing="1">07 — WHERE AGENTS BREAK &amp; GUARDRAILS</text>

  <!-- 4 Risk & Defense Cards -->
  <g transform="translate(90, 110)" filter="url(#shadow)">
    <rect width="140" height="180" rx="12" fill="#1E293B" stroke="#EF4444" stroke-width="1.5"/>
    <text x="70" y="35" fill="#FCA5A5" font-family="Inter, system-ui, sans-serif" font-size="11" font-weight="700" text-anchor="middle">FAIL 1</text>
    <text x="70" y="65" fill="#FFFFFF" font-family="Inter, system-ui, sans-serif" font-size="13" font-weight="700" text-anchor="middle">Hallucinations</text>
    <text x="70" y="95" fill="#94A3B8" font-family="Inter, system-ui, sans-serif" font-size="10" font-weight="500" text-anchor="middle">False tool arguments</text>
  </g>

  <g transform="translate(250, 110)" filter="url(#shadow)">
    <rect width="140" height="180" rx="12" fill="#1E293B" stroke="#F59E0B" stroke-width="1.5"/>
    <text x="70" y="35" fill="#FBBF24" font-family="Inter, system-ui, sans-serif" font-size="11" font-weight="700" text-anchor="middle">FAIL 2</text>
    <text x="70" y="65" fill="#FFFFFF" font-family="Inter, system-ui, sans-serif" font-size="13" font-weight="700" text-anchor="middle">Infinite Loops</text>
    <text x="70" y="95" fill="#94A3B8" font-family="Inter, system-ui, sans-serif" font-size="10" font-weight="500" text-anchor="middle">Resource exhaustion</text>
  </g>

  <g transform="translate(410, 110)" filter="url(#shadow)">
    <rect width="140" height="180" rx="12" fill="#1E293B" stroke="#38BDF8" stroke-width="1.5"/>
    <text x="70" y="35" fill="#38BDF8" font-family="Inter, system-ui, sans-serif" font-size="11" font-weight="700" text-anchor="middle">DEFENSE 1</text>
    <text x="70" y="65" fill="#FFFFFF" font-family="Inter, system-ui, sans-serif" font-size="13" font-weight="700" text-anchor="middle">Max Loop Limit</text>
    <text x="70" y="95" fill="#94A3B8" font-family="Inter, system-ui, sans-serif" font-size="10" font-weight="500" text-anchor="middle">Cap recursion depth</text>
  </g>

  <g transform="translate(570, 110)" filter="url(#shadow)">
    <rect width="140" height="180" rx="12" fill="#1E293B" stroke="#10B981" stroke-width="2"/>
    <text x="70" y="35" fill="#34D399" font-family="Inter, system-ui, sans-serif" font-size="11" font-weight="700" text-anchor="middle">DEFENSE 2</text>
    <text x="70" y="65" fill="#FFFFFF" font-family="Inter, system-ui, sans-serif" font-size="13" font-weight="700" text-anchor="middle">Human Approval</text>
    <text x="70" y="95" fill="#94A3B8" font-family="Inter, system-ui, sans-serif" font-size="10" font-weight="500" text-anchor="middle">Human-in-the-loop</text>
  </g>

  <text x="400" y="375" fill="#94A3B8" font-family="Inter, system-ui, sans-serif" font-size="13" font-weight="500" text-anchor="middle">More autonomy does not automatically mean more intelligence. Guardrails are mandatory.</text>
</svg>`;

const svgs = [
  { name: '1.svg', content: svg1 },
  { name: '2.svg', content: svg2 },
  { name: '3.svg', content: svg3 },
  { name: '4.svg', content: svg4 },
  { name: '5.svg', content: svg5 },
  { name: '6.svg', content: svg6 },
  { name: '7.svg', content: svg7 },
  { name: '8.svg', content: svg8 }
];

svgs.forEach(item => {
  dirs.forEach(d => {
    // Write .svg file
    fs.writeFileSync(path.join(d, item.name), item.content, 'utf8');
    // Also write .jpg fallback reference name if requested
    const jpgName = item.name.replace('.svg', '.jpg');
    fs.writeFileSync(path.join(d, jpgName), item.content, 'utf8');
  });
  console.log(`Generated ${item.name} matching Issue #5 vibe across all target asset directories.`);
});

console.log('All SVGs generated successfully.');
