// config-overrides.js
const MergeJsonWebpackPlugin = require('merge-jsons-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

module.exports = {
  webpack: (config, env) => {
    config.plugins = [
      ...config.plugins,
      new MergeJsonWebpackPlugin({
        debug: env !== 'production',
        output: {
          groupBy: [
            {
              pattern: 'public/locales/en/*.json',
              fileName: 'locales/en.json',
            },
            {
              pattern: 'public/locales/vi/*.json',
              fileName: 'locales/vi.json',
            },
          ],
        },
      }),
    ];

    if (env === 'production') {
      config.optimization.minimizer = [
        ...config.optimization.minimizer,
        new TerserWebpackPlugin({
          parallel: true,
          sourceMap: false,
          extractComments: false,
          terserOptions: {
            compress: {
              comparisons: false,
              booleans: true,
              pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn'],
            },
            warnings: false,
            mangle: true,
            output: {
              comments: false,
              ascii_only: true,
            },
          },
        }),
      ];
    }

    return config;
  },
  devServer: (config, env) => {
    config.writeToDisk = true;

    return config;
  },
};
