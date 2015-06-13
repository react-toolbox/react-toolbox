"use strict"

pkg               = require './package.json'
node_modules      = __dirname + '/node_modules'
ExtractTextPlugin = require('extract-text-webpack-plugin')
environment       = process.env.NODE_ENV

module.exports =
  cache       : true

  resolve     : extensions: ['', '.cjsx', '.coffee', '.js', '.json', '.styl']

  context     : __dirname + '/spec'

  entry       : [ 'webpack/hot/dev-server', './index.cjsx']

  output :
    path      : if environment is 'production' then './dist' else './build'
    filename  : pkg.name + '.js'
    publicPath: '/build/'

  devServer:
    # contentBase : "./build"
    host        : "localhost"
    port        : 8080
    # colors      : true
    # progress    : true
    # noInfo      : false
    # hot         : true
    inline      : true

  module :
    noParse : [node_modules + '/react/dist/*.js']

    loaders : [
      test    : /\.cjsx$/,    loader: 'coffee-jsx-loader'
    ,
      test    : /\.coffee$/,  loader: 'coffee-jsx-loader'
    ,
      test    : /\.styl$/,    loader: ExtractTextPlugin.extract('style-loader', 'css-loader!stylus-loader!')
    ]

  plugins: [
    new ExtractTextPlugin pkg.name + '.css', allChunks: true
  ]
