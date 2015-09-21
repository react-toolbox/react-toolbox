var pkg = require('./package.json');
var node_modules = __dirname + '/node_modules';
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var environment = process.env.NODE_ENV;

module.exports = {
  cache: true,
  resolve: {
    extensions: ['', '.jsx', '.cjsx', '.coffee', '.js', '.json', '.styl']
  },
  context: __dirname,
  entry: {
    commons: ['./node_modules/react-toolbox/components/commons.styl'],
    test: ['webpack/hot/dev-server', './src/app.jsx']
  },
  output: {
    path: environment === 'production' ? './dist' : './build',
    filename: pkg.name + '.[name].js',
    publicPath: '/build/'
  },
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    inline: true
  },
  module: {
    noParse: [node_modules + '/react/dist/*.js'],
    loaders: [
      { test: /(\.js|\.jsx)$/, exclude: /(node_modules)/, loader: 'babel?optional=runtime'},
      { test: /\.cjsx$/, loader: 'coffee-jsx-loader'},
      { test: /\.coffee$/, loader: 'coffee-jsx-loader'},
      { test: /\.styl$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader!stylus-loader!')}
    ]
  },
  plugins: [new ExtractTextPlugin(pkg.name + '.[name].css', {allChunks: false})]
};
