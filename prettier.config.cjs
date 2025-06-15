/** @type {import("prettier").Config} */

module.exports = {
  semi: true,
  singleQuote: true,
  printWidth: 100,
  tabWidth: 2,
  trailingComma: 'all',
  bracketSpacing: true,
  arrowParens: 'always',
  endOfLine: 'lf',

  quoteProps: 'as-needed',
  jsxSingleQuote: false,
  htmlWhitespaceSensitivity: 'ignore',
  vueIndentScriptAndStyle: false,
  embeddedLanguageFormatting: 'auto',
  proseWrap: 'preserve',
  insertPragma: false,
  htmlWhitespaceSensitivity: 'css',

  plugins: [],
  overrides: [
    {
      files: ['*.json'],
      options: {
        tabWidth: 2,
        printWidth: 100,
        singleQuote: false,
        trailingComma: 'none',
      },
    },
    {
      files: ['*.md'],
      options: {
        proseWrap: 'always',
        printWidth: 100,
      },
    },
  ],
};
