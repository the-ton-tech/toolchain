const { js, tsEslint, tsParser, importPlugin, prettierPlugin, jestPlugin, globals } = require('./eslint.js');

const nodeGlobals = globals.node;

module.exports = [
    { ignores: ['**/*-auto.*', 'dist/**', '**/dist/**', 'build/**', '**/build/**', 'coverage/**', '**/coverage/**'] },
    {
        languageOptions: {
            globals: nodeGlobals,
        },
    },
    js.configs.recommended,
    {
        files: ['**/*.{ts,tsx,mts}'],
        languageOptions: {
            globals: nodeGlobals,
            parser: tsParser,
            sourceType: 'module',
        },
        plugins: {
            '@typescript-eslint': tsEslint,
            prettier: prettierPlugin,
            import: importPlugin,
        },
        rules: {
            ...tsEslint.configs.recommended.rules,
            '@typescript-eslint/no-unused-vars': [
                'warn',
                {
                    args: 'all',
                    argsIgnorePattern: '^_',
                    caughtErrors: 'all',
                    caughtErrorsIgnorePattern: '^_',
                    destructuredArrayIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    ignoreRestSiblings: true,
                },
            ],
            'no-console': 'warn',
            'prettier/prettier': 'error',
            'import/order': [
                'warn',
                {
                    groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
                    'newlines-between': 'always',
                    alphabetize: {
                        order: 'asc',
                        caseInsensitive: true,
                    },
                },
            ],
            '@typescript-eslint/no-explicit-any': 'error',
            'comma-dangle': ['error', 'always-multiline'],
            'arrow-parens': ['error', 'always'],
            'no-redeclare': 'off',
            '@typescript-eslint/no-redeclare': ['error'],
        },
    },
    {
        files: ['**/*.{test,spec}.ts'],
        ...jestPlugin.configs['flat/recommended'],
        rules: {
            'no-undef': 'off',
        },
    },
    {
        plugins: {
            import: importPlugin,
            prettier: prettierPlugin,
        },
        rules: {
            'no-console': 'warn',
            'prettier/prettier': 'error',
            'import/order': [
                2,
                {
                    groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
                    'newlines-between': 'always',
                },
            ],
            'arrow-parens': ['error', 'always'],
        },
    },
];
