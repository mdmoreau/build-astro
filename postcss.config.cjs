const globalData = require('@csstools/postcss-global-data');
const presetEnv = require('postcss-preset-env');

module.exports = {
  plugins: [
    globalData({
      files: [
        'src/styles/props.css',
      ],
    }),
    presetEnv({
      stage: false,
      features: {
        'custom-media-queries': true,
        'media-query-ranges': true,
        'nesting-rules': true,
      },
    }),
  ],
};
