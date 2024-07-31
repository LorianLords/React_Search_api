import js from '@eslint/js';
import globals from 'globals';
//import tseslint from 'typescript-eslint';
import eslintReact from 'eslint-plugin-react';
import eslintReactHooks from 'eslint-plugin-react-hooks';
import eslintReactRefresh from 'eslint-plugin-react-refresh';
import prettierPlugin from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
    {
        plugins: {

            'react-refresh': eslintReactRefresh,
            react: eslintReact,
            'react-hooks': eslintReactHooks,
            prettier: prettierPlugin

        }
    },
    {
        ignores: ['node_modules', 'dist']
    },
    js.configs.recommended,

    {
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.browser,
                    ...globals.es2020
            },
            parserOptions: eslintReact.configs.recommended.parserOptions,
        }
    },
    {
        files: ['**/*.{ts,tsx}'],
        rules: {
            ...eslintConfigPrettier.rules,
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true },
            ],
        }
    }
];