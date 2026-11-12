import { resolve } from 'node:path';

import { defineConfig, mergeConfig } from 'vite';
import dts from 'vite-plugin-dts';

import packageJson from './package.json' with { type: 'json' };
import baseConfig from './vite.config.ts';

/**
 * Dependencies and peer dependencies are never bundled.
 * Consumers install them, which avoids duplicate React copies and lets them dedupe versions.
 */
const externalPackages = [...Object.keys(packageJson.dependencies), ...Object.keys(packageJson.peerDependencies)];

function isExternal(id: string): boolean {
    return externalPackages.some(pkg => id === pkg || id.startsWith(`${pkg}/`));
}

export default mergeConfig(
    baseConfig,
    defineConfig({
        plugins: [
            dts({
                tsconfigPath: './tsconfig.build.json',
                entryRoot: 'src',
                // "@/..." aliases are rewritten to relative paths in the generated .d.ts files
            }),
        ],
        build: {
            lib: {
                entry: resolve(import.meta.dirname, 'src/index.ts'),
                formats: ['es'],
            },
            outDir: 'dist',
            emptyOutDir: true,
            sourcemap: true,
            rollupOptions: {
                external: isExternal,
                output: {
                    // One output file per source file: better tree-shaking and keeps "use client" per module
                    preserveModules: true,
                    preserveModulesRoot: 'src',
                    entryFileNames: '[name].js',
                },
            },
        },
    }),
);
