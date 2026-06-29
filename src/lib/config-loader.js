import path from 'path';
import fs from 'fs';
import { pathToFileURL } from 'url';

const DEFAULTS = {
    entryPoint:   'src/main.jsx',
    outfile:      'dist/main.js',
    serveOutfile: 'dist/serve/main.js',
    port:         3001,
    servePath:    '/main.js',
};

export async function loadConfig()
{
    const cwd        = process.cwd();
    let   userConfig = {};

    const configFile = path.join(cwd, 'spellscroll.config.js');
    const pkgFile    = path.join(cwd, 'package.json');

    if (fs.existsSync(configFile))
    {
        const mod  = await import(pathToFileURL(configFile).href);
        userConfig = mod.default ?? mod;
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