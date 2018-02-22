const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const TransferWebpackPlugin = require('transfer-webpack-plugin');

module.exports = {
  context: __dirname,
  devtool: 'inline-source-map',
  entry: ['webpack-hot-middleware/client', './app/index.js'],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'docs.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.css', '.json', '.md'],
    modules: ['node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, './app')],
        loader: 'babel-loader'
      }, {
        test: /\.css$/,
        include: [
          path.resolve(__dirname, './node_modules/highlight.js'),
          path.resolve(__dirname, './node_modules/codemirror'),
        ],
        loaders: ['style-loader', 'css-loader']
      }, {
        test: /\.css$/,
        include: [
          path.resolve(__dirname, './app'),
          path.resolve(__dirname, '../react-toolbox/lib'),
        ],
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            query: {
              import: false,
              importLoaders: 1,
              localIdentName: '[name]__[local]___[hash:base64:5]',
              modules: true,
              sourceMap: true,
            },
          }, {
            loader: 'postcss-loader',
            options: {
              config: {
                path: path.join(__dirname, './postcss.config.js')
              },
            },
          }],
        })
      }, {
        test: /\.txt$/,
        include: path.resolve(__dirname, './app/components/layout/main/modules'),
        loader: 'raw-loader'
      }, {
        test: /\.md$/,
        include: [
          path.resolve(__dirname, '../react-toolbox/lib'),
          path.join(__dirname, './app')
        ],
        loaders: ['html-loader', 'highlight-loader', 'markdown-loader']
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({ filename: 'docs.css', allChunks: true }),
    new TransferWebpackPlugin([{
      from: 'www/images',
      to: 'images'
    }], path.resolve(__dirname, './')),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ]
};
