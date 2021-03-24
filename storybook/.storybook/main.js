const path = require('path');

module.exports = {
  stories: [
    '../stories/**/*.stories.mdx',
    '../stories/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-links/register',
    '@storybook/addon-actions/register',
    '@storybook/addon-viewport/register',
    '@storybook/addon-a11y',
  ],
  // https://storybook.js.org/docs/react/configure/webpack#extending-storybooks-webpack-config
  webpackFinal: async config => {
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader'],
      include: path.resolve(__dirname, '../../'),
    });

    return config;
  },
};
