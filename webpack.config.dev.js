const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const defaultConfig = require('./webpack.config');

const PORT = 3000;

module.exports = Object.assign({}, defaultConfig, {
  devServer: {
    contentBase: './dist',
    host: 'localhost',
    inline: true,
    lazy: false,
    noInfo: false,
    quiet: false,
    port: PORT,
    stats: {
      colors: true,
      progress: true
    }
  },

  entry: [path.resolve(__dirname, 'DEV_ONLY', 'App.js')],

  externals: undefined,

  module: Object.assign({}, defaultConfig.module, {
    rules: defaultConfig.module.rules.map((rule) => {
      return rule.loader === 'babel-loader'
        ? Object.assign({}, rule, {
            options: {
              presets: ['react']
            }
          })
        : rule;
    })
  }),

  node: {
    fs: 'empty'
  },

  plugins: [...defaultConfig.plugins, new HtmlWebpackPlugin()]
});
