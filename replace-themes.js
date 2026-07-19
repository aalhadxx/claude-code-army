const fs = require('fs');
const path = 'src/web/public/styles.css';
const css = fs.readFileSync(path, 'utf8').split('\n');

let startIdx = -1;
let endIdx = -1;
for (let i = 0; i < css.length; i++) {
  if (css[i].includes('CATPPUCCIN LATTE (Light Theme)') && startIdx === -1) startIdx = i - 1;
  if (css[i].includes('SESSION LAUNCHER MODAL') && endIdx === -1) endIdx = i - 1;
}
console.log('Theme block lines:', startIdx, 'to', endIdx);

const darkShadows = `
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.2);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.25);
  --shadow-lg: 0 8px 30px rgba(0,0,0,0.3);
  --shadow-xl: 0 16px 50px rgba(0,0,0,0.35);`;

const lightShadows = `
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.06);
  --shadow-lg: 0 8px 30px rgba(0,0,0,0.1), 0 4px 12px rgba(0,0,0,0.08);
  --shadow-xl: 0 16px 50px rgba(0,0,0,0.12), 0 8px 20px rgba(0,0,0,0.1);`;

function themeBlock(name, title, palette, shadows, isLight, accent) {
  const moon = isLight ? 'display: none' : 'display: inline';
  const sun = isLight ? 'display: block !important' : 'display: none';
  return `
/* ═══════════════════════════════════════════════════════════ */
/* ${title.toUpperCase().padEnd(58)} */
/* ═══════════════════════════════════════════════════════════ */

:root[data-theme="${name}"] {${palette}
  /* Semantic overrides */
  --border-subtle: rgba(${accent[0]}, ${accent[1]}, ${accent[2]}, 0.5);${shadows}
}

:root[data-theme="${name}"] .theme-icon-moon { ${moon}; }
:root[data-theme="${name}"] .theme-icon-sun { ${sun}; }

:root[data-theme="${name}"] ::selection {
  background: rgba(${accent[0]}, ${accent[1]}, ${accent[2]}, ${isLight ? '0.2' : '0.25'});
  color: var(--text);
}

:root[data-theme="${name}"] .stat-dot-running {
  background: var(--green);
  box-shadow: 0 0 4px rgba(${accent[0]}, ${accent[1]}, ${accent[2]}, 0.5);
}

:root[data-theme="${name}"] .terminal-pane-empty.drag-over .terminal-container {
  background: rgba(${accent[0]}, ${accent[1]}, ${accent[2]}, 0.05);
}

:root[data-theme="${name}"] .terminal-resize-handle:hover {
  background: rgba(${accent[0]}, ${accent[1]}, ${accent[2]}, 0.4);
}`;
}

