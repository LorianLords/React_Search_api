import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import eslintReact from "eslint-plugin-react";
import eslintReactHooks from "eslint-plugin-react-hooks";
import eslintReactRefresh from "eslint-plugin-react-refresh";
import prettierPlugin from "eslint-plugin-prettier";
import eslintConfigPrettier from "eslint-config-prettier";
import reactCompiler from "eslint-plugin-react-compiler";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default tseslint.config(
  {
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      "react-refresh": eslintReactRefresh,
      react: eslintReact,
      "react-hooks": eslintReactHooks,
      prettier: prettierPlugin,
      "react-compiler": reactCompiler,
    },
  },
  {
    ignores: ["dist", "node_modules", "coverage", "eslint.config.js"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
        ...globals.es2020,
      },
      parserOptions: { project: ["tsconfig.app.json", "tsconfig.node.json"] },
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    rules: {
      ...prettierPlugin.configs.recommended.rules,
      ...eslintConfigPrettier.rules,
      "@typescript-eslint/no-explicit-any": "error",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "react-compiler/react-compiler": "error",
      "comma-dangle": ["error", "only-multiline"],
      "react/prop-types": "off",
      "react/display-name": "off",
      "@typescript-eslint/interface-name-prefix": "off",
      "@typescript-eslint/ban-ts-comment": "error",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/no-var-requires": "off",
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
    },
  },
);
