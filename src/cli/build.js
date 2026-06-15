#!/usr/bin/env node
import esbuild from 'esbuild';
import fs from 'fs';
import path from 'path';
import { loadConfig } from '../lib/config-loader.js';
import { buildConfig } from '../lib/esbuild.config.js';

const config  = loadConfig();
const outfile = config.outfile;

fs.mkdirSync(path.dirname(outfile), { recursive: true });

esbuild.build(buildConfig(config, outfile))
    .then(() => console.log('[Spellscroll UI SDK] Build complete →', outfile))
    .catch((e) => { console.error(e); process.exit(1); });