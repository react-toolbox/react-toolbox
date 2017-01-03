#!/usr/bin/env node
const R = require('ramda')
const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp').sync
const CleanCSS = require('clean-css')

const argv = require('yargs')
  .usage('Usage: $0 [options]')
  .alias('c', 'config')
  .alias('p', 'path')
  .alias('i', 'include')
  .alias('j', 'javascript')
  .alias('s', 'styles')
  .alias('o', 'output')
  .alias('f', 'fixed')
  .alias('h', 'help')
  .array('include')
  .describe('c', 'Configuration file pathname')
  .describe('p', 'Path to react-toolbox root folder')
  .describe('i', 'List of components to include')
  .describe('j', 'Pathname to generate Javascript theme file')
  .describe('s', 'Pathname to generate CSS theme file')
  .describe('o', 'Output directory for both css and javascript')
  .describe('f', 'Generate fixed, human-readable class names')
  .help('h')
  .epilog('Javi Velasco (@javivelasco)')
  .argv

const getAllDependencies = require('../src/getAllDependencies')
const getConfig = require('../src/configure').getConfig
const readConfigFile = require('../src/configure').readConfigFile
const getPath = require('../src/getPath')
const postcssWithModules = require('../src/postcss').postcssWithModules

const pkg = require(path.join(process.cwd(), 'package.json'))
const fileConfig = readConfigFile(argv.config)
const config = getConfig(R.mergeAll([ fileConfig, pkg.reactToolbox, argv ]))
const cssDst = path.resolve(process.cwd(), config.css)
const jsDst = path.resolve(process.cwd(), config.js)
const rtPath = path.resolve(process.cwd(), config.path)
const identifiers = require(path.join(rtPath, 'identifiers.js'))

function processComponent(variables, component) {
  const identifier = identifiers[component]
  const componentPath = path.join(rtPath, getPath(component))
  return postcssWithModules(identifier, componentPath, variables, rtPath, config.fixed)
}

mkdirp(path.parse(cssDst).dir)
mkdirp(path.parse(jsDst).dir)

const processComponents = R.map(R.partial(processComponent, [ config.customProperties ]))
const resolvedComponents = getAllDependencies(config.include)
const promises = processComponents(resolvedComponents)

Promise.all(promises).then(function (results) {
  const addJSON = (result, item) => R.assoc(item.id, item.json, result)
  const addCSS = (result, item) => R.concat(result, item.css)
  const themeJS = R.reduce(addJSON, {}, results)
  const themeCSS = R.reduce(addCSS, '', results)
  const themeCSSMin = new CleanCSS().minify(themeCSS).styles
  fs.writeFileSync(jsDst, 'module.exports=' + JSON.stringify(themeJS))
  fs.writeFileSync(cssDst, themeCSSMin)
}).catch(function (error) {
  console.log(error) // eslint-disable-line
})
