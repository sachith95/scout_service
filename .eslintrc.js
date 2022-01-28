module.exports = {
  parser: "babel-eslint",
  parserOptions: {
    sourceType: "module",
    allowImportExportEverywhere: true
  },
  extends: "airbnb-base",
  rules: {
    "eol-last": 0,
    "class-methods-use-this": 0,
    semi: ["error", "never"],
    "no-underscore-dangle": 0,
    "comma-dangle": ["error", "never"],
    "max-len": ["error", { code: 180 }, { "allowTernary": true }],
    "template-curly-spacing": "off",
    indent: "off"
  }
};
