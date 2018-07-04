module.exports = {
    parserOptions: {
        ecmaVersion: 2017,
        sourceType: 'module',
    },
    env: {
        node: true,
        browser: true,
    },
    extends: [
        '@fiverr/eslint-config-fiverr/rules/base',
        '@fiverr/eslint-config-fiverr/rules/es6',
    ],
    plugins: [],
    rules: {
        'no-console': 0,
        'comma-dangle': ['error', 'always-multiline'],
    },
    overrides: [
        {
            files: [ '**/spec.js' ],
            env: {
                mocha: true,
            },
            globals: {
                expect: true,
                assert: true,
                sleep: true,
                onload: true,
            },
            rules: {
                'no-empty-function': 0,
            }
        }
    ]
}
