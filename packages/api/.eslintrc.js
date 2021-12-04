module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'import', 'prettier'],
  extends: ['airbnb', 'prettier'],
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
  env: { jest: true, browser: true, node: true },
  rules: {
    'no-console': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        ts: 'never',
      },
    ],
    'import/no-unresolved': 'off',
    'arrow-body-style': 'warn',
    'max-len': 'warn',
    indent: 'off',
    'prettier/prettier': 'error',
    'consistent-return': 'off',
    '@typescript-eslint/indent': ['error', 2],
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
