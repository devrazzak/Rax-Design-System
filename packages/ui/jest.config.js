/**
 * Jest config for @rax/ui.
 * Plain JS (not TS) so Jest can load it without ts-node.
 * @type {import('jest').Config}
 */
const config = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/test/setup.ts'],
    transform: {
        '^.+\\.(t|j)sx?$': [
            '@swc/jest',
            {
                jsc: {
                    parser: { syntax: 'typescript', tsx: true },
                    transform: { react: { runtime: 'automatic' } },
                },
            },
        ],
    },
    // Mirrors the "@/*" alias from tsconfig.json and vite.config.ts
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
    collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.stories.tsx', '!src/index.ts'],
};

export default config;
