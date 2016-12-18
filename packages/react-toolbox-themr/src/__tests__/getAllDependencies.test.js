const getAllDependencies = require('../getAllDependencies')

describe('#getAllDependencies', () => {
  test('returns all dependencies flatten for a component', () => {
    const actual = getAllDependencies([ 'BUTTON', 'RIPPLE' ])
    expect(actual).toEqual([ 'BUTTON', 'RIPPLE' ])
  })

  test('returns empty if there are no components in the array', () => {
    expect(getAllDependencies([])).toEqual([])
  })

  test('set components to empty by default', () => {
    expect(getAllDependencies()).toEqual([])
  })
})
