const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const pkg = require('../package');

module.exports = {
  target: 'web',
  context: path.join(__dirname, '../'),
  devtool: 'cheap-module-eval-source-map',
  entry: ['webpack-hot-middleware/client', './app/index.js'],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'spec.js',
    publicPath: '/build/',
  },
  resolve: {
    extensions: ['.js', '.css', '.json'],
    modules: ['node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-0', 'react'],
          plugins: [
            [
              'react-transform',
              {
                transforms: [
                  {
                    transform: 'react-transform-hmr',
                    imports: ['react'],
                    locals: ['module'],
                  },
                  {
                    transform: 'react-transform-catch-errors',
                    imports: ['react', 'redbox-react'],
                  },
                ],
              },
            ],
          ],
        },
        include: [
          path.join(__dirname, '../app'),
          path.join(__dirname, '../../react-toolbox/src'),
          path.join(__dirname, '../../react-toolbox-sc/src'),
          path.join(__dirname, '../../react-toolbox-css/src'),
          path.join(__dirname, '../../react-toolbox-fela/src'),
        ],
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
      },
      {
        test: /\.css$/,
        include: [
          path.join(__dirname, '../app'),
          path.join(__dirname, '../../react-toolbox')
        ],
        exclude: /node_modules/,
        use: ['style-loader', {
          loader: 'css-loader',
          query: {
            import: false,
            importLoaders: 1,
            localIdentName: '[name]__[local]___[hash:base64:5]',
            modules: true,
            sourceMap: true
          },
        }, {
          loader: 'postcss-loader',
          options: {
            config: {
              path: path.join(__dirname, './postcss.config.js')
            }
          }
        }]
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin({ filename: 'spec.css', allChunks: true }),
    new HtmlWebpackPlugin({ template: 'app/index.html', inject: true }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.EvalSourceMapDevToolPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      VERSION: JSON.stringify(pkg.version),
    }),
  ],
};
