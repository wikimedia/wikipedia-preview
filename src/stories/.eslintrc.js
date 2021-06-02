module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: [
    'eslint:recommended',
    'wikimedia/client'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    require: true
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  rules: {
    semi: [2, "never"],
    'one-var': [2, "never"],
    'no-nonoctal-decimal-escape': 'off'
  }
}
