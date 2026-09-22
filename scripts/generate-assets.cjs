const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ART_DIR = path.join(__dirname, '..', 'public', 'art');

// Helper to wrap SVG in standard 1200x750 FyreLinkz editorial template
function createSvg({
  bgGradient,
  gridColor = 'rgba(255,255,255,0.06)',
  eyebrowText,
  footerText = 'FYRELINKZ / EDITORIAL ILLUSTRATION · CONCEPTUAL ARTWORK',
  accentColor = '#ff8056',
  defs = '',
  artContent = ''
}) {
  const safeEyebrow = eyebrowText.replace(/&(?!(amp|lt|gt|quot|apos);)/g, '&amp;');
  const safeFooter = footerText.replace(/&(?!(amp|lt|gt|quot|apos);)/g, '&amp;');
  const safeContent = artContent.replace(/&(?!(amp|lt|gt|quot|apos);)/g, '&amp;');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="750" viewBox="0 0 1200 750">
<defs>
  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
    <path d="M40 0H0V40" fill="none" stroke="${gridColor}" stroke-width="1"/>
  </pattern>
  <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
    <feDropShadow dx="0" dy="24" stdDeviation="28" flood-color="#000" flood-opacity="0.5"/>
  </filter>
  <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
    <feGaussianBlur stdDeviation="12" result="blur"/>
    <feComposite in="SourceGraphic" in2="blur" operator="over"/>
  </filter>
  ${defs}
</defs>
<rect width="1200" height="750" fill="${bgGradient}"/>
<rect width="1200" height="750" fill="url(#grid)"/>
<circle cx="1050" cy="100" r="320" fill="${accentColor}" opacity="0.08" filter="url(#softGlow)"/>
<circle cx="150" cy="650" r="280" fill="${accentColor}" opacity="0.05" filter="url(#softGlow)"/>
<text x="50" y="65" font-family="monospace, 'Courier New', monospace" font-size="14" fill="${accentColor}" letter-spacing="3" font-weight="600">${safeEyebrow}</text>
${safeContent}
<text x="50" y="715" font-family="monospace, 'Courier New', monospace" font-size="12" fill="#718096" opacity="0.75" letter-spacing="2">${safeFooter}</text>
</svg>`;
}

const ASSETS = {
  // 1. Runway Adobe Timeline
  'runway-timeline': {
    eyebrowText: 'TIMELINE / RUNWAY ADOBE NLE EXTENSION',
    accentColor: '#f8754e',
    bgGradient: '#12161f',
    defs: `
      <linearGradient id="trackGrad1" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#f8754e"/><stop offset="100%" stop-color="#ff9c7b"/></linearGradient>
      <linearGradient id="trackGrad2" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#2d3748"/><stop offset="100%" stop-color="#4a5568"/></linearGradient>
      <linearGradient id="nleScreen" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#1e2430"/><stop offset="100%" stop-color="#0f131a"/></linearGradient>
    `,
    artContent: `
      <g transform="translate(100, 105)" filter="url(#shadow)">
        <rect width="1000" height="550" rx="14" fill="#171c26" stroke="#2c3547" stroke-width="2"/>
        <rect x="0" y="0" width="1000" height="42" rx="14" fill="#202736"/>
        <rect x="0" y="30" width="1000" height="12" fill="#202736"/>
        <circle cx="30" cy="21" r="5" fill="#f8754e"/>
        <circle cx="48" cy="21" r="5" fill="#ecc94b"/>
        <circle cx="66" cy="21" r="5" fill="#48bb78"/>
        <text x="100" y="26" font-family="monospace" font-size="12" fill="#a0aec0">PREMIERE PRO / AFTER EFFECTS · RUNWAY GEN-3 PANEL</text>
        
        <!-- Preview Monitor -->
        <rect x="30" y="65" width="580" height="310" rx="8" fill="url(#nleScreen)" stroke="#2c3547"/>
        <rect x="50" y="85" width="540" height="270" rx="4" fill="#0d1117"/>
        <!-- Cinematic frame in preview -->
        <circle cx="320" cy="220" r="70" fill="#f8754e" opacity="0.8"/>
        <path d="M120 320 Q240 180 360 260 T560 210 L560 340 L120 340 Z" fill="#232b3b"/>
        <path d="M180 340 Q300 220 440 280 T580 250 L580 340 L180 340 Z" fill="#171c26"/>
        <rect x="70" y="105" width="120" height="24" rx="4" fill="#f8754e" opacity="0.9"/>
        <text x="82" y="121" font-family="monospace" font-size="10" fill="#111" font-weight="bold">AI GENERATED · 4K</text>
        
        <!-- Extension Tool Panel -->
        <rect x="630" y="65" width="340" height="310" rx="8" fill="#1c2330" stroke="#2c3547"/>
        <text x="650" y="98" font-family="monospace" font-size="13" fill="#ff9c7b" font-weight="bold">RUNWAY CONTROLS</text>
        <rect x="650" y="115" width="300" height="36" rx="6" fill="#131822" stroke="#2c3547"/>
        <text x="665" y="138" font-family="monospace" font-size="11" fill="#718096">Prompt: Cinematic tracking shot...</text>
        <rect x="650" y="165" width="140" height="32" rx="6" fill="#2a3447"/>
        <text x="675" y="186" font-family="monospace" font-size="11" fill="#cbd5e0">Gen-3 Alpha</text>
        <rect x="805" y="165" width="145" height="32" rx="6" fill="#2a3447"/>
        <text x="835" y="186" font-family="monospace" font-size="11" fill="#cbd5e0">Duration: 10s</text>
        <rect x="650" y="215" width="300" height="42" rx="6" fill="url(#trackGrad1)"/>
        <text x="735" y="241" font-family="monospace" font-size="12" fill="#111" font-weight="bold">INSERT INTO EDIT ↗</text>
        <text x="650" y="285" font-family="monospace" font-size="10" fill="#718096">CREDITS: 50 SECONDS REMAINING</text>
        <rect x="650" y="300" width="300" height="6" rx="3" fill="#2d3748"/>
        <rect x="650" y="300" width="180" height="6" rx="3" fill="#f8754e"/>

        <!-- Timeline Tracks -->
        <g transform="translate(30, 395)">
          <rect width="940" height="135" rx="8" fill="#131822" stroke="#2c3547"/>
          <!-- Time ruler -->
          <line x1="100" y1="20" x2="920" y2="20" stroke="#4a5568" stroke-width="1"/>
          <text x="100" y="14" font-family="monospace" font-size="9" fill="#718096">00:00:00</text>
          <text x="350" y="14" font-family="monospace" font-size="9" fill="#718096">00:00:05</text>
          <text x="600" y="14" font-family="monospace" font-size="9" fill="#718096">00:00:10</text>
          <text x="850" y="14" font-family="monospace" font-size="9" fill="#718096">00:00:15</text>
          
          <!-- Track V2 (AI Generated) -->
          <text x="20" y="48" font-family="monospace" font-size="10" fill="#ff9c7b" font-weight="bold">V2 (AI)</text>
          <rect x="100" y="32" width="280" height="24" rx="4" fill="url(#trackGrad1)"/>
          <text x="115" y="48" font-family="monospace" font-size="10" fill="#111" font-weight="bold">Runway_Gen3_Take04.mp4</text>
          
          <!-- Track V1 (Original Footage) -->
          <text x="20" y="80" font-family="monospace" font-size="10" fill="#a0aec0">V1</text>
          <rect x="100" y="64" width="450" height="24" rx="4" fill="url(#trackGrad2)"/>
          <text x="115" y="80" font-family="monospace" font-size="10" fill="#e2e8f0">Primary_Cut_A_Roll.mov</text>
          
          <!-- Track A1 (Audio) -->
          <text x="20" y="112" font-family="monospace" font-size="10" fill="#48bb78">A1</text>
          <rect x="100" y="96" width="700" height="24" rx="4" fill="#22543d" stroke="#38a169"/>
          <text x="115" y="112" font-family="monospace" font-size="10" fill="#9ae6b4">Soundtrack_Dialogue_Master.wav</text>
          
          <!-- Playhead -->
          <line x1="320" y1="10" x2="320" y2="130" stroke="#ff8056" stroke-width="2"/>
          <polygon points="314,10 326,10 320,18" fill="#ff8056"/>
        </g>
      </g>
    `
  },

  // 2. ComfyUI 3D Generation
  'comfyui-3d-graph': {
    eyebrowText: 'COMFYUI / NATIVE TRELLIS.2 & PIXAL3D MESH',
    accentColor: '#48bb78',
    bgGradient: '#101713',
    defs: `
      <linearGradient id="meshGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#48bb78"/><stop offset="100%" stop-color="#2d3748"/></linearGradient>
    `,
    artContent: `
      <g transform="translate(100, 100)" filter="url(#shadow)">
        <!-- Canvas board -->
        <rect width="1000" height="550" rx="14" fill="#131c17" stroke="#253a2c" stroke-width="2"/>
        
        <!-- Node 1: Input Image -->
        <g transform="translate(40, 80)">
          <rect width="220" height="220" rx="8" fill="#18261e" stroke="#2d4a37"/>
          <rect width="220" height="30" rx="8" fill="#223b2c"/>
          <text x="15" y="20" font-family="monospace" font-size="11" fill="#9ae6b4" font-weight="bold">Load Image (Source)</text>
          <rect x="15" y="45" width="190" height="155" rx="4" fill="#0d1410"/>
          <circle cx="110" cy="115" r="45" fill="#48bb78" opacity="0.3"/>
          <polygon points="110,80 150,140 70,140" fill="#48bb78" opacity="0.8"/>
          <circle cx="215" cy="120" r="5" fill="#48bb78"/>
        </g>

        <!-- Node 2: Trellis.2 Core Node -->
        <g transform="translate(320, 50)">
          <rect width="260" height="280" rx="8" fill="#18261e" stroke="#38a169" stroke-width="2"/>
          <rect width="260" height="32" rx="8" fill="#2b5039"/>
          <text x="15" y="21" font-family="monospace" font-size="12" fill="#fff" font-weight="bold">Trellis2ModelLoader</text>
          <circle cx="5" cy="120" r="5" fill="#48bb78"/>
          <text x="20" y="80" font-family="monospace" font-size="11" fill="#a0aec0">sparse_structure_flow: 1.0</text>
          <text x="20" y="110" font-family="monospace" font-size="11" fill="#a0aec0">slat_guidance_strength: 7.5</text>
          <text x="20" y="140" font-family="monospace" font-size="11" fill="#a0aec0">simplify: 0.95</text>
          <text x="20" y="170" font-family="monospace" font-size="11" fill="#a0aec0">texture_size: 2048</text>
          <rect x="20" y="195" width="220" height="35" rx="4" fill="#1a3826"/>
          <text x="50" y="217" font-family="monospace" font-size="11" fill="#9ae6b4">PIXAL3D POST-PROCESS</text>
          <circle cx="255" cy="140" r="5" fill="#9ae6b4"/>
        </g>

        <!-- Connecting Noodles -->
        <path d="M 260 200 C 290 200, 290 170, 320 170" fill="none" stroke="#48bb78" stroke-width="3"/>
        <path d="M 580 190 C 620 190, 620 220, 660 220" fill="none" stroke="#9ae6b4" stroke-width="3"/>

        <!-- Node 3: 3D Mesh Preview & Export -->
        <g transform="translate(660, 60)">
          <rect width="300" height="420" rx="8" fill="#18261e" stroke="#2d4a37"/>
          <rect width="300" height="32" rx="8" fill="#223b2c"/>
          <text x="15" y="21" font-family="monospace" font-size="12" fill="#9ae6b4" font-weight="bold">3D Mesh Viewport & GLB Export</text>
          
          <!-- 3D Polyhedral Sculpture Wireframe -->
          <rect x="20" y="50" width="260" height="280" rx="6" fill="#0d1410"/>
          <g transform="translate(150, 190)">
            <polygon points="0,-90 75,-40 75,50 0,100 -75,50 -75,-40" fill="url(#meshGrad)" opacity="0.3"/>
            <polygon points="0,-90 75,-40 0,0 -75,-40" fill="#48bb78" opacity="0.4"/>
            <polygon points="0,0 75,-40 75,50 0,100" fill="#276749" opacity="0.6"/>
            <polygon points="0,0 -75,-40 -75,50 0,100" fill="#1c4532" opacity="0.8"/>
            
            <line x1="0" y1="-90" x2="0" y2="100" stroke="#9ae6b4" stroke-width="1.5"/>
            <line x1="-75" y1="-40" x2="75" y2="50" stroke="#9ae6b4" stroke-width="1.5"/>
            <line x1="75" y1="-40" x2="-75" y2="50" stroke="#9ae6b4" stroke-width="1.5"/>
            <line x1="0" y1="-90" x2="75" y2="-40" stroke="#9ae6b4" stroke-width="2"/>
            <line x1="75" y1="-40" x2="75" y2="50" stroke="#9ae6b4" stroke-width="2"/>
            <line x1="75" y1="50" x2="0" y2="100" stroke="#9ae6b4" stroke-width="2"/>
            <line x1="0" y1="100" x2="-75" y2="50" stroke="#9ae6b4" stroke-width="2"/>
            <line x1="-75" y1="50" x2="-75" y2="-40" stroke="#9ae6b4" stroke-width="2"/>
            <line x1="-75" y1="-40" x2="0" y2="-90" stroke="#9ae6b4" stroke-width="2"/>
            
            <circle cx="0" cy="-90" r="4" fill="#fff"/>
            <circle cx="75" cy="-40" r="4" fill="#fff"/>
            <circle cx="75" cy="50" r="4" fill="#fff"/>
            <circle cx="0" cy="100" r="4" fill="#fff"/>
            <circle cx="-75" cy="50" r="4" fill="#fff"/>
            <circle cx="-75" cy="-40" r="4" fill="#fff"/>
            <circle cx="0" cy="0" r="4" fill="#9ae6b4"/>
          </g>

          <rect x="20" y="350" width="260" height="40" rx="6" fill="#2f855a"/>
          <text x="80" y="375" font-family="monospace" font-size="12" fill="#fff" font-weight="bold">SAVE MESH (.GLB / .OBJ) ↗</text>
        </g>
      </g>
    `
  },

  // 3. Comfy MCP Agent
  'comfy-mcp-agent': {
    eyebrowText: 'PROTOCOL / COMFY MCP LOCAL AGENT BRIDGE',
    accentColor: '#9f7aea',
    bgGradient: '#14121f',
    defs: `
      <linearGradient id="purpleGrad" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#9f7aea"/><stop offset="100%" stop-color="#b794f4"/></linearGradient>
    `,
    artContent: `
      <g transform="translate(100, 105)" filter="url(#shadow)">
        <rect width="1000" height="540" rx="14" fill="#181628" stroke="#322d4d" stroke-width="2"/>
        
        <!-- Left: AI Coding Agent (Client) -->
        <g transform="translate(40, 60)">
          <rect width="380" height="420" rx="10" fill="#1f1b33" stroke="#44337a"/>
          <rect width="380" height="34" rx="10" fill="#2b2347"/>
          <text x="20" y="22" font-family="monospace" font-size="12" fill="#d6bcfa" font-weight="bold">MCP CLIENT / AGENT RUNTIME</text>
          
          <rect x="20" y="55" width="340" height="120" rx="6" fill="#131120"/>
          <text x="35" y="80" font-family="monospace" font-size="11" fill="#a0aec0">// Call local MCP Tool:</text>
          <text x="35" y="105" font-family="monospace" font-size="11" fill="#ecc94b">mcp.callTool("comfy_inspect_graph", {</text>
          <text x="50" y="130" font-family="monospace" font-size="11" fill="#b794f4">  target: "http://127.0.0.1:8188",</text>
          <text x="50" y="155" font-family="monospace" font-size="11" fill="#b794f4">  action: "add_lora_stack"</text>
          <text x="35" y="170" font-family="monospace" font-size="11" fill="#ecc94b">});</text>

          <rect x="20" y="195" width="340" height="200" rx="6" fill="#131120"/>
          <text x="35" y="225" font-family="monospace" font-size="11" fill="#48bb78">✓ Handshake verified (SSE/stdio)</text>
          <text x="35" y="255" font-family="monospace" font-size="11" fill="#cbd5e0">Available models detected: 14</text>
          <text x="35" y="285" font-family="monospace" font-size="11" fill="#cbd5e0">Installed custom nodes: 88</text>
          <text x="35" y="315" font-family="monospace" font-size="11" fill="#9f7aea">Auto-wiring workflow graph...</text>
          <rect x="35" y="340" width="310" height="35" rx="4" fill="#44337a"/>
          <text x="75" y="362" font-family="monospace" font-size="11" fill="#fff" font-weight="bold">AGENT EXECUTION ACTIVE</text>
        </g>

        <!-- Center: Protocol Bus -->
        <g transform="translate(435, 180)">
          <path d="M 0 50 L 130 50" stroke="#9f7aea" stroke-width="4" stroke-dasharray="6,4"/>
          <polygon points="130,50 115,42 115,58" fill="#9f7aea"/>
          <rect x="15" y="15" width="100" height="24" rx="4" fill="#322659"/>
          <text x="25" y="31" font-family="monospace" font-size="10" fill="#d6bcfa">JSON-RPC</text>

          <path d="M 130 110 L 0 110" stroke="#48bb78" stroke-width="4" stroke-dasharray="6,4"/>
          <polygon points="0,110 15,102 15,118" fill="#48bb78"/>
          <rect x="15" y="125" width="100" height="24" rx="4" fill="#1c4532"/>
          <text x="25" y="141" font-family="monospace" font-size="10" fill="#9ae6b4">RESULT</text>
        </g>

        <!-- Right: Local ComfyUI Instance -->
        <g transform="translate(580, 60)">
          <rect width="380" height="420" rx="10" fill="#1f1b33" stroke="#44337a"/>
          <rect width="380" height="34" rx="10" fill="#2b2347"/>
          <text x="20" y="22" font-family="monospace" font-size="12" fill="#d6bcfa" font-weight="bold">LOCAL COMFYUI RUNTIME (:8188)</text>
          
          <rect x="25" y="60" width="150" height="85" rx="4" fill="#2d2550" stroke="#6b46c1"/>
          <text x="35" y="80" font-family="monospace" font-size="10" fill="#d6bcfa">CheckpointLoader</text>
          <circle cx="170" cy="100" r="4" fill="#9f7aea"/>

          <rect x="205" y="60" width="150" height="85" rx="4" fill="#2d2550" stroke="#6b46c1"/>
          <text x="215" y="80" font-family="monospace" font-size="10" fill="#d6bcfa">LoRA_Adapter</text>
          <circle cx="205" cy="100" r="4" fill="#9f7aea"/>
          <circle cx="350" cy="100" r="4" fill="#48bb78"/>

          <path d="M 175 100 L 205 100" stroke="#9f7aea" stroke-width="2"/>

          <rect x="110" y="180" width="160" height="95" rx="4" fill="#271f47" stroke="#805ad5"/>
          <text x="125" y="205" font-family="monospace" font-size="10" fill="#fff">KSampler (Queue)</text>
          <path d="M 280 145 C 280 180, 190 150, 190 180" fill="none" stroke="#48bb78" stroke-width="2"/>

          <rect x="25" y="300" width="330" height="90" rx="6" fill="#131120"/>
          <text x="40" y="325" font-family="monospace" font-size="11" fill="#a0aec0">Prompt ID: 994a-810e</text>
          <text x="40" y="350" font-family="monospace" font-size="11" fill="#48bb78">Status: 200 OK · Executing Node 3/4</text>
          <rect x="40" y="365" width="300" height="8" rx="4" fill="#2d2550"/>
          <rect x="40" y="365" width="220" height="8" rx="4" fill="url(#purpleGrad)"/>
        </g>
      </g>
    `
  },

  // 4. AI Video Generation Matrix (MiniMax vs Seedance vs Higgsfield)
  'ai-video-matrix': {
    eyebrowText: 'AI VIDEO / GENERATION MOTION MATRIX',
    accentColor: '#ecc94b',
    bgGradient: '#1a1811',
    defs: `
      <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ecc94b"/><stop offset="100%" stop-color="#d69e2e"/></linearGradient>
    `,
    artContent: `
      <g transform="translate(100, 110)" filter="url(#shadow)">
        <rect width="1000" height="530" rx="14" fill="#211d14" stroke="#3d3320" stroke-width="2"/>
        <rect width="1000" height="42" rx="14" fill="#2d2417"/>
        <text x="40" y="26" font-family="monospace" font-size="13" fill="#ecc94b" font-weight="bold">MODEL COMPARISON: MOTION DYNAMICS & TEMPORAL STABILITY</text>

        <!-- Model 1: MiniMax (Hailuo) -->
        <g transform="translate(35, 65)">
          <rect width="290" height="425" rx="8" fill="#17140e" stroke="#4a3b22"/>
          <rect width="290" height="32" rx="8" fill="#2d2417"/>
          <text x="15" y="21" font-family="monospace" font-size="12" fill="#ecc94b" font-weight="bold">MiniMax / Hailuo</text>
          
          <rect x="15" y="45" width="260" height="160" rx="4" fill="#0d0b07"/>
          <circle cx="145" cy="125" r="45" fill="none" stroke="#ecc94b" stroke-width="2" stroke-dasharray="4,4"/>
          <path d="M 80 150 Q 145 70 210 150" fill="none" stroke="#f6ad55" stroke-width="3"/>
          <polygon points="210,150 195,140 200,155" fill="#f6ad55"/>
          <text x="25" y="190" font-family="monospace" font-size="10" fill="#cbd5e0">Pan & Zoom Dynamics</text>

          <text x="15" y="235" font-family="monospace" font-size="11" fill="#a0aec0">Motion score: High</text>
          <text x="15" y="260" font-family="monospace" font-size="11" fill="#a0aec0">Prompt obedience: 8.5/10</text>
          <text x="15" y="285" font-family="monospace" font-size="11" fill="#a0aec0">Max Resolution: 1080p</text>
          <text x="15" y="310" font-family="monospace" font-size="11" fill="#a0aec0">Acceptance rate: ~35%</text>
          
          <rect x="15" y="345" width="260" height="60" rx="4" fill="#261e12"/>
          <text x="25" y="370" font-family="monospace" font-size="10" fill="#ecc94b">BEST FIT:</text>
          <text x="25" y="390" font-family="monospace" font-size="10" fill="#e2e8f0">Dynamic action & cinematic sweeping pans</text>
        </g>

        <!-- Model 2: Seedance (ByteDance) -->
        <g transform="translate(355, 65)">
          <rect width="290" height="425" rx="8" fill="#17140e" stroke="#4a3b22"/>
          <rect width="290" height="32" rx="8" fill="#2d2417"/>
          <text x="15" y="21" font-family="monospace" font-size="12" fill="#ecc94b" font-weight="bold">Seedance (ByteDance)</text>

          <rect x="15" y="45" width="260" height="160" rx="4" fill="#0d0b07"/>
          <rect x="110" y="80" width="70" height="70" rx="35" fill="#382914" stroke="#ecc94b" stroke-width="2"/>
          <line x1="60" y1="115" x2="230" y2="115" stroke="#f6ad55" stroke-width="2"/>
          <circle cx="75" cy="115" r="5" fill="#ecc94b"/>
          <circle cx="215" cy="115" r="5" fill="#ecc94b"/>
          <text x="25" y="190" font-family="monospace" font-size="10" fill="#cbd5e0">Temporal Face Retention</text>

          <text x="15" y="235" font-family="monospace" font-size="11" fill="#a0aec0">Motion score: Moderate</text>
          <text x="15" y="260" font-family="monospace" font-size="11" fill="#a0aec0">Prompt obedience: 9.0/10</text>
          <text x="15" y="285" font-family="monospace" font-size="11" fill="#a0aec0">Credit cost: Competitive</text>
          <text x="15" y="310" font-family="monospace" font-size="11" fill="#a0aec0">Acceptance rate: ~48%</text>

          <rect x="15" y="345" width="260" height="60" rx="4" fill="#261e12"/>
          <text x="25" y="370" font-family="monospace" font-size="10" fill="#ecc94b">BEST FIT:</text>
          <text x="25" y="390" font-family="monospace" font-size="10" fill="#e2e8f0">Consistent character beats & storytelling</text>
        </g>

        <!-- Model 3: Higgsfield -->
        <g transform="translate(675, 65)">
          <rect width="290" height="425" rx="8" fill="#17140e" stroke="#4a3b22"/>
          <rect width="290" height="32" rx="8" fill="#2d2417"/>
          <text x="15" y="21" font-family="monospace" font-size="12" fill="#ecc94b" font-weight="bold">Higgsfield</text>

          <rect x="15" y="45" width="260" height="160" rx="4" fill="#0d0b07"/>
          <circle cx="145" cy="115" r="50" fill="none" stroke="#ecc94b" stroke-width="2"/>
          <line x1="145" y1="115" x2="185" y2="85" stroke="#ff8056" stroke-width="3"/>
          <circle cx="145" cy="115" r="6" fill="#ff8056"/>
          <text x="25" y="190" font-family="monospace" font-size="10" fill="#cbd5e0">Rigid Depth & Tracking</text>

          <text x="15" y="235" font-family="monospace" font-size="11" fill="#a0aec0">Motion score: High Precision</text>
          <text x="15" y="260" font-family="monospace" font-size="11" fill="#a0aec0">Mobile-first workflow</text>
          <text x="15" y="285" font-family="monospace" font-size="11" fill="#a0aec0">Physics stability: Strong</text>
          <text x="15" y="310" font-family="monospace" font-size="11" fill="#a0aec0">Acceptance rate: ~40%</text>

          <rect x="15" y="345" width="260" height="60" rx="4" fill="#261e12"/>
          <text x="25" y="370" font-family="monospace" font-size="10" fill="#ecc94b">BEST FIT:</text>
          <text x="25" y="390" font-family="monospace" font-size="10" fill="#e2e8f0">Camera trajectory control & product shots</text>
        </g>
      </g>
    `
  },

  // 5. FLUX in ComfyUI: LoRA Guide
  'comfyui-flux-lora': {
    eyebrowText: 'DIFFUSION / FLUX.1 SCHNELL & DEV LORA PIPELINE',
    accentColor: '#ff8056',
    bgGradient: '#191414',
    defs: `
      <linearGradient id="fluxGrad" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#ff8056"/><stop offset="100%" stop-color="#e53e3e"/></linearGradient>
    `,
    artContent: `
      <g transform="translate(100, 105)" filter="url(#shadow)">
        <rect width="1000" height="540" rx="14" fill="#1c1616" stroke="#3d2a2a" stroke-width="2"/>
        <rect width="1000" height="42" rx="14" fill="#2d1e1e"/>
        <text x="35" y="26" font-family="monospace" font-size="13" fill="#ff8056" font-weight="bold">FLUX.1 DEV/SCHNELL DUAL-STREAM ATTENTION & LORA INJECTION</text>

        <!-- Left Node: Unet/Transformer Loader -->
        <g transform="translate(40, 70)">
          <rect width="250" height="240" rx="8" fill="#221818" stroke="#4a3030"/>
          <text x="20" y="30" font-family="monospace" font-size="12" fill="#ff8056" font-weight="bold">UNETLoader (FLUX)</text>
          <rect x="20" y="50" width="210" height="35" rx="4" fill="#140f0f"/>
          <text x="30" y="72" font-family="monospace" font-size="11" fill="#cbd5e0">flux1-dev.safetensors</text>
          
          <text x="20" y="115" font-family="monospace" font-size="10" fill="#a0aec0">Weight dtype: fp8 / bf16</text>
          <text x="20" y="140" font-family="monospace" font-size="10" fill="#a0aec0">Transformer blocks: 19+38</text>
          <text x="20" y="165" font-family="monospace" font-size="10" fill="#a0aec0">Attention heads: 24</text>
          <circle cx="245" cy="180" r="5" fill="#ff8056"/>
        </g>

        <!-- Center: LoRA Weight Injection Node -->
        <g transform="translate(340, 70)">
          <rect width="320" height="410" rx="8" fill="#241a1a" stroke="#e53e3e" stroke-width="2"/>
          <rect width="320" height="36" rx="8" fill="#381c1c"/>
          <text x="20" y="24" font-family="monospace" font-size="13" fill="#fff" font-weight="bold">LoraLoaderModelOnly (FLUX)</text>
          
          <circle cx="5" cy="180" r="5" fill="#ff8056"/>
          
          <rect x="20" y="60" width="280" height="40" rx="4" fill="#171010"/>
          <text x="30" y="85" font-family="monospace" font-size="11" fill="#fbd38d">lora_cinematic_analog.safetensors</text>

          <!-- Slider 1: Model Strength -->
          <text x="20" y="130" font-family="monospace" font-size="11" fill="#e2e8f0">Model Strength: 0.85</text>
          <rect x="20" y="145" width="280" height="8" rx="4" fill="#3a2525"/>
          <rect x="20" y="145" width="238" height="8" rx="4" fill="url(#fluxGrad)"/>

          <!-- Slider 2: CLIP Strength -->
          <text x="20" y="185" font-family="monospace" font-size="11" fill="#e2e8f0">CLIP Strength: 0.70</text>
          <rect x="20" y="200" width="280" height="8" rx="4" fill="#3a2525"/>
          <rect x="20" y="200" width="196" height="8" rx="4" fill="url(#fluxGrad)"/>

          <!-- Matrix Decomposition Diagram -->
          <g transform="translate(20, 240)">
            <rect width="280" height="110" rx="4" fill="#140e0e"/>
            <text x="15" y="25" font-family="monospace" font-size="10" fill="#a0aec0">ΔW = B · A (Rank r=16, α=32)</text>
            <rect x="25" y="45" width="30" height="50" fill="#e53e3e" opacity="0.8"/>
            <text x="65" y="75" font-family="monospace" font-size="14" fill="#fff">×</text>
            <rect x="85" y="55" width="50" height="30" fill="#ff8056" opacity="0.8"/>
            <text x="145" y="75" font-family="monospace" font-size="14" fill="#fff">→</text>
            <rect x="170" y="45" width="50" height="50" fill="#4a3030" stroke="#ff8056"/>
          </g>

          <rect x="20" y="365" width="280" height="30" rx="4" fill="#e53e3e"/>
          <text x="60" y="385" font-family="monospace" font-size="11" fill="#fff" font-weight="bold">LORA WEIGHT HOOKED ↗</text>
          <circle cx="315" cy="180" r="5" fill="#48bb78"/>
        </g>

        <!-- Right: Latent Sampler Node -->
        <g transform="translate(710, 70)">
          <rect width="250" height="380" rx="8" fill="#221818" stroke="#4a3030"/>
          <text x="20" y="30" font-family="monospace" font-size="12" fill="#ff8056" font-weight="bold">KSampler (Euler/Simple)</text>
          
          <circle cx="5" cy="180" r="5" fill="#48bb78"/>
          
          <rect x="20" y="55" width="210" height="200" rx="4" fill="#120c0c"/>
          <text x="30" y="80" font-family="monospace" font-size="10" fill="#a0aec0">Steps: 28 (Dev) / 4 (Schnell)</text>
          <text x="30" y="105" font-family="monospace" font-size="10" fill="#a0aec0">CFG: 3.5</text>
          <text x="30" y="130" font-family="monospace" font-size="10" fill="#a0aec0">Sampler: euler</text>
          <text x="30" y="155" font-family="monospace" font-size="10" fill="#a0aec0">Scheduler: simple</text>
          <text x="30" y="180" font-family="monospace" font-size="10" fill="#48bb78">Denoise: 1.00</text>
          <text x="30" y="210" font-family="monospace" font-size="10" fill="#fbd38d">VRAM Usage: 15.8 GB</text>

          <rect x="20" y="280" width="210" height="70" rx="4" fill="#191111" stroke="#ff8056"/>
          <text x="30" y="305" font-family="monospace" font-size="10" fill="#ff8056">VAE DECODE</text>
          <text x="30" y="330" font-family="monospace" font-size="10" fill="#e2e8f0">Output 1024×1024</text>
        </g>
      </g>
    `
  },

  // 6. Local AI Workstation Build Guide
  'local-ai-workstation': {
    eyebrowText: 'HARDWARE / VRAM, PCIE LANES & LOCAL COMPUTE PC',
    accentColor: '#ecc94b',
    bgGradient: '#121417',
    defs: `
      <linearGradient id="chipGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#2d3748"/><stop offset="100%" stop-color="#1a202c"/></linearGradient>
    `,
    artContent: `
      <g transform="translate(100, 105)" filter="url(#shadow)">
        <rect width="1000" height="540" rx="14" fill="#171b21" stroke="#2a323d" stroke-width="2"/>
        <rect width="1000" height="42" rx="14" fill="#1f252e"/>
        <text x="35" y="26" font-family="monospace" font-size="13" fill="#ecc94b" font-weight="bold">GPU ARCHITECTURE: VRAM CAPACITY & BANDWIDTH HIERARCHY</text>

        <!-- Main GPU Die & Memory Module Layout -->
        <g transform="translate(50, 70)">
          <rect width="520" height="420" rx="10" fill="#1c241e" stroke="#2e4233" stroke-width="2"/>
          <text x="25" y="30" font-family="monospace" font-size="12" fill="#9ae6b4">WORKSTATION PCB (PCIe 5.0 x16)</text>
          
          <rect x="180" y="130" width="160" height="160" rx="6" fill="#2d3748" stroke="#cbd5e0" stroke-width="2"/>
          <rect x="200" y="150" width="120" height="120" rx="4" fill="#1a202c"/>
          <text x="235" y="215" font-family="monospace" font-size="14" fill="#ecc94b" font-weight="bold">CUDA /</text>
          <text x="230" y="235" font-family="monospace" font-size="14" fill="#ecc94b" font-weight="bold">TENSOR</text>

          <rect x="90" y="140" width="65" height="40" rx="3" fill="#2b6cb0" stroke="#63b3ed"/><text x="100" y="165" font-family="monospace" font-size="10" fill="#fff">VRAM</text>
          <rect x="90" y="210" width="65" height="40" rx="3" fill="#2b6cb0" stroke="#63b3ed"/><text x="100" y="235" font-family="monospace" font-size="10" fill="#fff">VRAM</text>
          
          <rect x="365" y="140" width="65" height="40" rx="3" fill="#2b6cb0" stroke="#63b3ed"/><text x="375" y="165" font-family="monospace" font-size="10" fill="#fff">VRAM</text>
          <rect x="365" y="210" width="65" height="40" rx="3" fill="#2b6cb0" stroke="#63b3ed"/><text x="375" y="235" font-family="monospace" font-size="10" fill="#fff">VRAM</text>

          <rect x="190" y="60" width="65" height="45" rx="3" fill="#2b6cb0" stroke="#63b3ed"/><text x="200" y="87" font-family="monospace" font-size="10" fill="#fff">VRAM</text>
          <rect x="265" y="60" width="65" height="45" rx="3" fill="#2b6cb0" stroke="#63b3ed"/><text x="275" y="87" font-family="monospace" font-size="10" fill="#fff">VRAM</text>

          <rect x="190" y="315" width="65" height="45" rx="3" fill="#2b6cb0" stroke="#63b3ed"/><text x="200" y="342" font-family="monospace" font-size="10" fill="#fff">VRAM</text>
          <rect x="265" y="315" width="65" height="45" rx="3" fill="#2b6cb0" stroke="#63b3ed"/><text x="275" y="342" font-family="monospace" font-size="10" fill="#fff">VRAM</text>

          <g transform="translate(100, 395)">
            <rect width="320" height="20" fill="#d69e2e"/>
            <line x1="120" y1="395" x2="120" y2="415" stroke="#1c241e"/>
            <line x1="200" y1="395" x2="200" y2="415" stroke="#1c241e"/>
            <line x1="280" y1="395" x2="280" y2="415" stroke="#1c241e"/>
          </g>
        </g>

        <!-- Right Side: VRAM Workload Requirement Chart -->
        <g transform="translate(600, 70)">
          <rect width="360" height="420" rx="8" fill="#13171d" stroke="#2a323d"/>
          <text x="25" y="35" font-family="monospace" font-size="12" fill="#ecc94b" font-weight="bold">WORKLOAD VRAM REQUIREMENTS</text>
          
          <g transform="translate(25, 60)">
            <text x="0" y="15" font-family="monospace" font-size="11" fill="#a0aec0">SDXL 1024px & 7B-8B LLM Q4</text>
            <rect x="0" y="25" width="310" height="16" rx="3" fill="#2d3748"/>
            <rect x="0" y="25" width="120" height="16" rx="3" fill="#48bb78"/>
            <text x="130" y="38" font-family="monospace" font-size="10" fill="#9ae6b4">16 GB (Baseline)</text>
          </g>

          <g transform="translate(25, 130)">
            <text x="0" y="15" font-family="monospace" font-size="11" fill="#a0aec0">FLUX.1 Dev fp8 & 14B-32B LLM Q4</text>
            <rect x="0" y="25" width="310" height="16" rx="3" fill="#2d3748"/>
            <rect x="0" y="25" width="200" height="16" rx="3" fill="#ecc94b"/>
            <text x="210" y="38" font-family="monospace" font-size="10" fill="#f6e05e">24 GB (Sweet Spot)</text>
          </g>

          <g transform="translate(25, 200)">
            <text x="0" y="15" font-family="monospace" font-size="11" fill="#a0aec0">Local Video Gen & 70B Quantized</text>
            <rect x="0" y="25" width="310" height="16" rx="3" fill="#2d3748"/>
            <rect x="0" y="25" width="310" height="16" rx="3" fill="#ff8056"/>
            <text x="200" y="38" font-family="monospace" font-size="10" fill="#fff">48 GB+ (Dual GPU)</text>
          </g>

          <rect x="20" y="280" width="320" height="115" rx="6" fill="#1e2430" stroke="#3182ce"/>
          <text x="35" y="308" font-family="monospace" font-size="11" fill="#63b3ed" font-weight="bold">CRITICAL EVALUATION RULE:</text>
          <text x="35" y="333" font-family="monospace" font-size="10" fill="#e2e8f0">Compute speed can wait.</text>
          <text x="35" y="353" font-family="monospace" font-size="10" fill="#e2e8f0">Insufficient VRAM causes an OOM crash.</text>
          <text x="35" y="373" font-family="monospace" font-size="10" fill="#fbd38d">Check model size + context window first.</text>
        </g>
      </g>
    `
  },

  // 7. SDXL Photorealism Checkpoint Matrix
  'sdxl-checkpoint-matrix': {
    eyebrowText: 'AI IMAGES / SDXL CHECKPOINT PHOTOREALISM',
    accentColor: '#3182ce',
    bgGradient: '#10141c',
    defs: `
      <radialGradient id="sphereGrad" cx="35%" cy="35%" r="65%"><stop offset="0%" stop-color="#e2e8f0"/><stop offset="50%" stop-color="#4a5568"/><stop offset="100%" stop-color="#1a202c"/></radialGradient>
      <linearGradient id="spectrum" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#e53e3e"/><stop offset="25%" stop-color="#ecc94b"/><stop offset="50%" stop-color="#48bb78"/><stop offset="75%" stop-color="#3182ce"/><stop offset="100%" stop-color="#9f7aea"/></linearGradient>
    `,
    artContent: `
      <g transform="translate(100, 105)" filter="url(#shadow)">
        <rect width="1000" height="540" rx="14" fill="#151b26" stroke="#253245" stroke-width="2"/>
        <rect width="1000" height="42" rx="14" fill="#1d2636"/>
        <text x="35" y="26" font-family="monospace" font-size="13" fill="#63b3ed" font-weight="bold">SDXL CALIBRATION BENCHMARK: TEXTURE FIDELITY & SKIN TONES</text>

        <!-- Optical Calibration Spheres -->
        <g transform="translate(60, 80)">
          <circle cx="100" cy="120" r="70" fill="#718096" stroke="#a0aec0" stroke-width="2"/>
          <text x="65" y="220" font-family="monospace" font-size="11" fill="#cbd5e0">18% Grey Chart</text>

          <circle cx="280" cy="120" r="70" fill="url(#sphereGrad)" stroke="#cbd5e0" stroke-width="2"/>
          <text x="245" y="220" font-family="monospace" font-size="11" fill="#cbd5e0">Specular Ball</text>

          <circle cx="460" cy="120" r="70" fill="#2d3748" stroke="#63b3ed" stroke-width="2"/>
          <path d="M 410 120 Q 460 70 510 120" fill="none" stroke="#fff" stroke-width="4"/>
          <text x="425" y="220" font-family="monospace" font-size="11" fill="#cbd5e0">Chrome Mirror</text>
        </g>

        <!-- Dynamic Exposure / Spectrum Ramp -->
        <g transform="translate(60, 335)">
          <rect width="480" height="24" rx="4" fill="url(#spectrum)"/>
          <text x="0" y="-10" font-family="monospace" font-size="10" fill="#a0aec0">Color Calibration Wedge</text>
          <g transform="translate(0, 40)">
            <rect x="0" y="0" width="60" height="25" fill="#000"/><text x="20" y="17" font-family="monospace" font-size="10" fill="#fff">0%</text>
            <rect x="60" y="0" width="60" height="25" fill="#2d3748"/>
            <rect x="120" y="0" width="60" height="25" fill="#4a5568"/>
            <rect x="180" y="0" width="60" height="25" fill="#718096"/>
            <rect x="240" y="0" width="60" height="25" fill="#a0aec0"/>
            <rect x="300" y="0" width="60" height="25" fill="#cbd5e0"/>
            <rect x="360" y="0" width="60" height="25" fill="#e2e8f0"/>
            <rect x="420" y="0" width="60" height="25" fill="#ffffff"/><text x="430" y="17" font-family="monospace" font-size="10" fill="#000">100%</text>
          </g>
        </g>

        <!-- Checkpoint Comparison Radar/Metrics -->
        <g transform="translate(600, 75)">
          <rect width="345" height="420" rx="8" fill="#10151f" stroke="#253245"/>
          <text x="25" y="35" font-family="monospace" font-size="12" fill="#63b3ed" font-weight="bold">CHECKPOINT EVALUATION MATRIX</text>
          
          <rect x="25" y="60" width="295" height="65" rx="6" fill="#18202d"/>
          <text x="40" y="85" font-family="monospace" font-size="11" fill="#fff" font-weight="bold">Juggernaut XL</text>
          <text x="40" y="105" font-family="monospace" font-size="10" fill="#a0aec0">Skin Micro-texture: 9.2 · Lighting: 9.0</text>

          <rect x="25" y="140" width="295" height="65" rx="6" fill="#18202d"/>
          <text x="40" y="165" font-family="monospace" font-size="11" fill="#fff" font-weight="bold">RealVisXL</text>
          <text x="40" y="185" font-family="monospace" font-size="10" fill="#a0aec0">Lens Flare / Film Grain: 9.4 · Artifacts: Low</text>

          <rect x="25" y="220" width="295" height="65" rx="6" fill="#18202d"/>
          <text x="40" y="245" font-family="monospace" font-size="11" fill="#fff" font-weight="bold">ZavyChromaXL</text>
          <text x="40" y="265" font-family="monospace" font-size="10" fill="#a0aec0">Contrast & Shadow Depth: 8.8 · Range: High</text>

          <rect x="25" y="305" width="295" height="85" rx="6" fill="#16253b" stroke="#3182ce"/>
          <text x="35" y="330" font-family="monospace" font-size="10" fill="#90cdf4" font-weight="bold">EDITORIAL VERDICT:</text>
          <text x="35" y="350" font-family="monospace" font-size="10" fill="#e2e8f0">No universal "best". Use fixed seeds,</text>
          <text x="35" y="370" font-family="monospace" font-size="10" fill="#e2e8f0">neutral lighting and zero negative prompt bloat.</text>
        </g>
      </g>
    `
  },

  // 8. Frontier AI Tools Benchmark Matrix 2026
  'frontier-ai-benchmark': {
    eyebrowText: 'BENCHMARKS / FRONTIER AI REASONING & CAPABILITY',
    accentColor: '#4fd1c5',
    bgGradient: '#0f171c',
    defs: `
      <linearGradient id="radarGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#4fd1c5"/><stop offset="100%" stop-color="#319795"/></linearGradient>
    `,
    artContent: `
      <g transform="translate(100, 105)" filter="url(#shadow)">
        <rect width="1000" height="540" rx="14" fill="#141f26" stroke="#233540" stroke-width="2"/>
        <rect width="1000" height="42" rx="14" fill="#1c2d38"/>
        <text x="35" y="26" font-family="monospace" font-size="13" fill="#4fd1c5" font-weight="bold">RADAR BENCHMARK: SHOULD YOUR TEAM SWITCH TO A NEW FRONTIER MODEL?</text>

        <!-- Spider / Radar Chart -->
        <g transform="translate(260, 280)">
          <polygon points="0,-160 152,-49 94,130 -94,130 -152,-49" fill="none" stroke="#2a4352" stroke-width="1.5"/>
          <polygon points="0,-120 114,-37 70,97 -70,97 -114,-37" fill="none" stroke="#2a4352" stroke-width="1.5"/>
          <polygon points="0,-80 76,-25 47,65 -47,65 -76,-25" fill="none" stroke="#2a4352" stroke-width="1.5"/>
          <polygon points="0,-40 38,-12 23,32 -23,32 -38,-12" fill="none" stroke="#2a4352" stroke-width="1.5"/>

          <line x1="0" y1="0" x2="0" y2="-170" stroke="#3d6075" stroke-width="1.5"/>
          <line x1="0" y1="0" x2="160" y2="-52" stroke="#3d6075" stroke-width="1.5"/>
          <line x1="0" y1="0" x2="100" y2="140" stroke="#3d6075" stroke-width="1.5"/>
          <line x1="0" y1="0" x2="-100" y2="140" stroke="#3d6075" stroke-width="1.5"/>
          <line x1="0" y1="0" x2="-160" y2="-52" stroke="#3d6075" stroke-width="1.5"/>

          <text x="-40" y="-175" font-family="monospace" font-size="11" fill="#4fd1c5" font-weight="bold">Reasoning (SWE)</text>
          <text x="145" y="-55" font-family="monospace" font-size="11" fill="#4fd1c5" font-weight="bold">Throughput</text>
          <text x="60" y="155" font-family="monospace" font-size="11" fill="#4fd1c5" font-weight="bold">Context Recall</text>
          <text x="-165" y="155" font-family="monospace" font-size="11" fill="#4fd1c5" font-weight="bold">Tool / Agent Use</text>
          <text x="-215" y="-55" font-family="monospace" font-size="11" fill="#4fd1c5" font-weight="bold">Cost Efficiency</text>

          <polygon points="0,-145 130,-42 80,110 -85,118 -125,-40" fill="url(#radarGrad)" opacity="0.35" stroke="#4fd1c5" stroke-width="3"/>
          <circle cx="0" cy="-145" r="4" fill="#fff"/>
          <circle cx="130" cy="-42" r="4" fill="#fff"/>
          <circle cx="80" cy="110" r="4" fill="#fff"/>
          <circle cx="-85" cy="118" r="4" fill="#fff"/>
          <circle cx="-125" cy="-40" r="4" fill="#fff"/>

          <polygon points="0,-105 140,-45 85,120 -60,85 -95,-30" fill="none" stroke="#e53e3e" stroke-width="2" stroke-dasharray="4,4"/>
        </g>

        <!-- Right: Decision Checklist Panel -->
        <g transform="translate(570, 70)">
          <rect width="380" height="425" rx="8" fill="#101920" stroke="#233540"/>
          <text x="25" y="35" font-family="monospace" font-size="12" fill="#4fd1c5" font-weight="bold">PRACTICAL SWITCHING CHECKLIST</text>
          
          <rect x="25" y="60" width="330" height="65" rx="4" fill="#17232d"/>
          <text x="40" y="85" font-family="monospace" font-size="11" fill="#e2e8f0">1. Measure Your Own Prompts</text>
          <text x="40" y="105" font-family="monospace" font-size="10" fill="#a0aec0">Synthetic leaderboards do not reflect your codebase.</text>

          <rect x="25" y="140" width="330" height="65" rx="4" fill="#17232d"/>
          <text x="40" y="165" font-family="monospace" font-size="11" fill="#e2e8f0">2. Real Latency vs Tokens/Sec</text>
          <text x="40" y="185" font-family="monospace" font-size="10" fill="#a0aec0">Check Time-To-First-Token on long contexts.</text>

          <rect x="25" y="220" width="330" height="65" rx="4" fill="#17232d"/>
          <text x="40" y="245" font-family="monospace" font-size="11" fill="#e2e8f0">3. Migration & Refactor Cost</text>
          <text x="40" y="265" font-family="monospace" font-size="10" fill="#a0aec0">Tool schema, system prompts and temperature tuning.</text>

          <rect x="25" y="305" width="330" height="90" rx="6" fill="#1b2f38" stroke="#4fd1c5"/>
          <text x="40" y="330" font-family="monospace" font-size="11" fill="#4fd1c5" font-weight="bold">TAKEAWAY:</text>
          <text x="40" y="350" font-family="monospace" font-size="10" fill="#e2e8f0">Only migrate when a model solves an active</text>
          <text x="40" y="370" font-family="monospace" font-size="10" fill="#e2e8f0">failure mode in your existing pipeline.</text>
        </g>
      </g>
    `
  },

  // 9. Vector DB Pricing & Latency Benchmarks
  'vector-database-benchmarks': {
    eyebrowText: 'STACK / VECTOR DB LATENCY, HNSW INDEXING & MEMORY',
    accentColor: '#63b3ed',
    bgGradient: '#0f1622',
    defs: `
      <linearGradient id="vecGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#63b3ed"/><stop offset="100%" stop-color="#3182ce"/></linearGradient>
    `,
    artContent: `
      <g transform="translate(100, 105)" filter="url(#shadow)">
        <rect width="1000" height="540" rx="14" fill="#131e2e" stroke="#23354f" stroke-width="2"/>
        <rect width="1000" height="42" rx="14" fill="#1c2a40"/>
        <text x="35" y="26" font-family="monospace" font-size="13" fill="#63b3ed" font-weight="bold">QDRANT VS WEAVIATE VS MILVUS VS PINECONE: ARCHITECTURE COMPARISON</text>

        <!-- Left: 3D High-Dimensional Vector Clustering -->
        <g transform="translate(60, 80)">
          <rect width="460" height="400" rx="8" fill="#0d1420" stroke="#1e2c42"/>
          <text x="25" y="35" font-family="monospace" font-size="11" fill="#90cdf4" font-weight="bold">HNSW GRAPH & COSINE SIMILARITY VECTORS</text>
          
          <line x1="60" y1="340" x2="400" y2="340" stroke="#4a5568" stroke-width="1.5"/>
          <line x1="60" y1="340" x2="60" y2="70" stroke="#4a5568" stroke-width="1.5"/>
          <line x1="60" y1="340" x2="180" y2="220" stroke="#4a5568" stroke-width="1.5" stroke-dasharray="3,3"/>
          <text x="390" y="360" font-family="monospace" font-size="10" fill="#718096">Dim X</text>
          <text x="30" y="70" font-family="monospace" font-size="10" fill="#718096">Dim Y</text>
          <text x="180" y="210" font-family="monospace" font-size="10" fill="#718096">Dim Z</text>

          <circle cx="150" cy="160" r="8" fill="#e53e3e"/>
          <text x="165" y="165" font-family="monospace" font-size="11" fill="#fff" font-weight="bold">q (Query Vector)</text>

          <g>
            <circle cx="210" cy="140" r="6" fill="#63b3ed"/>
            <circle cx="240" cy="170" r="6" fill="#63b3ed"/>
            <circle cx="190" cy="200" r="6" fill="#63b3ed"/>
            <circle cx="260" cy="120" r="5" fill="#4299e1"/>
            <circle cx="280" cy="180" r="5" fill="#4299e1"/>
            
            <line x1="150" y1="160" x2="210" y2="140" stroke="#63b3ed" stroke-width="2"/>
            <line x1="150" y1="160" x2="190" y2="200" stroke="#63b3ed" stroke-width="2"/>
            <line x1="210" y1="140" x2="240" y2="170" stroke="#4299e1" stroke-width="1"/>
            <line x1="240" y1="170" x2="280" y2="180" stroke="#4299e1" stroke-width="1"/>
          </g>

          <circle cx="340" cy="260" r="5" fill="#4a5568"/>
          <circle cx="360" cy="290" r="5" fill="#4a5568"/>
          <circle cx="320" cy="310" r="5" fill="#4a5568"/>

          <rect x="25" y="320" width="180" height="30" rx="4" fill="#1a273b"/>
          <text x="35" y="340" font-family="monospace" font-size="10" fill="#90cdf4">k-NN Recall@10: 98.4%</text>
        </g>

        <!-- Right: Engine Comparison Cards -->
        <g transform="translate(550, 80)">
          <rect width="400" height="400" rx="8" fill="#101724" stroke="#23354f"/>
          <text x="25" y="35" font-family="monospace" font-size="12" fill="#63b3ed" font-weight="bold">PRODUCTION COMPARISON SUMMARY</text>
          
          <rect x="25" y="55" width="350" height="65" rx="6" fill="#162234"/>
          <text x="40" y="80" font-family="monospace" font-size="12" fill="#fff" font-weight="bold">Qdrant (Rust)</text>
          <text x="40" y="100" font-family="monospace" font-size="10" fill="#a0aec0">Ultra-fast p99 latency · Memory-mapped payload filtering</text>

          <rect x="25" y="130" width="350" height="65" rx="6" fill="#162234"/>
          <text x="40" y="155" font-family="monospace" font-size="12" fill="#fff" font-weight="bold">Weaviate (Go)</text>
          <text x="40" y="175" font-family="monospace" font-size="10" fill="#a0aec0">GraphQL & modular native multi-modal vectorizers</text>

          <rect x="25" y="205" width="350" height="65" rx="6" fill="#162234"/>
          <text x="40" y="230" font-family="monospace" font-size="12" fill="#fff" font-weight="bold">Milvus (Distributed)</text>
          <text x="40" y="250" font-family="monospace" font-size="10" fill="#a0aec0">Billion-scale cluster sharding with separated compute</text>

          <rect x="25" y="280" width="350" height="65" rx="6" fill="#162234"/>
          <text x="40" y="305" font-family="monospace" font-size="12" fill="#fff" font-weight="bold">Pinecone (Serverless)</text>
          <text x="40" y="325" font-family="monospace" font-size="10" fill="#a0aec0">Zero maintenance · Pay per storage read unit</text>

          <rect x="25" y="355" width="350" height="30" rx="4" fill="#2b6cb0"/>
          <text x="80" y="375" font-family="monospace" font-size="11" fill="#fff" font-weight="bold">EXPLORE VECTOR BENCHMARK ↗</text>
        </g>
      </g>
    `
  },

  // 10. Web Scraping for RAG (Firecrawl vs Playwright)
  'web-scraping-rag': {
    eyebrowText: 'DATA PIPELINES / FIRECRAWL VS PLAYWRIGHT FOR RAG',
    accentColor: '#ed8936',
    bgGradient: '#171410',
    defs: `
      <linearGradient id="pipeGrad" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#ed8936"/><stop offset="100%" stop-color="#f6ad55"/></linearGradient>
    `,
    artContent: `
      <g transform="translate(100, 105)" filter="url(#shadow)">
        <rect width="1000" height="540" rx="14" fill="#1c1914" stroke="#3d3224" stroke-width="2"/>
        <rect width="1000" height="42" rx="14" fill="#292218"/>
        <text x="35" y="26" font-family="monospace" font-size="13" fill="#ed8936" font-weight="bold">WEB EXTRACTION PIPELINE: DOM HYDRATION TO CLEAN LLM MARKDOWN</text>

        <!-- Stage 1: Raw Web Page / DOM Tree -->
        <g transform="translate(40, 75)">
          <rect width="260" height="400" rx="8" fill="#13110d" stroke="#332a1e"/>
          <text x="20" y="30" font-family="monospace" font-size="11" fill="#cbd5e0" font-weight="bold">RAW HTML & JS DOM</text>
          
          <rect x="15" y="55" width="230" height="320" rx="4" fill="#0d0b08"/>
          <text x="30" y="85" font-family="monospace" font-size="10" fill="#e53e3e">&lt;html&gt;</text>
          <text x="45" y="110" font-family="monospace" font-size="10" fill="#ecc94b">&lt;head&gt;...&lt;/head&gt;</text>
          <text x="45" y="135" font-family="monospace" font-size="10" fill="#e53e3e">&lt;body&gt;</text>
          <text x="60" y="160" font-family="monospace" font-size="10" fill="#48bb78">&lt;div id="__next"&gt;</text>
          <text x="75" y="185" font-family="monospace" font-size="10" fill="#718096">&lt;nav&gt;[Boilerplate]&lt;/nav&gt;</text>
          <text x="75" y="210" font-family="monospace" font-size="10" fill="#63b3ed">&lt;article&gt;</text>
          <text x="90" y="235" font-family="monospace" font-size="10" fill="#cbd5e0">&lt;h1&gt;Core Fact&lt;/h1&gt;</text>
          <text x="90" y="260" font-family="monospace" font-size="10" fill="#cbd5e0">&lt;p&gt;Context text...&lt;/p&gt;</text>
          <text x="75" y="285" font-family="monospace" font-size="10" fill="#63b3ed">&lt;/article&gt;</text>
          <text x="75" y="310" font-family="monospace" font-size="10" fill="#718096">&lt;footer&gt;[Ad scripts]&lt;/footer&gt;</text>
          <text x="60" y="335" font-family="monospace" font-size="10" fill="#48bb78">&lt;/div&gt;</text>
        </g>

        <!-- Pipeline Arrows -->
        <g transform="translate(315, 240)">
          <path d="M 0 30 L 45 30" stroke="#ed8936" stroke-width="4"/>
          <polygon points="45,30 35,22 35,38" fill="#ed8936"/>
        </g>

        <!-- Stage 2: Scraper Engines (Firecrawl vs Playwright) -->
        <g transform="translate(375, 75)">
          <rect width="270" height="400" rx="8" fill="#13110d" stroke="#332a1e"/>
          <text x="20" y="30" font-family="monospace" font-size="11" fill="#ed8936" font-weight="bold">SCRAPER COMPARISON</text>

          <rect x="15" y="55" width="240" height="150" rx="6" fill="#241d14" stroke="#ed8936"/>
          <text x="25" y="80" font-family="monospace" font-size="12" fill="#fff" font-weight="bold">Firecrawl</text>
          <text x="25" y="105" font-family="monospace" font-size="10" fill="#a0aec0">API turns URL → Markdown</text>
          <text x="25" y="125" font-family="monospace" font-size="10" fill="#a0aec0">Handles anti-bot & proxies</text>
          <text x="25" y="145" font-family="monospace" font-size="10" fill="#a0aec0">LLM-ready chunking</text>
          <text x="25" y="175" font-family="monospace" font-size="10" fill="#fbd38d">Best for: Rapid RAG ingestion</text>

          <rect x="15" y="220" width="240" height="150" rx="6" fill="#241d14"/>
          <text x="25" y="245" font-family="monospace" font-size="12" fill="#fff" font-weight="bold">Playwright</text>
          <text x="25" y="270" font-family="monospace" font-size="10" fill="#a0aec0">Full headless browser control</text>
          <text x="25" y="290" font-family="monospace" font-size="10" fill="#a0aec0">Complex auth, multi-step forms</text>
          <text x="25" y="310" font-family="monospace" font-size="10" fill="#a0aec0">Requires self-hosted infra</text>
          <text x="25" y="340" font-family="monospace" font-size="10" fill="#fbd38d">Best for: Custom workflows</text>
        </g>

        <!-- Pipeline Arrows -->
        <g transform="translate(660, 240)">
          <path d="M 0 30 L 45 30" stroke="#48bb78" stroke-width="4"/>
          <polygon points="45,30 35,22 35,38" fill="#48bb78"/>
        </g>

        <!-- Stage 3: Clean RAG Markdown Output -->
        <g transform="translate(720, 75)">
          <rect width="240" height="400" rx="8" fill="#13110d" stroke="#332a1e"/>
          <text x="20" y="30" font-family="monospace" font-size="11" fill="#48bb78" font-weight="bold">CLEAN RAG CHUNKS</text>

          <rect x="15" y="55" width="210" height="320" rx="4" fill="#0d0b08"/>
          <text x="25" y="85" font-family="monospace" font-size="11" fill="#48bb78"># Clean Markdown</text>
          <text x="25" y="115" font-family="monospace" font-size="10" fill="#cbd5e0">## Primary Topic</text>
          <text x="25" y="145" font-family="monospace" font-size="10" fill="#a0aec0">Clean extracted factual</text>
          <text x="25" y="165" font-family="monospace" font-size="10" fill="#a0aec0">sentence without ads,</text>
          <text x="25" y="185" font-family="monospace" font-size="10" fill="#a0aec0">scripts or cookie modals.</text>
          
          <rect x="25" y="230" width="190" height="70" rx="4" fill="#182e21" stroke="#38a169"/>
          <text x="35" y="255" font-family="monospace" font-size="10" fill="#9ae6b4">TOKEN REDUCTION: -74%</text>
          <text x="35" y="280" font-family="monospace" font-size="10" fill="#e2e8f0">Ready for Embedding</text>
        </g>
      </g>
    `
  },

  // 11. Cursor vs Windsurf vs Copilot Developer Benchmarks
  'ai-code-editors': {
    eyebrowText: 'WORKFLOW / AI CODE EDITORS BENCHMARK',
    accentColor: '#cbd5e0',
    bgGradient: '#12141a',
    defs: `
      <linearGradient id="cursorGrad" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#4fd1c5"/><stop offset="100%" stop-color="#3182ce"/></linearGradient>
    `,
    artContent: `
      <g transform="translate(100, 105)" filter="url(#shadow)">
        <rect width="1000" height="540" rx="14" fill="#161821" stroke="#2b2f3d" stroke-width="2"/>
        <rect width="1000" height="42" rx="14" fill="#1f222e"/>
        <text x="35" y="26" font-family="monospace" font-size="13" fill="#cbd5e0" font-weight="bold">IDE BENCHMARK: CURSOR VS WINDSURF VS GITHUB COPILOT</text>

        <!-- Left: File Tree & Project Indexing -->
        <g transform="translate(30, 65)">
          <rect width="210" height="435" rx="6" fill="#10121a" stroke="#252836"/>
          <text x="20" y="25" font-family="monospace" font-size="10" fill="#a0aec0">PROJECT EXPLORER</text>
          <text x="20" y="55" font-family="monospace" font-size="11" fill="#4fd1c5">📁 src/lib</text>
          <text x="35" y="80" font-family="monospace" font-size="10" fill="#cbd5e0">📄 agent.ts</text>
          <text x="35" y="105" font-family="monospace" font-size="10" fill="#cbd5e0">📄 indexer.ts</text>
          <text x="20" y="135" font-family="monospace" font-size="11" fill="#4fd1c5">📁 components</text>
          <text x="35" y="160" font-family="monospace" font-size="10" fill="#cbd5e0">📄 Editor.tsx</text>
          <text x="35" y="185" font-family="monospace" font-size="10" fill="#cbd5e0">📄 DiffView.tsx</text>
          
          <rect x="15" y="260" width="180" height="150" rx="4" fill="#191c26"/>
          <text x="25" y="285" font-family="monospace" font-size="10" fill="#90cdf4">INDEX STATUS</text>
          <text x="25" y="310" font-family="monospace" font-size="10" fill="#a0aec0">Symbols: 1,420</text>
          <text x="25" y="335" font-family="monospace" font-size="10" fill="#a0aec0">Repo Embedding: 100%</text>
          <text x="25" y="360" font-family="monospace" font-size="10" fill="#48bb78">Context Synced</text>
        </g>

        <!-- Center: Code Editor with Inline AI Diff -->
        <g transform="translate(260, 65)">
          <rect width="450" height="435" rx="6" fill="#10121a" stroke="#252836"/>
          <rect width="450" height="30" rx="6" fill="#191c26"/>
          <text x="20" y="20" font-family="monospace" font-size="11" fill="#fff">agent.ts · Inline Diff</text>
          
          <g transform="translate(20, 50)">
            <text x="0" y="20" font-family="monospace" font-size="11" fill="#718096">12  export async function processTask() {</text>
            <text x="0" y="45" font-family="monospace" font-size="11" fill="#718096">13    const ctx = await getContext();</text>
            
            <rect x="-10" y="55" width="430" height="24" fill="#4a1818"/>
            <text x="0" y="70" font-family="monospace" font-size="11" fill="#feb2b2">-   return legacySyncExecutor(ctx);</text>

            <rect x="-10" y="80" width="430" height="48" fill="#183824"/>
            <text x="0" y="95" font-family="monospace" font-size="11" fill="#9ae6b4">+   const plan = await planner.synthesize(ctx);</text>
            <text x="0" y="118" font-family="monospace" font-size="11" fill="#9ae6b4">+   return executeStream(plan);</text>

            <text x="0" y="145" font-family="monospace" font-size="11" fill="#718096">16  }</text>

            <rect x="0" y="180" width="410" height="40" rx="4" fill="#212636" stroke="#4fd1c5"/>
            <text x="20" y="205" font-family="monospace" font-size="11" fill="#4fd1c5">Tab: Accept ↗ · Esc: Reject · Cmd+K: Edit</text>
          </g>
        </g>

        <!-- Right: AI Agent Chat / Context Cascade -->
        <g transform="translate(730, 65)">
          <rect width="240" height="435" rx="6" fill="#10121a" stroke="#252836"/>
          <text x="20" y="25" font-family="monospace" font-size="10" fill="#4fd1c5" font-weight="bold">AGENT CAPABILITIES</text>

          <rect x="15" y="45" width="210" height="110" rx="4" fill="#191c26"/>
          <text x="25" y="70" font-family="monospace" font-size="11" fill="#fff" font-weight="bold">Cursor Composer</text>
          <text x="25" y="90" font-family="monospace" font-size="9" fill="#a0aec0">Multi-file codebase edits</text>
          <text x="25" y="110" font-family="monospace" font-size="9" fill="#a0aec0">Terminal command execution</text>
          <text x="25" y="130" font-family="monospace" font-size="9" fill="#4fd1c5">Leader for complex refactors</text>

          <rect x="15" y="170" width="210" height="110" rx="4" fill="#191c26"/>
          <text x="25" y="195" font-family="monospace" font-size="11" fill="#fff" font-weight="bold">Windsurf (Codeium)</text>
          <text x="25" y="215" font-family="monospace" font-size="9" fill="#a0aec0">Cascade context flows</text>
          <text x="25" y="235" font-family="monospace" font-size="9" fill="#a0aec0">Deep real-time AST awareness</text>
          <text x="25" y="255" font-family="monospace" font-size="9" fill="#90cdf4">Smooth agentic handoff</text>

          <rect x="15" y="295" width="210" height="110" rx="4" fill="#191c26"/>
          <text x="25" y="320" font-family="monospace" font-size="11" fill="#fff" font-weight="bold">GitHub Copilot</text>
          <text x="25" y="340" font-family="monospace" font-size="9" fill="#a0aec0">Enterprise compliance</text>
          <text x="25" y="360" font-family="monospace" font-size="9" fill="#a0aec0">Fast inline ghost text</text>
          <text x="25" y="380" font-family="monospace" font-size="9" fill="#ecc94b">Best for broad org rollout</text>
        </g>
      </g>
    `
  },

  // 12. Async Notion Architecture Decision Log
  'notion-decision-log': {
    eyebrowText: 'WORKFLOW / LIGHTWEIGHT NOTION DECISION LOG',
    accentColor: '#ecc94b',
    bgGradient: '#141417',
    defs: `
      <linearGradient id="docGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#26262e"/><stop offset="100%" stop-color="#18181c"/></linearGradient>
    `,
    artContent: `
      <g transform="translate(100, 105)" filter="url(#shadow)">
        <rect width="1000" height="540" rx="14" fill="#1b1b20" stroke="#33333d" stroke-width="2"/>
        <rect width="1000" height="42" rx="14" fill="#24242c"/>
        <text x="35" y="26" font-family="monospace" font-size="13" fill="#ecc94b" font-weight="bold">ASYNC ENGINEERING: LIGHTWEIGHT ARCHITECTURAL DECISION RECORDS (ADR)</text>

        <!-- Main Notion Doc Canvas -->
        <g transform="translate(50, 65)">
          <rect width="900" height="435" rx="8" fill="#121215" stroke="#292930"/>
          
          <text x="40" y="45" font-family="sans-serif" font-size="22" fill="#fff" font-weight="bold">📋 ADR-042: Migrating Cache Layer to Redis Streams</text>
          <g transform="translate(40, 65)">
            <rect width="90" height="24" rx="4" fill="#22543d"/><text x="12" y="16" font-family="monospace" font-size="10" fill="#9ae6b4">STATUS: ACCEPTED</text>
            <rect x="105" y="0" width="110" height="24" rx="4" fill="#2b4c7e"/><text x="115" y="16" font-family="monospace" font-size="10" fill="#90cdf4">DATE: 2026-09-12</text>
            <rect x="230" y="0" width="130" height="24" rx="4" fill="#44337a"/><text x="240" y="16" font-family="monospace" font-size="10" fill="#d6bcfa">OWNER: INFRA TEAM</text>
          </g>

          <line x1="40" y1="110" x2="860" y2="110" stroke="#2d2d38" stroke-width="1.5"/>

          <text x="40" y="145" font-family="monospace" font-size="12" fill="#ecc94b" font-weight="bold">## 1. Context & Problem Statement</text>
          <text x="40" y="175" font-family="sans-serif" font-size="12" fill="#a0aec0">Our polling architecture produces 14k redundant queries/min on the database.</text>
          <text x="40" y="195" font-family="sans-serif" font-size="12" fill="#a0aec0">We require an async message pub/sub bus with message replay durability.</text>

          <text x="40" y="240" font-family="monospace" font-size="12" fill="#ecc94b" font-weight="bold">## 2. Considered Alternatives & Trade-offs</text>
          
          <g transform="translate(40, 255)">
            <rect width="820" height="30" fill="#1c1c24"/>
            <text x="20" y="20" font-family="monospace" font-size="10" fill="#cbd5e0" font-weight="bold">OPTION</text>
            <text x="240" y="20" font-family="monospace" font-size="10" fill="#cbd5e0" font-weight="bold">PROS</text>
            <text x="480" y="20" font-family="monospace" font-size="10" fill="#cbd5e0" font-weight="bold">CONS</text>
            <text x="700" y="20" font-family="monospace" font-size="10" fill="#cbd5e0" font-weight="bold">DECISION</text>

            <rect y="30" width="820" height="40" fill="#16161c"/>
            <text x="20" y="55" font-family="monospace" font-size="10" fill="#fff">Redis Streams</text>
            <text x="240" y="55" font-family="sans-serif" font-size="10" fill="#a0aec0">Zero extra infrastructure</text>
            <text x="480" y="55" font-family="sans-serif" font-size="10" fill="#a0aec0">Memory limits</text>
            <text x="700" y="55" font-family="monospace" font-size="10" fill="#48bb78">✓ SELECTED</text>

            <rect y="70" width="820" height="40" fill="#1c1c24"/>
            <text x="20" y="95" font-family="monospace" font-size="10" fill="#fff">Apache Kafka</text>
            <text x="240" y="95" font-family="sans-serif" font-size="10" fill="#a0aec0">High throughput retention</text>
            <text x="480" y="95" font-family="sans-serif" font-size="10" fill="#a0aec0">Operational overhead</text>
            <text x="700" y="95" font-family="monospace" font-size="10" fill="#e53e3e">✗ REJECTED</text>
          </g>

          <text x="40" y="405" font-family="monospace" font-size="11" fill="#718096">RULE: Keep decision logs shorter than 1 page so engineers actually read them.</text>
        </g>
      </g>
    `
  },

  // 13. B2B Data Enrichment (Apollo vs Clay)
  'data-enrichment-waterfall': {
    eyebrowText: 'DATA PIPELINES / B2B ENRICHMENT WATERFALL CASCADES',
    accentColor: '#3182ce',
    bgGradient: '#0e1724',
    defs: `
      <linearGradient id="waterfallGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#3182ce"/><stop offset="100%" stop-color="#2b6cb0"/></linearGradient>
    `,
    artContent: `
      <g transform="translate(100, 105)" filter="url(#shadow)">
        <rect width="1000" height="540" rx="14" fill="#131e2e" stroke="#25354d" stroke-width="2"/>
        <rect width="1000" height="42" rx="14" fill="#1b2a40"/>
        <text x="35" y="26" font-family="monospace" font-size="13" fill="#63b3ed" font-weight="bold">APOLLO VS CLAY: WATERFALL ENRICHMENT MATCH RATES & ORCHESTRATION</text>

        <!-- Stepped Cascade Stages -->
        <g transform="translate(40, 75)">
          <rect width="260" height="400" rx="8" fill="#101824" stroke="#22334a"/>
          <text x="20" y="30" font-family="monospace" font-size="11" fill="#90cdf4" font-weight="bold">STEP 1: INGESTION</text>
          
          <rect x="20" y="55" width="220" height="120" rx="4" fill="#172233"/>
          <text x="35" y="85" font-family="monospace" font-size="10" fill="#cbd5e0">company: "Stripe"</text>
          <text x="35" y="110" font-family="monospace" font-size="10" fill="#cbd5e0">domain: "stripe.com"</text>
          <text x="35" y="135" font-family="monospace" font-size="10" fill="#cbd5e0">lead: "Engineering VP"</text>

          <rect x="20" y="200" width="220" height="170" rx="4" fill="#172233"/>
          <text x="35" y="230" font-family="monospace" font-size="10" fill="#a0aec0">Input records: 1,000</text>
          <text x="35" y="260" font-family="monospace" font-size="10" fill="#a0aec0">Missing email: 64%</text>
          <text x="35" y="290" font-family="monospace" font-size="10" fill="#a0aec0">Missing phone: 82%</text>
          <text x="35" y="330" font-family="monospace" font-size="10" fill="#e53e3e">Raw Match Rate: 36%</text>
        </g>

        <!-- Connection Arrow -->
        <g transform="translate(315, 230)">
          <path d="M 0 30 L 45 30" stroke="#63b3ed" stroke-width="4"/>
          <polygon points="45,30 35,22 35,38" fill="#63b3ed"/>
        </g>

        <!-- Tier 2: Clay Waterfall Logic (Provider Cascade) -->
        <g transform="translate(375, 75)">
          <rect width="270" height="400" rx="8" fill="#101824" stroke="#22334a"/>
          <text x="20" y="30" font-family="monospace" font-size="11" fill="#63b3ed" font-weight="bold">STEP 2: WATERFALL</text>

          <rect x="20" y="55" width="230" height="70" rx="4" fill="#18273b" stroke="#3182ce"/>
          <text x="35" y="80" font-family="monospace" font-size="10" fill="#fff" font-weight="bold">1. Try Provider A</text>
          <text x="35" y="100" font-family="monospace" font-size="9" fill="#90cdf4">Found: 420 (Cost: $0.01)</text>

          <rect x="20" y="140" width="230" height="70" rx="4" fill="#18273b" stroke="#3182ce"/>
          <text x="35" y="165" font-family="monospace" font-size="10" fill="#fff" font-weight="bold">2. If null → Try Provider B</text>
          <text x="35" y="185" font-family="monospace" font-size="9" fill="#90cdf4">Found: 280 (Cost: $0.03)</text>

          <rect x="20" y="225" width="230" height="70" rx="4" fill="#18273b" stroke="#3182ce"/>
          <text x="35" y="250" font-family="monospace" font-size="10" fill="#fff" font-weight="bold">3. If null → Try Provider C</text>
          <text x="35" y="270" font-family="monospace" font-size="9" fill="#90cdf4">Found: 110 (Cost: $0.05)</text>

          <rect x="20" y="315" width="230" height="55" rx="4" fill="#22543d"/>
          <text x="35" y="338" font-family="monospace" font-size="10" fill="#9ae6b4" font-weight="bold">TOTAL FOUND: 810 / 1000</text>
          <text x="35" y="358" font-family="monospace" font-size="9" fill="#c6f6d5">Match rate jumped to 81%</text>
        </g>

        <!-- Connection Arrow -->
        <g transform="translate(660, 230)">
          <path d="M 0 30 L 45 30" stroke="#48bb78" stroke-width="4"/>
          <polygon points="45,30 35,22 35,38" fill="#48bb78"/>
        </g>

        <!-- Tier 3: Verified Golden Records -->
        <g transform="translate(720, 75)">
          <rect width="240" height="400" rx="8" fill="#101824" stroke="#22334a"/>
          <text x="20" y="30" font-family="monospace" font-size="11" fill="#48bb78" font-weight="bold">STEP 3: GOLDEN CRM</text>

          <rect x="20" y="55" width="200" height="320" rx="4" fill="#0b111a"/>
          <text x="30" y="85" font-family="monospace" font-size="10" fill="#48bb78">✓ Verified Email</text>
          <text x="30" y="115" font-family="monospace" font-size="10" fill="#48bb78">✓ Direct Dial</text>
          <text x="30" y="145" font-family="monospace" font-size="10" fill="#48bb78">✓ Revenue & Headcount</text>
          <text x="30" y="175" font-family="monospace" font-size="10" fill="#48bb78">✓ Active Tech Stack</text>

          <rect x="20" y="240" width="200" height="110" rx="4" fill="#1b3624" stroke="#48bb78"/>
          <text x="30" y="270" font-family="monospace" font-size="10" fill="#9ae6b4">ORCHESTRATION WIN:</text>
          <text x="30" y="295" font-family="monospace" font-size="9" fill="#e2e8f0">Never rely on one database.</text>
          <text x="30" y="315" font-family="monospace" font-size="9" fill="#e2e8f0">Waterfall reduces bounce rate.</text>
        </g>
      </g>
    `
  },

  // 14. 4K Coding Monitor Guide
  '4k-coding-monitor': {
    eyebrowText: 'HARDWARE / 4K DISPLAY SCALING, SUBPIXEL TEXT & DESK ERGONOMICS',
    accentColor: '#f6ad55',
    bgGradient: '#121419',
    defs: `
      <linearGradient id="monitorGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#1e2430"/><stop offset="100%" stop-color="#0e1117"/></linearGradient>
    `,
    artContent: `
      <g transform="translate(100, 105)" filter="url(#shadow)">
        <rect width="1000" height="540" rx="14" fill="#171a21" stroke="#2b313d" stroke-width="2"/>
        <rect width="1000" height="42" rx="14" fill="#1f232d"/>
        <text x="35" y="26" font-family="monospace" font-size="13" fill="#f6ad55" font-weight="bold">DISPLAY CLARITY: 3840×2160 SUBPIXEL TEXT RENDERING & 200% INTEGER SCALING</text>

        <g transform="translate(60, 65)">
          <rect width="880" height="380" rx="8" fill="url(#monitorGrad)" stroke="#4a5568" stroke-width="3"/>
          <rect x="20" y="20" width="840" height="340" fill="#0d1017"/>

          <!-- Window 1: Code Editor with Crisp Font -->
          <g transform="translate(40, 40)">
            <rect width="380" height="300" rx="4" fill="#141824" stroke="#252c3d"/>
            <text x="20" y="25" font-family="monospace" font-size="11" fill="#f6ad55">4K at 150% Scale: Crisp Glyphs</text>
            <g transform="translate(20, 50)">
              <text x="0" y="20" font-family="monospace" font-size="14" fill="#cbd5e0" font-weight="bold">const buffer = allocate(4096);</text>
              <text x="0" y="45" font-family="monospace" font-size="14" fill="#90cdf4">if (buffer.capacity &lt; max) {</text>
              <text x="20" y="70" font-family="monospace" font-size="14" fill="#48bb78">  stream.flush(target);</text>
              <text x="0" y="95" font-family="monospace" font-size="14" fill="#90cdf4">}</text>

              <g transform="translate(120, 110)">
                <circle cx="60" cy="60" r="55" fill="#1a202c" stroke="#f6ad55" stroke-width="2"/>
                <rect x="25" y="30" width="6" height="60" fill="#e53e3e"/>
                <rect x="33" y="30" width="6" height="60" fill="#48bb78"/>
                <rect x="41" y="30" width="6" height="60" fill="#3182ce"/>
                <rect x="52" y="30" width="6" height="60" fill="#e53e3e"/>
                <rect x="60" y="30" width="6" height="60" fill="#48bb78"/>
                <rect x="68" y="30" width="6" height="60" fill="#3182ce"/>
                <rect x="79" y="30" width="6" height="60" fill="#e53e3e"/>
                <rect x="87" y="30" width="6" height="60" fill="#48bb78"/>
                <rect x="95" y="30" width="6" height="60" fill="#3182ce"/>
                <text x="15" y="105" font-family="monospace" font-size="8" fill="#fff">SUBPIXEL RGB</text>
              </g>
            </g>
          </g>

          <!-- Window 2: Technical Checklist & Eyeline Specs -->
          <g transform="translate(460, 40)">
            <rect width="380" height="300" rx="4" fill="#141824" stroke="#252c3d"/>
            <text x="20" y="25" font-family="monospace" font-size="11" fill="#f6ad55">Evaluation Checklist</text>
            
            <g transform="translate(20, 50)">
              <text x="0" y="20" font-family="monospace" font-size="11" fill="#fff">1. Native 4K Text Clarity</text>
              <text x="0" y="40" font-family="sans-serif" font-size="10" fill="#a0aec0">Check font rendering before paying for 144Hz.</text>

              <text x="0" y="75" font-family="monospace" font-size="11" fill="#fff">2. Desk Depth & Distance</text>
              <text x="0" y="95" font-family="sans-serif" font-size="10" fill="#a0aec0">27" vs 32": requires 60cm - 80cm viewing distance.</text>

              <text x="0" y="130" font-family="monospace" font-size="11" fill="#fff">3. Integer vs Fractional Scaling</text>
              <text x="0" y="150" font-family="sans-serif" font-size="10" fill="#a0aec0">macOS fractional scaling overhead vs Windows Cleartype.</text>

              <rect y="180" width="340" height="50" rx="4" fill="#2d2214" stroke="#f6ad55"/>
              <text x="15" y="202" font-family="monospace" font-size="10" fill="#f6ad55">RECOMMENDED WORKFLOW:</text>
              <text x="15" y="218" font-family="monospace" font-size="9" fill="#e2e8f0">32" 4K display at 150% = 2560×1440 readable canvas.</text>
            </g>
          </g>
        </g>

        <!-- Monitor Base Stand -->
        <g transform="translate(440, 445)">
          <rect x="40" y="0" width="40" height="40" fill="#2d3748"/>
          <rect x="0" y="40" width="120" height="15" rx="3" fill="#1a202c" stroke="#4a5568"/>
        </g>
      </g>
    `
  },

  // 15. AI Video Prompt Guide (Viewfinder & Shot Anatomy)
  'ai-video-prompt-shot': {
    eyebrowText: 'PROMPT CRAFT / AI VIDEO SHOT BRIEF ANATOMY',
    accentColor: '#f6ad55',
    bgGradient: '#1a140f',
    defs: `
      <radialGradient id="viewfinderGrad" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#2d1c10"/><stop offset="100%" stop-color="#120c08"/></radialGradient>
    `,
    artContent: `
      <g transform="translate(100, 105)" filter="url(#shadow)">
        <rect width="1000" height="540" rx="14" fill="#1f1610" stroke="#3d281a" stroke-width="2"/>
        <rect width="1000" height="42" rx="14" fill="#2d1e13"/>
        <text x="35" y="26" font-family="monospace" font-size="13" fill="#f6ad55" font-weight="bold">PROMPT ANATOMY: TREAT THE PROMPT AS A CINEMATOGRAPHER'S SHOT BRIEF</text>

        <!-- Camera Viewfinder Overlay -->
        <g transform="translate(50, 65)">
          <rect width="600" height="435" rx="8" fill="url(#viewfinderGrad)" stroke="#4a3222" stroke-width="2"/>
          
          <line x1="200" y1="20" x2="200" y2="415" stroke="#f6ad55" stroke-width="1" opacity="0.3"/>
          <line x1="400" y1="20" x2="400" y2="415" stroke="#f6ad55" stroke-width="1" opacity="0.3"/>
          <line x1="20" y1="145" x2="580" y2="145" stroke="#f6ad55" stroke-width="1" opacity="0.3"/>
          <line x1="20" y1="290" x2="580" y2="290" stroke="#f6ad55" stroke-width="1" opacity="0.3"/>

          <path d="M 40 60 L 40 40 L 60 40" fill="none" stroke="#f6ad55" stroke-width="3"/>
          <path d="M 560 60 L 560 40 L 540 40" fill="none" stroke="#f6ad55" stroke-width="3"/>
          <path d="M 40 375 L 40 395 L 60 395" fill="none" stroke="#f6ad55" stroke-width="3"/>
          <path d="M 560 375 L 560 395 L 540 395" fill="none" stroke="#f6ad55" stroke-width="3"/>

          <circle cx="300" cy="217" r="12" fill="none" stroke="#f6ad55" stroke-width="2"/>
          <line x1="300" y1="195" x2="300" y2="239" stroke="#f6ad55" stroke-width="1.5"/>
          <line x1="278" y1="217" x2="322" y2="217" stroke="#f6ad55" stroke-width="1.5"/>

          <path d="M 180 270 Q 300 160 420 270" fill="none" stroke="#ff8056" stroke-width="3" stroke-dasharray="6,4"/>
          <polygon points="420,270 405,260 410,275" fill="#ff8056"/>
          <text x="230" y="190" font-family="monospace" font-size="11" fill="#fbd38d">Camera Orbit 45°</text>

          <text x="50" y="70" font-family="monospace" font-size="11" fill="#f6ad55">REC ● 24 FPS</text>
          <text x="460" y="70" font-family="monospace" font-size="11" fill="#f6ad55">50mm · f/1.8</text>
          <text x="50" y="380" font-family="monospace" font-size="11" fill="#f6ad55">SHUTTER: 1/48</text>
          <text x="470" y="380" font-family="monospace" font-size="11" fill="#f6ad55">ISO 400</text>
        </g>

        <!-- Right Side: Shot Brief Breakdown -->
        <g transform="translate(680, 65)">
          <rect width="270" height="435" rx="8" fill="#140f0b" stroke="#3d281a"/>
          <text x="20" y="30" font-family="monospace" font-size="11" fill="#f6ad55" font-weight="bold">6-ELEMENT SHOT BRIEF</text>

          <g transform="translate(15, 50)">
            <rect width="240" height="50" rx="4" fill="#241710"/>
            <text x="15" y="20" font-family="monospace" font-size="10" fill="#fbd38d">1. Single Core Action</text>
            <text x="15" y="38" font-family="sans-serif" font-size="9" fill="#a0aec0">"Hand turns ceramic mug once"</text>

            <rect y="60" width="240" height="50" rx="4" fill="#241710"/>
            <text x="15" y="80" font-family="monospace" font-size="10" fill="#fbd38d">2. Explicit Camera Move</text>
            <text x="15" y="98" font-family="sans-serif" font-size="9" fill="#a0aec0">"Static shot" vs "Slow truck right"</text>

            <rect y="120" width="240" height="50" rx="4" fill="#241710"/>
            <text x="15" y="140" font-family="monospace" font-size="10" fill="#fbd38d">3. Defined Cut / Finish</text>
            <text x="15" y="158" font-family="sans-serif" font-size="9" fill="#a0aec0">"Movement settles before 4s cut"</text>

            <rect y="180" width="240" height="50" rx="4" fill="#241710"/>
            <text x="15" y="200" font-family="monospace" font-size="10" fill="#fbd38d">4. Lighting & Environment</text>
            <text x="15" y="218" font-family="sans-serif" font-size="9" fill="#a0aec0">"Soft morning window side-light"</text>

            <rect y="240" width="240" height="50" rx="4" fill="#241710"/>
            <text x="15" y="260" font-family="monospace" font-size="10" fill="#fbd38d">5. Negative Words to Cut</text>
            <text x="15" y="278" font-family="sans-serif" font-size="9" fill="#e53e3e">Delete: "cinematic, 8k, hyper-detailed"</text>

            <rect y="300" width="240" height="65" rx="4" fill="#2d1c12" stroke="#f6ad55"/>
            <text x="15" y="325" font-family="monospace" font-size="10" fill="#fbd38d" font-weight="bold">EVALUATION GOAL:</text>
            <text x="15" y="348" font-family="monospace" font-size="9" fill="#fff">One variable changed per attempt.</text>
          </g>
        </g>
      </g>
    `
  },

  // 16. ComfyUI Beginner Guide (First Working Workflow)
  'comfyui-first-workflow': {
    eyebrowText: 'COMFYUI / FIRST REPRODUCIBLE IMAGE WORKFLOW',
    accentColor: '#48bb78',
    bgGradient: '#0f1712',
    defs: `
      <linearGradient id="comfyGrad" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#48bb78"/><stop offset="100%" stop-color="#38a169"/></linearGradient>
    `,
    artContent: `
      <g transform="translate(100, 105)" filter="url(#shadow)">
        <rect width="1000" height="540" rx="14" fill="#131c16" stroke="#253a2b" stroke-width="2"/>
        <rect width="1000" height="42" rx="14" fill="#1c2b20"/>
        <text x="35" y="26" font-family="monospace" font-size="13" fill="#9ae6b4" font-weight="bold">FOUNDATIONAL PIPELINE: LOAD CHECKPOINT → PROMPT → KSAMPLER → VAE DECODE</text>

        <!-- Node 1: Load Checkpoint -->
        <g transform="translate(35, 70)">
          <rect width="210" height="200" rx="8" fill="#19261e" stroke="#38a169"/>
          <rect width="210" height="28" rx="8" fill="#24382c"/>
          <text x="15" y="19" font-family="monospace" font-size="11" fill="#9ae6b4" font-weight="bold">Load Checkpoint</text>
          
          <rect x="15" y="40" width="180" height="30" rx="4" fill="#0f1712"/>
          <text x="25" y="60" font-family="monospace" font-size="10" fill="#cbd5e0">v1-5-pruned-ema.safetensors</text>

          <g transform="translate(195, 95)">
            <circle cy="0" r="5" fill="#e53e3e"/><text x="-50" y="4" font-family="monospace" font-size="9" fill="#feb2b2">MODEL</text>
            <circle cy="35" r="5" fill="#ecc94b"/><text x="-40" y="39" font-family="monospace" font-size="9" fill="#fefcbf">CLIP</text>
            <circle cy="70" r="5" fill="#e53e3e"/><text x="-35" y="74" font-family="monospace" font-size="9" fill="#feb2b2">VAE</text>
          </g>
        </g>

        <!-- Node 2: Positive Prompt -->
        <g transform="translate(280, 70)">
          <rect width="220" height="110" rx="8" fill="#19261e" stroke="#ecc94b"/>
          <rect width="220" height="26" rx="8" fill="#352e18"/>
          <text x="15" y="18" font-family="monospace" font-size="10" fill="#fefcbf" font-weight="bold">CLIP Text (Positive)</text>
          <circle cx="5" cy="55" r="5" fill="#ecc94b"/>
          <rect x="15" y="35" width="190" height="60" rx="4" fill="#0f1712"/>
          <text x="25" y="55" font-family="monospace" font-size="10" fill="#9ae6b4">blue teapot on a kitchen</text>
          <text x="25" y="75" font-family="monospace" font-size="10" fill="#9ae6b4">wooden shelf, natural light</text>
          <circle cx="215" cy="55" r="5" fill="#ecc94b"/>
        </g>

        <!-- Node 3: Negative Prompt -->
        <g transform="translate(280, 205)">
          <rect width="220" height="95" rx="8" fill="#19261e" stroke="#718096"/>
          <rect width="220" height="26" rx="8" fill="#252c38"/>
          <text x="15" y="18" font-family="monospace" font-size="10" fill="#cbd5e0" font-weight="bold">CLIP Text (Negative)</text>
          <circle cx="5" cy="50" r="5" fill="#ecc94b"/>
          <rect x="15" y="35" width="190" height="48" rx="4" fill="#0f1712"/>
          <text x="25" y="55" font-family="monospace" font-size="10" fill="#a0aec0">blurry, cropped, distorted</text>
          <circle cx="215" cy="50" r="5" fill="#cbd5e0"/>
        </g>

        <!-- Node 4: Empty Latent Image -->
        <g transform="translate(35, 305)">
          <rect width="210" height="150" rx="8" fill="#19261e" stroke="#3182ce"/>
          <rect width="210" height="28" rx="8" fill="#1e2c40"/>
          <text x="15" y="19" font-family="monospace" font-size="11" fill="#90cdf4" font-weight="bold">Empty Latent Image</text>
          <text x="20" y="55" font-family="monospace" font-size="10" fill="#a0aec0">width: 512</text>
          <text x="20" y="80" font-family="monospace" font-size="10" fill="#a0aec0">height: 512</text>
          <text x="20" y="105" font-family="monospace" font-size="10" fill="#a0aec0">batch_size: 1</text>
          <circle cx="205" cy="80" r="5" fill="#90cdf4"/>
        </g>

        <!-- Node 5: KSampler (Central Processing) -->
        <g transform="translate(540, 70)">
          <rect width="210" height="385" rx="8" fill="#19261e" stroke="#48bb78" stroke-width="2"/>
          <rect width="210" height="30" rx="8" fill="#264230"/>
          <text x="15" y="20" font-family="monospace" font-size="12" fill="#fff" font-weight="bold">KSampler</text>

          <circle cx="5" cy="50" r="5" fill="#e53e3e"/><text x="18" y="54" font-family="monospace" font-size="9" fill="#a0aec0">model</text>
          <circle cx="5" cy="85" r="5" fill="#ecc94b"/><text x="18" y="89" font-family="monospace" font-size="9" fill="#a0aec0">positive</text>
          <circle cx="5" cy="120" r="5" fill="#cbd5e0"/><text x="18" y="124" font-family="monospace" font-size="9" fill="#a0aec0">negative</text>
          <circle cx="5" cy="155" r="5" fill="#90cdf4"/><text x="18" y="159" font-family="monospace" font-size="9" fill="#a0aec0">latent_image</text>

          <rect x="15" y="180" width="180" height="150" rx="4" fill="#0d1410"/>
          <text x="25" y="205" font-family="monospace" font-size="10" fill="#9ae6b4">seed: 482910481</text>
          <text x="25" y="230" font-family="monospace" font-size="10" fill="#a0aec0">steps: 20</text>
          <text x="25" y="255" font-family="monospace" font-size="10" fill="#a0aec0">cfg: 7.0</text>
          <text x="25" y="280" font-family="monospace" font-size="10" fill="#a0aec0">sampler: euler</text>
          <text x="25" y="305" font-family="monospace" font-size="10" fill="#a0aec0">scheduler: normal</text>

          <circle cx="205" cy="240" r="5" fill="#90cdf4"/>
        </g>

        <!-- Node 6: VAE Decode & Preview Image -->
        <g transform="translate(785, 70)">
          <rect width="180" height="385" rx="8" fill="#19261e" stroke="#38a169"/>
          <rect width="180" height="30" rx="8" fill="#24382c"/>
          <text x="15" y="20" font-family="monospace" font-size="11" fill="#9ae6b4" font-weight="bold">Save Image</text>

          <circle cx="5" cy="70" r="5" fill="#90cdf4"/>
          <circle cx="5" cy="110" r="5" fill="#e53e3e"/>

          <rect x="15" y="130" width="150" height="150" rx="4" fill="#0d1410" stroke="#38a169"/>
          <circle cx="90" cy="205" r="30" fill="#3182ce"/>
          <ellipse cx="90" cy="180" rx="15" ry="5" fill="#4299e1"/>
          <path d="M 60 205 Q 45 205 50 190 Q 55 180 70 190" fill="none" stroke="#3182ce" stroke-width="4"/>
          <path d="M 120 205 Q 140 195 135 175" fill="none" stroke="#3182ce" stroke-width="4"/>
          <line x1="45" y1="235" x2="135" y2="235" stroke="#975a16" stroke-width="4"/>

          <rect x="15" y="300" width="150" height="30" rx="4" fill="#2f855a"/>
          <text x="35" y="320" font-family="monospace" font-size="10" fill="#fff" font-weight="bold">IMAGE SAVED ↗</text>
        </g>

        <!-- Dynamic Connection Wires -->
        <path d="M 230 130 C 255 130, 255 125, 280 125" fill="none" stroke="#ecc94b" stroke-width="2"/>
        <path d="M 230 130 C 255 130, 255 255, 280 255" fill="none" stroke="#ecc94b" stroke-width="2"/>
        <path d="M 230 95 C 400 95, 400 120, 540 120" fill="none" stroke="#e53e3e" stroke-width="2.5"/>
        <path d="M 500 125 C 520 125, 520 155, 540 155" fill="none" stroke="#ecc94b" stroke-width="2"/>
        <path d="M 500 255 C 520 255, 520 190, 540 190" fill="none" stroke="#cbd5e0" stroke-width="2"/>
        <path d="M 245 385 C 400 385, 400 225, 540 225" fill="none" stroke="#90cdf4" stroke-width="2"/>
        <path d="M 745 310 C 765 310, 765 140, 785 140" fill="none" stroke="#90cdf4" stroke-width="2"/>
        <path d="M 230 165 C 260 165, 750 480, 785 180" fill="none" stroke="#e53e3e" stroke-width="2"/>
      </g>
    `
  }
};

async function generateAll() {
  console.log(`Generating ${Object.keys(ASSETS).length} bespoke assets...`);
  for (const [name, config] of Object.entries(ASSETS)) {
    const svgContent = createSvg(config);
    const svgPath = path.join(ART_DIR, `${name}.svg`);
    const pngPath = path.join(ART_DIR, `${name}.png`);
    const webpPath = path.join(ART_DIR, `${name}.webp`);

    fs.writeFileSync(svgPath, svgContent, 'utf8');

    // Generate high-res 1200x750 PNG for social / Schema.org
    await sharp(Buffer.from(svgContent))
      .resize(1200, 750)
      .png({ quality: 90, compressionLevel: 9 })
      .toFile(pngPath);

    // Generate responsive WebP
    await sharp(Buffer.from(svgContent))
      .resize(1200, 750)
      .webp({ quality: 85 })
      .toFile(webpPath);

    console.log(`✓ Generated ${name} (.svg, .png, .webp)`);
  }
  console.log('All 16 assets generated successfully.');
}

generateAll().catch(err => {
  console.error('Generation failed:', err);
  process.exit(1);
});
