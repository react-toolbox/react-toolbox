const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const TransferWebpackPlugin = require('transfer-webpack-plugin');

module.exports = {
  context: __dirname,
	devtool: 'inline-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './app/index.js'
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'docs.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['', '.scss', '.js', '.json', '.md'],
    packageMains: ['browser', 'web', 'browserify', 'main', 'style'],
    alias: {
      'react-toolbox': path.resolve(__dirname + './../components')
    },
    modulesDirectories: [
      'node_modules',
      path.resolve(__dirname, './node_modules'),
      path.resolve(__dirname, './../node_modules'),
      path.resolve(__dirname, './../components')
    ]
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel'
      }, {
        test: /\.(scss|css)$/,
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass?sourceMap')
      }, {
        test: /\.(txt)$/,
        loader: 'raw',
        include: path.resolve(__dirname, './app/components/layout/main/modules')
      }, {
        test: /\.(md)$/,
        loader: 'html!highlight!markdown'
      }
    ]
  },
  postcss: [autoprefixer],
  sassLoader: {
    data: '@import "' + path.resolve(__dirname, 'app/theme/_theme.scss') + '";'
  },
  plugins: [
    new ExtractTextPlugin('docs.css', { allChunks: true }),
    new TransferWebpackPlugin([{
      from: 'www/images',
      to: 'images'
    }], path.resolve(__dirname, './')),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ]
};
