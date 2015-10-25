const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const devServer = 'http://0.0.0.0:8080';

module.exports = {
  context: __dirname,
  devtool: '#eval-source-map',
  entry: [
    'webpack-dev-server/client?' + devServer,
    'webpack/hot/only-dev-server',
    './app/app.jsx'
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'docs.js',
    publicPath: '/build/'
  },
  resolve: {
    extensions: ['', '.jsx', '.scss', '.js', '.json'],
    alias: {
      'react-toolbox': path.resolve(__dirname + './../components')
    },
    modulesDirectories: [
      'node_modules',
      path.resolve(__dirname, './node_modules'),
      path.resolve(__dirname, './../components'),
      path.resolve(__dirname, './../node_modules')
    ]
  },
  module: {
    loaders: [
      {
        test: /(\.js|\.jsx)$/,
        exclude: /(node_modules)/,
        loader: 'react-hot!babel'
      }, {
        test: /(\.scss|\.css)$/,
        loader: 'style!css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass'
      }, {
        test: /(\.txt)$/,
        loader: 'raw-loader',
        include: path.resolve(__dirname, './app/examples')
      }
    ]
  },
  postcss: [autoprefixer],
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ]
};
