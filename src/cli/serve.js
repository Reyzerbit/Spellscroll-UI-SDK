#!/usr/bin/env node
'use strict';
const esbuild         = require('esbuild');
const http            = require('http');
const fs              = require('fs');
const path            = require('path');
const { loadConfig }  = require('../lib/config-loader.js');
const { buildConfig } = require('../lib/esbuild.config.js');

async function main()
{
    const config    = loadConfig();
    const outfile   = config.serveOutfile;
    const port      = config.port;
    const servePath = config.servePath;

    fs.mkdirSync(path.dirname(outfile), { recursive: true });

    const ctx = await esbuild.context(buildConfig(config, outfile));
    await ctx.watch();
    console.log('[Spellscroll UI SDK] Watching for changes...');

    http.createServer((req, res) =>
    {
        res.setHeader('Access-Control-Allow-Origin',  '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

        if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }

        if (req.url === servePath)
        {
            try
            {
                res.setHeader('Content-Type', 'application/javascript');
                res.writeHead(200);
                res.end(fs.readFileSync(outfile));
            }
            catch { res.writeHead(503); res.end('// build not ready — save a file to trigger a rebuild'); }
        }
        else { res.writeHead(404); res.end(); }

    }).listen(port, () =>
        console.log(`[Spellscroll UI SDK] Dev server → http://localhost:${port}${servePath}`)
    );
}

main().catch(console.error);
