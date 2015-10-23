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
    './spec/index.jsx'
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'spec.js',
    publicPath: '/build/'
  },
  resolve: {
    extensions: ['', '.jsx', '.scss', '.js', '.json']
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
