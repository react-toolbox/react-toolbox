const path = require('path')
const getBuildPaths = require('../configure').getBuildPaths

describe('Path generation', () => {
  test('set defaults if no options given', () => {
    expect(getBuildPaths({})).toEqual({
      css: path.resolve('public/react-toolbox/theme.css'),
      js: path.resolve('public/react-toolbox/theme.js')
    })
  })

  test('adds default dir if only a name is given', () => {
    const options = { styles: 'foo.css', javascript: 'bar' }
    expect(getBuildPaths(options)).toEqual({
      css: path.resolve('public/react-toolbox/foo.css'),
      js: path.resolve('public/react-toolbox/bar.js')
    })
  })

  test('set full paths when paths are given', () => {
    const options = {
      styles: 'assets/react-toolbox/css/fua.css',
      javascript: 'app/react-toolbox.js'
    }
    expect(getBuildPaths(options)).toEqual({
      css: path.resolve('assets/react-toolbox/css/fua.css'),
      js: path.resolve('app/react-toolbox.js')
    })
  })

  test('allows to change the default dir', () => {
    const options = { output: 'assets/rt' }
    expect(getBuildPaths(options)).toEqual({
      css: path.resolve('assets/rt/theme.css'),
      js: path.resolve('assets/rt/theme.js')
    })
  })
})
