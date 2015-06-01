"use strict"

# -- DEPENDENCIES --------------------------------------------------------------
gulp          = require "gulp"
cjsx          = require "gulp-cjsx"
concat        = require "gulp-concat"
connect       = require "gulp-connect"
header        = require "gulp-header"
gutil         = require "gulp-util"
uglify        = require "gulp-uglify"
stylus        = require "gulp-stylus"
pkg           = require "./package.json"
# -- BROWSERIFY ----------------------------------------------------------------
browserify    = require "browserify"
source        = require "vinyl-source-stream"
bundler       = browserify "./source/app.cjsx", extensions: [".cjsx", ".coffee"]
bundler.transform require "coffee-reactify"
# -- FILES ---------------------------------------------------------------------
path =
  dist          :   "./dist"
  source        : [ "source/**/*.cjsx"
                    "source/**/*.coffee"]
  style         : [ "bower_components/STYLmethods/vendor.styl"
                    "source/styles/__constants.styl"
                    "source/styles/normalize.styl"
                    "source/styles/app.styl"
                    "source/styles/modules/*.styl"
                    "source/styles/components/*.styl"
                    "source/styles/screens/*.styl"]
  dependencies  : [ "node_modules/react/dist/react-with-addons.js"
                    "bower_components/hamsa/dist/hamsa.js"]
# -- BANNER --------------------------------------------------------------------
banner = [
  "/**"
  " * <%= pkg.name %> - <%= pkg.description %>"
  " * @version v<%= pkg.version %>"
  " * @link    <%= pkg.homepage %>"
  " * @author  <%= pkg.author.name %> (<%= pkg.author.site %>)"
  " * @license <%= pkg.license %>"
  " */"
  ""
].join("\n")
# -- TASKS ---------------------------------------------------------------------
gulp.task "server", ->
  connect.server
    port      : 8000
    livereload: true
    root      : path.dist

gulp.task "source", ->
  bundler.bundle()
    .on "error", gutil.log.bind(gutil, "Browserify Error")
    .pipe source "#{pkg.name}.js"
    # .pipe uglify mangle: true
    .pipe header banner, pkg: pkg
    .pipe gulp.dest "#{path.dist}/assets/js"
    .pipe connect.reload()

gulp.task "style", ->
  gulp.src path.style
    .pipe concat "#{pkg.name}.styl"
    .pipe stylus
      compress: true
      errors  : true
    .pipe header banner, pkg: pkg
    .pipe gulp.dest "#{path.dist}/assets/css"
    .pipe connect.reload()

gulp.task "dependencies", ->
  gulp.src path.dependencies
    .pipe concat "#{pkg.name}.dependencies.js"
    .pipe gulp.dest "#{path.dist}/assets/js"
    # .pipe uglify mangle: true
    .pipe connect.reload()

gulp.task "init", ["source", "style", "dependencies"]

gulp.task "default", ->
  gulp.run ["server", "init"]
  gulp.watch path.source, ["source"]
  gulp.watch path.style, ["style"]
