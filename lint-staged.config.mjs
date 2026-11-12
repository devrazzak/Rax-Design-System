/**
 * Runs only on staged files, so commits stay fast even as the repo grows.
 * Order matters: ESLint fixes code issues first, Prettier formats last.
 */
export default {
    '*.{ts,tsx,js,mjs,cjs}': ['eslint --fix --max-warnings=0', 'prettier --write'],
    '*.{json,css,md,yml,yaml}': ['prettier --write'],
};