const themes = [
  themeBlock('standard', 'Standard (Accessible Dark)',
    `
  --base: #0a0a0f;
  --mantle: #07070a;
  --crust: #050508;
  --surface0: #1a1a24;
  --surface1: #2a2a3a;
  --surface2: #3a3a4e;
  --overlay0: #555570;
  --overlay1: #707090;
  --text: #f0f0f5;
  --subtext0: #c0c0d0;
  --subtext1: #d8d8e5;
  --mauve: #c080ff;
  --blue: #60a0ff;
  --green: #50d080;
  --yellow: #f0c040;
  --red: #ff6060;
  --peach: #ff9850;
  --teal: #40e0c0;
  --sky: #60d0f0;
  --pink: #ff80c0;
  --lavender: #a0a0ff;
  --flamingo: #f0a0a0;
  --rosewater: #f5d0c8;
  --sapphire: #40b0f0;`, darkShadows, false, [192,128,255]),

  themeBlock('brat', 'Brat (Lime Green Party)',
    `
  --base: #0a0f00;
  --mantle: #080c00;
  --crust: #050800;
  --surface0: #1a2408;
  --surface1: #2a3a10;
  --surface2: #3a5018;
  --overlay0: #506820;
  --overlay1: #688028;
  --text: #e8f5d0;
  --subtext0: #c0e0a0;
  --subtext1: #d4e8b8;
  --mauve: #a0e000;
  --blue: #80c0ff;
  --green: #b8e820;
  --yellow: #f0e000;
  --red: #ff5050;
  --peach: #f0a840;
  --teal: #60f0b0;
  --sky: #80e0ff;
  --pink: #f0a0e0;
  --lavender: #c0a0ff;
  --flamingo: #f0c0a0;
  --rosewater: #f5e0d0;
  --sapphire: #60d0ff;`, darkShadows, false, [184,232,32]),

  themeBlock('goblin-mode', 'Goblin Mode (Mossy Earth)',
    `
  --base: #0f140a;
  --mantle: #0c1008;
  --crust: #080c04;
  --surface0: #1c2410;
  --surface1: #2a3618;
  --surface2: #3a4820;
  --overlay0: #506028;
  --overlay1: #687838;
  --text: #d8e8c0;
  --subtext0: #b0c890;
  --subtext1: #c8d8a8;
  --mauve: #c880c0;
  --blue: #7098b0;
  --green: #78c860;
  --yellow: #d8c060;
  --red: #c86050;
  --peach: #e0a060;
  --teal: #50b898;
  --sky: #80c0c0;
  --pink: #d080a0;
  --lavender: #a090c0;
  --flamingo: #d8a0a0;
  --rosewater: #e8c8c0;
  --sapphire: #60a8c0;`, darkShadows, false, [120,200,96]),

  themeBlock('vaporwave', 'Vaporwave (Neon Sunset)',
    `
  --base: #0d001a;
  --mantle: #0a0014;
  --crust: #06000e;
  --surface0: #1e0a3a;
  --surface1: #2e1050;
  --surface2: #401868;
  --overlay0: #582080;
  --overlay1: #702898;
  --text: #f0e0ff;
  --subtext0: #d0b0e8;
  --subtext1: #e0c8f0;
  --mauve: #ff80ff;
  --blue: #00e0ff;
  --green: #00ffaa;
  --yellow: #ffee00;
  --red: #ff3366;
  --peach: #ff9966;
  --teal: #00ffcc;
  --sky: #66eeff;
  --pink: #ff66cc;
  --lavender: #cc88ff;
  --flamingo: #ffaaa0;
  --rosewater: #ffd0e0;
  --sapphire: #44ccff;`, darkShadows, false, [255,128,255]),

  themeBlock('cyber-sigilism', 'Cyber Sigilism (Chrome Tech)',
    `
  --base: #0a0a0a;
  --mantle: #080808;
  --crust: #050505;
  --surface0: #1a1a1a;
  --surface1: #2a2a2a;
  --surface2: #3a3a3a;
  --overlay0: #505050;
  --overlay1: #707070;
  --text: #e8e8e8;
  --subtext0: #b0b0b0;
  --subtext1: #d0d0d0;
  --mauve: #c0c0c0;
  --blue: #8080ff;
  --green: #00ff80;
  --yellow: #e8e000;
  --red: #ff4040;
  --peach: #f0a060;
  --teal: #00e0c0;
  --sky: #80c0ff;
  --pink: #ff80c0;
  --lavender: #a0a0ff;
  --flamingo: #e8c0c0;
  --rosewater: #f0e0e0;
  --sapphire: #60b0ff;`, darkShadows, false, [192,192,192]),

  themeBlock('rat', 'Rat (Subway Grit)',
    `
  --base: #1a1a1a;
  --mantle: #151515;
  --crust: #101010;
  --surface0: #2a2a2a;
  --surface1: #3a3a3a;
  --surface2: #4a4a4a;
  --overlay0: #606060;
  --overlay1: #808080;
  --text: #d0d0d0;
  --subtext0: #a0a0a0;
  --subtext1: #b8b8b8;
  --mauve: #a0a0a0;
  --blue: #80a0c0;
  --green: #88c000;
  --yellow: #c8b800;
  --red: #c85050;
  --peach: #c8a060;
  --teal: #60b8a0;
  --sky: #80c0d0;
  --pink: #c080a0;
  --lavender: #9090c0;
  --flamingo: #c8a0a0;
  --rosewater: #e0c8c0;
  --sapphire: #60a0c0;`, darkShadows, false, [160,160,160]),

  themeBlock('clean-girl', 'Clean Girl (Beige Minimal)',
    `
  --base: #f5f0e8;
  --mantle: #ebe5dc;
  --crust: #e0d9ce;
  --surface0: #ddd5c8;
  --surface1: #d0c8b8;
  --surface2: #c4bba8;
  --overlay0: #a89e8e;
  --overlay1: #8e8578;
  --text: #2a2520;
  --subtext0: #5a5048;
  --subtext1: #3a3530;
  --mauve: #c8a8b8;
  --blue: #7088a8;
  --green: #889c80;
  --yellow: #d4b860;
  --red: #c06060;
  --peach: #d8a880;
  --teal: #609890;
  --sky: #80a8b8;
  --pink: #d8a0b0;
  --lavender: #a8a0b8;
  --flamingo: #d8c0b8;
  --rosewater: #f0d8d0;
  --sapphire: #6098b0;`, lightShadows, true, [200,168,184]),

  themeBlock('cottagecore', 'Cottagecore (Sage Dream)',
    `
  --base: #f0f5e8;
  --mantle: #e4ead8;
  --crust: #d8e0c8;
  --surface0: #d0d8c0;
  --surface1: #c4ccb0;
  --surface2: #b8c0a0;
  --overlay0: #98a080;
  --overlay1: #808868;
  --text: #2a3020;
  --subtext0: #4a5040;
  --subtext1: #3a4030;
  --mauve: #b090a0;
  --blue: #8098b0;
  --green: #78a860;
  --yellow: #d4c860;
  --red: #c06060;
  --peach: #d8a880;
  --teal: #508878;
  --sky: #80a8c0;
  --pink: #d8a0b0;
  --lavender: #a8a0c0;
  --flamingo: #d8c0c0;
  --rosewater: #f0d8d0;
  --sapphire: #6098b0;`, lightShadows, true, [120,168,96]),

  themeBlock('frutiger-aero', 'Frutiger Aero (Glossy Glass)',
    `
  --base: #e8f0f8;
  --mantle: #dce8f4;
  --crust: #d0e0f0;
  --surface0: #c8dcf0;
  --surface1: #b8d0e8;
  --surface2: #a8c4e0;
  --overlay0: #88a8c8;
  --overlay1: #7090b0;
  --text: #1a2030;
  --subtext0: #3a5068;
  --subtext1: #2a3850;
  --mauve: #8098c0;
  --blue: #5090d0;
  --green: #60b080;
  --yellow: #e0c840;
  --red: #d06060;
  --peach: #e0a060;
  --teal: #40b0a0;
  --sky: #60a8e0;
  --pink: #d890b0;
  --lavender: #9098d0;
  --flamingo: #e0b8b0;
  --rosewater: #f0d8d0;
  --sapphire: #40a0d0;`, lightShadows, true, [80,144,208]),
];

const newContent = themes.join('\n') + '\n';

const before = css.slice(0, startIdx).join('\n');
const after = css.slice(endIdx).join('\n');

fs.writeFileSync(path, before + newContent + after);
console.log('Replaced themes in', path);
console.log('Old lines:', startIdx, 'to', endIdx);
console.log('New theme count:', themes.length);
