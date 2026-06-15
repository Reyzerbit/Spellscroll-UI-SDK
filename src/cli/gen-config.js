#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const CONFIG_FILE = 'spellscroll.config.js';
const dest        = path.join(process.cwd(), CONFIG_FILE);

if (fs.existsSync(dest))
{
    console.log(`[Spellscroll UI SDK] ${CONFIG_FILE} already exists — nothing written.`);
    process.exit(0);
}

const template =
`export default {
    entryPoint:   'src/ui.jsx',
    outfile:      '../build/generated/frontend/ui.js',
    serveOutfile: '../build/serve/ui.js',
    port:         3001,
    servePath:    '/ui.js',
};
`;

fs.writeFileSync(dest, template, 'utf8');
console.log(`[Spellscroll UI SDK] Created ${CONFIG_FILE}`);