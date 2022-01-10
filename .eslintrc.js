module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'newline-per-chained-call': [ "error",
      {
        "ignoreChainWithDepth": 2
      }
    ],
    semi: [
      "error",
      "never",
      { "beforeStatementContinuationChars": "always"}
    ],
    "comma-dangle": ["error", "always-multiline"],
    "@typescript-eslint/quotes": [
      "error",
      "single",
      {
        "avoidEscape": true,
        "allowTemplateLiterals": true
      }
    ],
    "@typescript-eslint/no-unused-vars": [ "warn",
      {
        "vars": "all",
        "args": "after-used",
        "ignoreRestSiblings": true // var { foo, ...coords } = data; https://eslint.org/docs/rules/no-unused-vars#ignorerestsiblings
      }
    ],
  },
};
