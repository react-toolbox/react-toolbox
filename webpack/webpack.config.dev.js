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
      loader: 'babel-loader',
      include: [
        path.join(__dirname, '../components'),
        path.join(__dirname, '../spec')
      ]
    }, {
      test: /\.css$/,
      include: /node_modules/,
      loader: ExtractTextPlugin.extract({
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
          modules: true,
          localIdentName: '[name]__[local]___[hash:base64:5]',
          sourceMap: true
        },
      }, 'postcss-loader']
    }]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        context: path.join(__dirname, '../'),
        postcss () {
          return [
            require('postcss-import')({
              root: path.join(__dirname, '../'),
              path: [path.join(__dirname, '../components')]
            }),
            require('postcss-mixins')(),
            require('postcss-each')(),
            require('postcss-cssnext')(),
            require('postcss-reporter')({
              clearMessages: true
            })
          ];
        }
      }
    }),
    new ExtractTextPlugin({ filename: 'spec.css', allChunks: true }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.EvalSourceMapDevToolPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      VERSION: JSON.stringify(pkg.version)
    })
  ]
};
