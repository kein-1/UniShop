module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: "airbnb-base",

  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    quotes: "off",
    eqeqeq: "error",
    "no-console": "off",
    "prefer-destructuring": [
      "error",
      {
        array: false,
        object: false,
      },
    ],
  },
};
