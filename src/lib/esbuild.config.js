import fs from 'fs';

function cssInjectPlugin()
{
    return {
        name: 'css-inject',
        setup(build)
        {
            build.onLoad({ filter: /\.css$/ }, async (args) =>
            {
                const css = await fs.promises.readFile(args.path, 'utf8');
                return {
                    contents: `
const __style = document.createElement('style');
__style.textContent = ${JSON.stringify(css)};
document.head.appendChild(__style);`,
                    loader: 'js',
                };
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
        plugins: [cssInjectPlugin()],
    };
}