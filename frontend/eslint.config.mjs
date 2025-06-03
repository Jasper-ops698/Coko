import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
    extends: [
      "eslint:recommended", 
      "plugin:react/recommended",
    ],
    plugins: [
      "react", // Include the React plugin
    ],
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 2021,
      sourceType: "module",
    },
    rules: {
      // Custom rules can be specified here
      "no-console": "warn", 
      "react/prop-types": "off", 
    },
    settings: {
      react: {
        version: "detect", 
      },
    },
  },
  // Including pluginJs and pluginReact in the configuration
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
];
