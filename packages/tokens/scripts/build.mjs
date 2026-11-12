import StyleDictionary from 'style-dictionary';

const PREFIX = 'rax';

/**
 * Only the kebab-case name transform is used on purpose.
 * The default "css" transform group includes a color transform
 * that can convert or break oklch() values.
 */
const transforms = ['name/kebab'];

const primitives = new StyleDictionary({
    source: ['src/primitive/**/*.json'],
    platforms: {
        css: {
            prefix: PREFIX,
            transforms,
            buildPath: 'dist/css/',
            files: [
                {
                    destination: 'primitives.css',
                    format: 'css/variables',
                    options: { selector: ':root' },
                },
            ],
        },
    },
});

await primitives.cleanAllPlatforms();
await primitives.buildAllPlatforms();
