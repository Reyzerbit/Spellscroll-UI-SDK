import fs from 'fs';
import * as sass from 'sass';

function cssInjectContents(css)
{
    return `const __style = document.createElement('style');
__style.textContent = ${JSON.stringify(css)};
document.head.appendChild(__style);`;
}

function cssInjectPlugin()
{
    return {
        name: 'css-inject',
        setup(build)
        {
            build.onLoad({ filter: /\.css$/ }, async (args) =>
            {
                const css = await fs.promises.readFile(args.path, 'utf8');
                return { contents: cssInjectContents(css), loader: 'js' };
            });
        },
    };
}

function scssInjectPlugin()
{
    return {
        name: 'scss-inject',
        setup(build)
        {
            build.onLoad({ filter: /\.scss$/ }, (args) =>
            {
                const result = sass.compile(args.path);
                return { contents: cssInjectContents(result.css), loader: 'js' };
            });
        },
    };
}

export function buildConfig(config, outfile)
{
    return {
        entryPoints: [config.entryPoint],
        bundle:      true,
        jsx:         'automatic',
        // React is always external — the host app provides it at runtime.
        // This is intentional and must not be changed to avoid duplicate/conflicting React instances.
        external:    ['react', 'react/jsx-runtime'],
        format:      'esm',
        outfile,
        loader: {
            '.png':  'dataurl',
            '.jpg':  'dataurl',
            '.jpeg': 'dataurl',
            '.gif':  'dataurl',
            '.svg':  'dataurl',
            '.webp': 'dataurl',
            '.ttf':  'dataurl',
            '.woff': 'dataurl',
            '.woff2':'dataurl',
        },
        plugins: [scssInjectPlugin(), cssInjectPlugin()],
    };
}