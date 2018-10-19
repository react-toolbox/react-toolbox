const pkg = require('../package');
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  target: 'web',
  mode: 'development',
  context: path.join(__dirname, '../'),
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    'babel-polyfill',
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
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.css$/,
        include: [
          path.join(__dirname, '../components'),
          path.join(__dirname, '../spec')
        ],
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            query: {
              modules: true,
              sourceMap: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]___[hash:base64:5]',
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
    new MiniCssExtractPlugin({ filename: 'spec.css', allChunks: true }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.EvalSourceMapDevToolPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      VERSION: JSON.stringify(pkg.version)
    })
  ]
};
