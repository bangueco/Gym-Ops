import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,ts}"]},
  {languageOptions: { globals: {...globals.browser, ...globals.node} }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      "semi": ["error", "always"],
      "indent": ["error", 2],
      "camelcase": ["error", { "properties": "always" }],
      "quotes": ["error", "double"],
      "brace-style": ["error", "1tbs"],
      "no-unused-vars": "warn",
    }
  }
];