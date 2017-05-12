const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const TransferWebpackPlugin = require('transfer-webpack-plugin');
const toolboxVariables = require('./toolbox-variables');

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
    extensions: ['', '.js', '.scss', '.css', '.json', '.md'],
    packageMains: ['browser', 'web', 'browserify', 'main', 'style'],
    alias: { 'react-toolbox': path.resolve(`${__dirname}./../components`) },
    modulesDirectories: [
      'node_modules',
      path.resolve(__dirname, './node_modules'),
      path.resolve(__dirname, './../node_modules'),
      path.resolve(__dirname, './../components')
    ]
  },
  module: {
    loaders: [{
      test: /\.js$/,
      include: [path.resolve(__dirname, './app'), path.resolve(__dirname, './../components')],
      loader: 'babel'
    }, {
      test: /\.css$/,
      include: /node_modules/,
      loaders: ['style-loader', 'css-loader']
    }, {
      test: /\.css$/,
      include: [path.resolve(__dirname, './app'), path.resolve(`${__dirname}./../components`)],
      loader: ExtractTextPlugin.extract('style', 'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss')
    }, {
      test: /\.txt$/,
      include: path.resolve(__dirname, './app/components/layout/main/modules'),
      loader: 'raw'
    }, {
      test: /\.md$/,
      include: [path.join(__dirname, './../components'), path.join(__dirname, './app')],
      loader: 'html!highlight!markdown'
    }]
  },
  postcss (webpackInstance) {
    return [
      require('postcss-import')({
        addDependencyTo: webpackInstance,
        root: path.join(__dirname, './../'),
        path: [
          path.join(__dirname, './app'),
          path.join(__dirname, './../components')
        ]
      }),
      require('postcss-mixins')(),
      require('postcss-each')(),
      require('postcss-cssnext')({
        features: {
          customProperties: {
            variables: toolboxVariables
          }
        }
      }),
      require('postcss-reporter')({ clearMessages: true })
    ];
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
