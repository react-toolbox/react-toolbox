'use strict'

pkg               = require './package.json'
node_modules      = __dirname + '/node_modules'
ExtractTextPlugin = require('extract-text-webpack-plugin')
environment       = process.env.NODE_ENV

module.exports =
  cache         : true
  resolve       : extensions: ['', '.cjsx', '.coffee', '.js', '.json', '.styl']
  context       : __dirname

  entry:
    commons     : ['./node_modules/react-toolbox/components/commons.styl']
    test        : ['webpack/hot/dev-server', './src/app.cjsx']

  output:
    path        : if environment is 'production' then './dist' else './build'
    filename    : pkg.name + '.[name].js'
    publicPath  : '/build/'

  devServer:
    host        : 'localhost'
    port        : 8080
    inline      : true

  module:
    loaders: [
      test      : /\.cjsx$/,    loader: 'coffee-jsx-loader'
    ,
      test      : /\.coffee$/,  loader: 'coffee-jsx-loader'
    ,
      test      : /\.styl$/,    loader: ExtractTextPlugin.extract('style-loader', 'css-loader!stylus-loader!')
    ]

  plugins: [
    new ExtractTextPlugin pkg.name + '.[name].css', allChunks: false
  ]
