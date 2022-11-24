module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ["plugin:react/recommended", "standard"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module"
  },
  plugins: ["react"],
  rules: {
    quotes: "off",
    eqeqeq: "error",
    "no-console": 0,
    "react/jsx-filename-extension": [0],
    "react/react-in-jsx-scope": "off",
    "react/forbid-prop-types": 0,
    camelcase: 0
  }
}
