const pkg = require('../package');
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  target: 'web',
  context: path.join(__dirname, '../'),
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './spec/index.js'
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'spec.js',
    publicPath: '/build/'
  },
  resolve: {
    extensions: ['.js', '.css', '.json'],
    modules: ['node_modules']
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: 'babel-loader',
      include: [
        path.join(__dirname, '../components'),
        path.join(__dirname, '../spec')
      ]
    }, {
      test: /\.css$/,
      include: /node_modules/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        loader: 'css-loader',
      })
    }, {
      test: /\.css$/,
      include: [
        path.join(__dirname, '../components'),
        path.join(__dirname, '../spec')
      ],
      use: ['style-loader', {
        loader: 'css-loader',
        query: {
          import: false,
          importLoaders: 1,
          localIdentName: '[name]__[local]___[hash:base64:5]',
          modules: true,
          sourceMap: true
        },
      }, {
        loader: 'postcss-loader',
        options: {
          // context: path.join(__dirname, '../'),
          config: {
            path: path.join(__dirname, './postcss.config.js')
          }
        }
      }]
    }]
  },
  plugins: [
    new ExtractTextPlugin({ filename: 'spec.css', allChunks: true }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.EvalSourceMapDevToolPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      VERSION: JSON.stringify(pkg.version)
    })
  ]
};
