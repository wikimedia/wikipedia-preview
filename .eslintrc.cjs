module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: ['eslint:recommended', 'wikimedia/client', 'plugin:cypress/recommended', 'plugin:storybook/recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    require: true,
    module: true
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  ignorePatterns: ["storybook-static", "dist", "vite.config.js", "src/i18n.js", "src/preview.js"],
  rules: {
    semi: [2, 'never'],
    'no-nonoctal-decimal-escape': 'off',
    'no-only-tests/no-only-tests': 'error',
    'cypress/no-unnecessary-waiting': 'warn',
    'es-x/no-rest-spread-properties': 'off',
    'es-x/no-export-ns-from': 'off',
    'es-x/no-regexp-named-capture-groups': 'off'
  },
  plugins: [
    'cypress',
    'no-only-tests',
    'unicorn'
  ]
}
