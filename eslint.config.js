const js = require("@eslint/js");

module.exports = [
  {
    ignores: [".next/**", "out/**", "node_modules/**", "public/**", "static/**"],
  },
  {
    files: ["**/*.js", "**/*.jsx"],
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
      globals: {
        React: "readable",
        window: "readable",
        document: "readable",
        console: "readable",
        process: "readable",
        adsbygoogle: "readable",
        module: "readable",
        require: "readable",
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      "no-unused-vars": "warn",
      "no-undef": "warn",
    },
  },
];
