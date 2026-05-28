import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const DIR = 'dist/preview';
const META = '<meta name="robots" content="noindex, nofollow, noarchive, nosnippet" />';

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) {
      walk(p);
    } else if (p.endsWith('.html')) {
      let html = readFileSync(p, 'utf-8');
      if (!html.includes('name="robots"')) {
        html = html.replace('</head>', `    ${META}\n</head>`);
        writeFileSync(p, html);
      }
    }
  }
}

try {
  walk(DIR);
  console.log(`Injected noindex meta into HTML files under ${DIR}/`);
} catch (e) {
  if (e.code === 'ENOENT') {
    console.log(`${DIR}/ does not exist, skipping.`);
  } else {
    throw e;
  }
}
