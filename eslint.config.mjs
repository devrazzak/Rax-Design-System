import js from '@eslint/js';
import prettier from 'eslint-config-prettier/flat';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
    // Files and folders that should never be linted
    globalIgnores(['**/node_modules', '**/dist', '**/storybook-static', '**/coverage', '**/.next']),

    // Base JavaScript rules for every JS/TS file
    js.configs.recommended,

    // TypeScript files: type-aware linting
    {
        files: ['**/*.{ts,tsx}'],
        extends: [tseslint.configs.strictTypeChecked, tseslint.configs.stylisticTypeChecked],
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
        rules: {
            '@typescript-eslint/consistent-type-imports': ['error', { fixStyle: 'separate-type-imports' }],
            '@typescript-eslint/no-explicit-any': 'error',
            '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
        },
    },

    // React component files
    {
        files: ['**/*.{jsx,tsx}'],
        extends: [react.configs.flat.recommended, react.configs.flat['jsx-runtime'], jsxA11y.flatConfigs.recommended],
        plugins: { 'react-hooks': reactHooks },
        settings: { react: { version: 'detect' } },
        languageOptions: { globals: globals.browser },
        rules: {
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',
            // TypeScript already validates props
            'react/prop-types': 'off',
        },
    },

    // Config and build scripts run in Node
    {
        files: ['**/*.{js,mjs,cjs}'],
        languageOptions: { globals: globals.node },
    },

    // Must stay last: disables rules that conflict with Prettier
    prettier,
]);
