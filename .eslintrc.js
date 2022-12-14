module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["airbnb", "airbnb-typescript", "plugin:react-hooks/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json"],
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "import/no-extraneous-dependencies": "off",
    "react/react-in-jsx-scope": "off",
    "react/function-component-definition": "off",
    "no-plusplus": "off",
    "jsx-a11y/label-has-associated-control": "off"
  },
};
