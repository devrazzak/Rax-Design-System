import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';

import StyleDictionary from 'style-dictionary';

const PREFIX = 'rax';
const DIST = 'dist';
const CSS_DIR = `${DIST}/css/`;

/**
 * Only the kebab-case name transform is used on purpose.
 * The default "css" transform group includes a color transform
 * that can convert or break oklch() values.
 */
const transforms = ['name/kebab'];

/**
 * The first theme is the reference: every other theme must define exactly the same tokens.
 * To add a theme: create src/semantic/<name>.json and add an entry here.
 */
const themes = [
    { name: 'light', selector: ':root, [data-theme="light"]' },
    { name: 'dark', selector: '.dark, [data-theme="dark"]' },
];

/** Collect every token path (e.g. "color.primary") from a DTCG JSON file. */
async function readTokenPaths(file) {
    const json = JSON.parse(await readFile(file, 'utf8'));
    const paths = [];

    const walk = (node, path) => {
        if (node && typeof node === 'object' && '$value' in node) {
            paths.push(path.join('.'));
            return;
        }
        for (const [key, child] of Object.entries(node)) {
            walk(child, [...path, key]);
        }
    };

    walk(json, []);
    return paths;
}

/** Fail the build if any theme is missing a token or defines an extra one. */
async function assertThemesMatch() {
    const [reference, ...others] = themes;
    const referencePaths = await readTokenPaths(`src/semantic/${reference.name}.json`);

    for (const theme of others) {
        const paths = await readTokenPaths(`src/semantic/${theme.name}.json`);
        const missing = referencePaths.filter(path => !paths.includes(path));
        const extra = paths.filter(path => !referencePaths.includes(path));

        if (missing.length > 0 || extra.length > 0) {
            throw new Error(
                `Theme "${theme.name}" does not match "${reference.name}".\n` +
                    `  Missing: ${missing.join(', ') || 'none'}\n` +
                    `  Extra:   ${extra.join(', ') || 'none'}`,
            );
        }
    }
}

async function buildPrimitives() {
    const sd = new StyleDictionary({
        source: ['src/primitive/**/*.json'],
        platforms: {
            css: {
                prefix: PREFIX,
                transforms,
                buildPath: CSS_DIR,
                files: [{ destination: 'primitives.css', format: 'css/variables', options: { selector: ':root' } }],
            },
        },
    });

    await sd.buildAllPlatforms();
}

async function buildTheme({ name, selector }) {
    const sd = new StyleDictionary({
        // Primitives are included so references can resolve, then filtered out of the output.
        source: ['src/primitive/**/*.json', `src/semantic/${name}.json`],
        // Referencing filtered-out primitives is intentional (they live in primitives.css),
        // so this warning is expected. Broken references still throw an error.
        log: { warnings: 'disabled' },
        platforms: {
            css: {
                prefix: PREFIX,
                transforms,
                buildPath: CSS_DIR,
                files: [
                    {
                        destination: `theme-${name}.css`,
                        format: 'css/variables',
                        filter: token => token.filePath.includes('/semantic/'),
                        options: { selector, outputReferences: true },
                    },
                ],
            },
        },
    });

    await sd.buildAllPlatforms();
}

/** Single entry file so consumers only need one import. Order matters: later files win. */
async function buildEntry() {
    const files = ['primitives', ...themes.map(theme => `theme-${theme.name}`)];
    const content = files.map(file => `@import './css/${file}.css';`).join('\n');

    await writeFile(`${DIST}/tokens.css`, `${content}\n`);
}

await assertThemesMatch();
await rm(DIST, { recursive: true, force: true });
await mkdir(DIST, { recursive: true });
await buildPrimitives();
await Promise.all(themes.map(buildTheme));
await buildEntry();

console.log(`✔ Built tokens: primitives + ${themes.map(theme => theme.name).join(', ')}`);
