const path = require('path');
const webpack = require('webpack');

const ROOT = path.resolve(__dirname, '..');

module.exports = {
  devtool: '#source-map',

  entry: [path.resolve(ROOT, 'src', 'index.js')],

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

  mode: 'development',

  module: {
    rules: [
      {
        enforce: 'pre',
        include: [path.resolve(ROOT, 'src')],
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
        include: [path.resolve(ROOT, 'src'), path.resolve(ROOT, 'DEV_ONLY')],
        loader: 'babel-loader',
        test: /\.js$/
      }
    ]
  },

  output: {
    filename: 'crio.js',
    library: 'crio',
    libraryTarget: 'umd',
    path: path.resolve(ROOT, 'dist'),
    umdNamedDefine: true
  },

  plugins: [new webpack.EnvironmentPlugin(['NODE_ENV'])]
};
