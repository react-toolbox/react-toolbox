const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TransferWebpackPlugin = require('transfer-webpack-plugin');

module.exports = {
  context: __dirname,
  mode: 'development',
  devtool: 'inline-source-map',
  entry: [
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
    'babel-polyfill',
    './app/index.js'
  ],

  output: {
    path: path.join(__dirname, 'build'),
    filename: 'docs.js',
    publicPath: '/'
  },

  resolve: {
    extensions: ['.js', '.scss', '.css', '.json', '.md'],
    mainFields: ['browser', 'web', 'browserify', 'main', 'style'],
    alias: { 'react-toolbox': path.resolve(`${__dirname}./../components`) },
    modules: [
      'node_modules',
      path.resolve(__dirname, './node_modules'),
      path.resolve(__dirname, './../node_modules'),
      path.resolve(__dirname, './../components')
    ]
  },

  module: {
    rules: [{
      test: /\.js$/,
      include: [path.resolve(__dirname, './app'), path.resolve(__dirname, './../components')],
      use: ['babel-loader']
    },
    {
      test: /\.css$/,
      include: /node_modules/,
      use: ['style-loader', 'css-loader']
    },
    {
      test: /\.css$/,
      include: [path.resolve(__dirname, './app'), path.resolve(`${__dirname}./../components`)],
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            sourceMap: true,
            modules: true,
            importLoaders: 1,
            localIdentName: '[name]__[local]___[hash:base64:5]',
          }
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
    },
    {
      test: /\.txt$/,
      include: path.resolve(__dirname, './app/components/layout/main/modules'),
      use: ['raw-loader']
    },
    {
      test: /\.md$/,
      include: [path.join(__dirname, './../components'), path.join(__dirname, './app')],
      use: ['html-loader', 'highlight-loader',
        {
          loader: 'markdown-loader',
          options: {
            langPrefix: 'lang-'
          }
        }]
    }]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'docs.css',
      allChunks: true
    }),
    new TransferWebpackPlugin([{
      from: 'www/images',
      to: 'images'
    }], path.resolve(__dirname, './')),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ]
};
