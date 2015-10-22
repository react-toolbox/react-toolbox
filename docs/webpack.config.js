var pkg = require('./package.json');
var path = require('path');
var node_modules = __dirname + '/node_modules';
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var environment = process.env.NODE_ENV;

module.exports = {
  cache: true,
  resolve: {
    extensions: ['', '.jsx', '.scss', '.css', '.js', '.json'],
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
  context: __dirname,
  entry: {
    commons: [path.resolve(__dirname, './../components/commons')],
    test: ['webpack/hot/dev-server', './app/index.jsx']
  },
  output: {
    path: environment === 'production' ? './dist' : './build',
    filename: pkg.name + '.[name].js',
    publicPath: '/build/'
  },
  devServer: {
    host: '0.0.0.0',
    port: 3000,
    inline: true
  },
  module: {
    loaders: [
      { test: /(\.js|\.jsx)$/, exclude: [node_modules], loaders: ['babel'] },
      { test: /(\.scss|\.css)$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader!sass') }
    ]
  },
  postcss: [require('autoprefixer-core')],
  plugins: [new ExtractTextPlugin(pkg.name + '.[name].css', {allChunks: true})]
};
