const path = require('path');
const webpack = require('webpack');
const defaultConfig = require('./webpack.config');

module.exports = Object.assign({}, defaultConfig, {
  cache: false,

  debug: false,

  devtool: undefined,

  output: Object.assign({}, defaultConfig.output, {
    filename: 'crio.min.js'
  }),

  plugins: defaultConfig.plugins.concat([
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        booleans: true,
        conditionals: true,
        drop_console: true,
        drop_debugger: true,
        join_vars: true,
        screw_ie8: true,
        sequences: true,
        warnings: false
      },
      sourceMap: false
    })
  ])
});
;