const globalData = require('@csstools/postcss-global-data');
const presetEnv = require('postcss-preset-env');

module.exports = {
  plugins: [
    globalData({
      files: [
        'src/styles/inject.css',
      ],
    }),
    presetEnv({
      features: {
        'custom-selectors': true,
        'nesting-rules': true,
      },
    }),
  ],
};
