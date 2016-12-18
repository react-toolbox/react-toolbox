const fs = require('fs')
const postcss = require('postcss')
const cssnext = require('postcss-cssnext')
const modules = require('postcss-modules')
const reporter = require('postcss-reporter')
const resolver = require('postcss-modules-resolve-path')

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

function getModulesConfig(rootPath, path, fn) {
  return modules({
    generateScopedName: '[hash:base64:5]',
    getJSON: function (cssFileName, json) {
      fn(json)
    }
  })
}

function postcssWithModules(id, path, variables, rootPath) {
  var json
  const cssContent = fs.readFileSync(path)
  return new Promise(function (resolve) {
    postcss([
      getResolver(rootPath),
      getModulesConfig(rootPath, path, function (_json) { json = _json }),
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
    })
  })
}

module.exports.postcssWithModules = postcssWithModules
module.exports.postcssWithoutModules = postcssWithoutModules
