const path = require('path')
const fs = require('fs')
const R = require('ramda')
const C = require('./constants')

function readConfigFile(configPath) {
  if (!configPath) return {}
  const fullPath = path.resolve(process.cwd(), configPath)
  return JSON.parse(fs.readFileSync(fullPath, 'utf-8'))
}

function getConfig(config) {
  const filterInput = R.pickBy((v, k) => !R.isNil(v) && R.contains(k, C.INPUT_OPTIONS))
  const filterOutput = R.pickBy((v, k) => R.contains(k, C.OUTPUT_OPTIONS))
  const inputOptions = R.merge(C.DEFAULT_OPTIONS, filterInput(config))
  const buildPaths = getBuildPaths(inputOptions)
  return filterOutput(R.merge(inputOptions, buildPaths))
}

function getBuildPaths(options) {
  const cssName = getFileName(options[C.CSS_OPTION], C.DEFAULT_FILENAME, '.css')
  const jsName = getFileName(options[C.JS_OPTION], C.DEFAULT_FILENAME, '.js')
  const cssDir = getFileDir(options[C.CSS_OPTION], options[C.OUTPUT_OPTION] || C.DEFAULT_OUTPUT)
  const jsDir = getFileDir(options[C.JS_OPTION], options[C.OUTPUT_OPTION] || C.DEFAULT_OUTPUT)

  return {
    css: path.resolve(cssDir, cssName),
    js: path.resolve(jsDir, jsName)
  }
}

function getFileName(stringPath, defaultName, extension) {
  const parsed = path.parse(stringPath || '')
  const name = ifEmptyReturn(parsed.name, defaultName)
  return name + extension
}

function getFileDir(stringPath, dir) {
  const parsed = path.parse(stringPath || '')
  return ifEmptyReturn(parsed.dir, dir)
}

function ifEmptyReturn(optionValue, defaultValue) {
  return optionValue === ''
    ? defaultValue
    : optionValue
}

module.exports.getBuildPaths = getBuildPaths
module.exports.getConfig = getConfig
module.exports.readConfigFile = readConfigFile
