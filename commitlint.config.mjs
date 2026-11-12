/**
 * Conventional Commits: <type>(<scope>): <subject>
 * Example: feat(ui): add button component
 */
export default {
    extends: ['@commitlint/config-conventional'],
    rules: {
        // Scope is optional, but if used it must be one of these
        'scope-enum': [2, 'always', ['ui', 'tokens', 'playground', 'repo', 'deps', 'ci', 'docs']],
    },
};
