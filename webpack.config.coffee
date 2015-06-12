"use strict"

pkg           = require "./package.json"
node_modules  = __dirname + '/node_modules'

module.exports =
  cache       : true

  resolve     : extensions: ['', '.cjsx', '.coffee', '.js', '.json', '.styl']

  context     : __dirname + '/spec'

  entry       : ['./index.cjsx']

  output :
    path      : if process.env.NODE_ENV is 'production' then './dist' else './build'
    filename  : pkg.name + '.js'
    publicPath: '/build/'

  devServer:
    # contentBase : "./build"
    # host        : "localhost"
    # port        : 8000
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
      test    : /\.styl$/,    loader: 'style-loader!css-loader!stylus-loader?importLoaders=1&minimize!'
    ]
