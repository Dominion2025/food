module.exports = {
  env: {
    es6: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  extends: ["eslint:recommended", "google"],
  rules: {
    "no-restricted-globals": ["error", "name", "length"],
    "prefer-arrow-callback": "error",
    "quotes": ["error", "double", { allowTemplateLiterals: true }],

    // 🚫 Disable or relax strict formatting rules
    "no-tabs": "off", // allow tabs
    "indent": "off", // turn off strict indentation checks
    "object-curly-spacing": "off", // allow spacing in object literals
    "no-unused-vars": "warn", // don't error on unused variables, just warn
  },
  overrides: [
    {
      files: ["**/*.spec.*"],
      env: {
        mocha: true,
      },
      rules: {},
    },
  ],
  globals: {},
};
