const pkg = require('../package');
const path = require('path');
const webpack = require('webpack');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');

module.exports = {
  target: 'web',
  mode: 'development',
  context: path.join(__dirname, '../'),
  devtool: 'source-map',
  entry: {
    spec: ['webpack-hot-middleware/client', './spec/index.js']
  },

  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js',
    publicPath: '/build/'
  },
  resolve: {
    extensions: ['.js', '.css', '.json'],
    modules: ['node_modules']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        include: [
          path.join(__dirname, '../components'),
          path.join(__dirname, '../spec')
        ]
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        exclude: [
          path.join(__dirname, '../components'),
          path.join(__dirname, '../spec')
        ],
        use: [
          ExtractCssChunks.loader,
          'css-loader',
        ]
      },
      {
        test: /\.css$/,
        include: [
          path.join(__dirname, '../components'),
          path.join(__dirname, '../spec')
        ],
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]--[hash:base64:5]',
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: path.join(__dirname, './postcss.config.js')
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new ExtractCssChunks({
      filename: '[name].css',
      hot: true,
      cssModules: true
    }),
    new webpack.HotModuleReplacementPlugin({
      multiStep: true,
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      VERSION: JSON.stringify(pkg.version)
    })
  ]
};
