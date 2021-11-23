module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'import', 'prettier'],
  extends: ['airbnb', 'prettier', 'prettier/@typescript-eslint'],
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
  env: { jest: true, browser: true, node: true },
  rules: {
    'no-console': 'off',
    'prettier/prettier': 'error',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        ts: 'never',
      },
    ],
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      // use <root>/tsconfig.json
      typescript: {
        path: ['src'],
        alwaysTryTypes: true,
      },
    },
  },
};
