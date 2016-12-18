const getDependencies = require('../getDependencies')

test('returns all dependencies for a complex component', () => {
  const actual = getDependencies('DATE_PICKER')
  const expected = [ 'DATE_PICKER', 'INPUT', 'DIALOG', 'OVERLAY', 'BUTTON', 'RIPPLE' ]
  expect(actual).toEqual(expected)
})

test('returns the single component if it has no dependencies', () => {
  const actual = getDependencies('RIPPLE')
  expect(actual).toEqual([ 'RIPPLE' ])
})
