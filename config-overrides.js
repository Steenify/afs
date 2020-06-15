// config-overrides.js
const { useBabelRc, override, addWebpackPlugin } = require('customize-cra');
const MergeJsonWebpackPlugin = require('merge-jsons-webpack-plugin');

module.exports = override(
  useBabelRc(),
  addWebpackPlugin(
    new MergeJsonWebpackPlugin({
      output: {
        groupBy: [
          {
            pattern: 'public/locales/en/*.json',
            fileName: '../public/locales/en.json',
          },
          {
            pattern: 'public/locales/vi/*.json',
            fileName: '../public/locales/vi.json',
          },
        ],
      },
    }),
  ),
);
