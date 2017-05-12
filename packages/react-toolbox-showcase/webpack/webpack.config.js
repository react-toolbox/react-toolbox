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
        exclude: /node_modules/,
        include: [
          path.join(__dirname, '../app'),
          path.join(__dirname, '../../react-toolbox'),
        ],
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            query: {
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]',
              sourceMap: true,
            },
          },
          'postcss-loader'
        ],
      },
    ],
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        context: path.join(__dirname, '../'),
        postcss() {
          return [
            require('postcss-import')({
              root: path.join(__dirname, '../')
            }),
            require('postcss-mixins')(),
            require('postcss-each')(),
            require('postcss-cssnext')(),
            require('postcss-reporter')({
              clearMessages: true,
            }),
          ];
        },
      },
    }),
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
