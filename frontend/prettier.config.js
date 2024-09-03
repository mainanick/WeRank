module.exports = {
  // Standard prettier options
  singleQuote: true,
  semi: false,
  // Since prettier 3.0, manually specifying plugins is required
  plugins: [
    '@ianvs/prettier-plugin-sort-imports',
    'prettier-plugin-packagejson',
    'prettier-plugin-tailwindcss',
  ],
  // This plugin's options
  importOrder: [
    '^react$',
    '^next$',
    '<THIRD_PARTY_MODULES>',
    '^@/core/(.*)$',
    '',
    '^@/lib/(.*)$',
    '',
    '^@/components/(.*)$',
    '',
    '^[./]',
    '^(?!.*[.]css$)[./].*$',
    '.css$',
  ],
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  importOrderTypeScriptVersion: '5.0.0',
}
