module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: [
    'standard',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    loadTarget: 'readonly'
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018
  },
  plugins: ['prettier', '@typescript-eslint'],
  rules: {
    'space-before-function-paren': 0,
    indent: 0,
    '@typescript-eslint/member-delimiter-style': 0
  },
  overrides: [
    {
      files: [
        '**/*.spec.js',
        '**/*.spec.jsx',
        '**/*.spec.ts',
        '**/*.spec.tsx',
        '**/*.test.js',
        '**/*.test.jsx',
        '**/*.test.ts',
        '**/*.test.tsx'
      ],
      env: {
        jest: true
      }
    }
  ]
}
