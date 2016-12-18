const R = require('ramda')
const getDependencies = require('./getDependencies')

module.exports = function getAllDependencies(_components) {
  const components = _components || []
  const resolver = R.compose(R.uniq, R.flatten, R.map(getDependencies))
  return resolver(components)
}
