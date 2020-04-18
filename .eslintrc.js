module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'class-methods-use-this': 'off',
    'no-param-reassign': 'off',
    'no-underscore-dangle': 'off',
    'import/no-cycle': 'off',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
