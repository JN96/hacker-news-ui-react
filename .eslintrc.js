module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: [
    'react'
  ],
  rules: {
    'object-curly-spacing': ['error', 'never', {arraysInObjects: false}],
    'space-before-function-paren': ['error', {anonymous: 'never', named: 'never', asyncArrow: 'always'}],
    'padded-blocks': ['error', 'never'],
    'comma-dangle': ['error', 'never'],
    // 'react/prop-types': 0,
    indent: ['error', 2, {'SwitchCase': 1}],
    semi: ['error', 'always']
  }
};
