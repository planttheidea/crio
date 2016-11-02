const path = require('path');
const webpack = require('webpack');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

module.exports = {
  cache: true,

  debug: true,

  devtool: 'source-map',

  entry: [
    path.resolve(__dirname, 'src', 'index.js')
  ],

  eslint: {
    configFile: '.eslintrc',
    emitError: true,
    failOnError: true,
    failOnWarning: false,
    formatter: require('eslint-friendly-formatter')
  },

  externals: {
    'hash-it': {
      amd: 'hash-it',
      commonjs: 'hash-it',
      commonjs2: 'hash-it',
      root: 'hashIt'
    },
    'stringifier': {
      amd: 'stringifier',
      commonjs: 'stringifier',
      commonjs2: 'stringifier',
      root: 'stringifier'
    }
  },

  module: {
    preLoaders: [
      {
        include: [
          path.resolve(__dirname, 'src')
        ],
        loader: 'eslint-loader',
        test: /\.js$/
      }
    ],

    loaders: [
      {
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'DEV_ONLY')
        ],
        loader: 'babel',
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
    new webpack.EnvironmentPlugin([
      'NODE_ENV'
    ]),
    new LodashModuleReplacementPlugin({
      collections: true,
      paths: true
    })
  ],

  resolve: {
    extensions: [
      '',
      '.js'
    ],

    fallback: [
      path.join(__dirname, 'src')
    ],

    root: __dirname
  }
};
