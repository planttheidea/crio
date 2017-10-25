const path = require('path');
const webpack = require('webpack');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

module.exports = {
  devtool: '#source-map',

  entry: [path.resolve(__dirname, 'src', 'index.js')],

  externals: {
    'hash-it': {
      amd: 'hash-it',
      commonjs: 'hash-it',
      commonjs2: 'hash-it',
      root: 'hashIt'
    },
    stringifier: {
      amd: 'stringifier',
      commonjs: 'stringifier',
      commonjs2: 'stringifier',
      root: 'stringifier'
    }
  },

  module: {
    rules: [
      {
        enforce: 'pre',
        include: [path.resolve(__dirname, 'src')],
        loader: 'eslint-loader',
        options: {
          configFile: '.eslintrc',
          emitError: false,
          failOnError: true,
          failOnWarning: false,
          formatter: require('eslint-friendly-formatter')
        },
        test: /\.js$/
      },
      {
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'DEV_ONLY')
        ],
        loader: 'babel-loader',
        test: /\.js$/
      }
    ]
  },

  output: {
    filename: 'crio.js',
    library: 'crio',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'dist'),
    umdNamedDefine: true
  },

  plugins: [
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new LodashModuleReplacementPlugin({
      collections: true,
      cloning: true,
      currying: true,
      paths: true,
      unicode: true
    })
  ]
};
