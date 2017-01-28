const fs = require('fs')
const postcss = require('postcss')
const cssnext = require('postcss-cssnext')
const modules = require('postcss-modules')
const reporter = require('postcss-reporter')
const apply = require('postcss-apply')
const resolver = require('postcss-modules-resolve-path')
const fsPath = require('path')

function getCssNextConfig(variables) {
  return cssnext({
    features: {
      customProperties: {
        variables: variables
      }
    }
  })
}

function getResolver(rootPath) {
  return resolver({
    paths: [ rootPath ]
  })
}

function getModulesConfig(rootPath, path, fn, fixed) {
  return modules({
    generateScopedName: fixed ? getScopedName : '[hash:base64:5]',
    getJSON: function (cssFileName, json) {
      fn(json)
    }
  })
}

function getScopedName(className, filePath) {
  var fileName = fsPath.basename(filePath, '.css')
  // for anything except theme.css files we use file name
  // for theme.css files we use folder name
  var file = '', folder = ''
  if(fileName === 'theme') {
    folder = '-' + fsPath.basename(fsPath.dirname(filePath))
  } else {
    file = '-' + fileName
  }
  return 'rt' + folder + file + '-' + className
}

function postcssWithModules(id, path, variables, rootPath, fixed) {
  var json
  const cssContent = fs.readFileSync(path, 'utf-8')
  return new Promise(function (resolve) {
    postcss([
      getResolver(rootPath),
      apply,
      getModulesConfig(rootPath, path, function (_json) { json = _json }, fixed),
      getCssNextConfig(variables),
      reporter()
    ]).process(cssContent, {
      from: path
    }).then((result) => {
      return resolve({
        id: id,
        css: result.css,
        json: json
      })
    }).catch((error) => {
      console.error(error.stack) // eslint-disable-line
    })
  })
}

function postcssWithoutModules(path, variables) {
  const cssContent = fs.readFileSync(path)
  return new Promise(function (resolve) {
    postcss([
      getCssNextConfig(variables),
      reporter()
    ]).process(cssContent).then((result) => {
      return resolve({
        css: result.css
      })
    }).catch((error) => {
      console.error(error.stack) // eslint-disable-line
    })
  })
}

module.exports.postcssWithModules = postcssWithModules
module.exports.postcssWithoutModules = postcssWithoutModules
