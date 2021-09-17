module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint",
  ],
  parserOptions: {
    ecmaVersion: 2021,
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production",
    "no-debugger": process.env.NODE_ENV === "production",
  },
};
