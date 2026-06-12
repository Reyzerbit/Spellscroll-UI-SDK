#!/usr/bin/env node
'use strict';
const esbuild             = require('esbuild');
const fs                  = require('fs');
const path                = require('path');
const { loadConfig }      = require('../lib/config-loader.js');
const { buildConfig }     = require('../lib/esbuild.config.js');

const config  = loadConfig();
const outfile = config.outfile;

fs.mkdirSync(path.dirname(outfile), { recursive: true });

esbuild.build(buildConfig(config, outfile))
    .then(() => console.log('[Spellscroll UI SDK] Build complete →', outfile))
    .catch((e) => { console.error(e); process.exit(1); });
