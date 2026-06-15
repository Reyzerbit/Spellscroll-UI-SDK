import path from 'path';
import fs from 'fs';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

const DEFAULTS = {
    entryPoint:   'src/ui.jsx',
    outfile:      'dist/ui.js',
    serveOutfile: 'dist/serve/ui.js',
    port:         3001,
    servePath:    '/ui.js',
};

export function loadConfig()
{
    const cwd        = process.cwd();
    let   userConfig = {};

    const configFile = path.join(cwd, 'spellscroll.config.js');
    const pkgFile    = path.join(cwd, 'package.json');

    if (fs.existsSync(configFile))
    {
        userConfig = require(configFile);
    }
    else if (fs.existsSync(pkgFile))
    {
        const pkg = JSON.parse(fs.readFileSync(pkgFile, 'utf8'));
        userConfig = pkg.spellscroll || {};
    }

    const merged = { ...DEFAULTS, ...userConfig };

    return {
        ...merged,
        entryPoint:   path.resolve(cwd, merged.entryPoint),
        outfile:      path.resolve(cwd, merged.outfile),
        serveOutfile: path.resolve(cwd, merged.serveOutfile),
    };
}