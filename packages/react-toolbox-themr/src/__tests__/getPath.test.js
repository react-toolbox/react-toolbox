const path = require('path')
const getPath = require('../getPath')

describe('#getPath', () => {
  test('returns a single path for a button', () => {
    expect(getPath('BUTTON')).toBe(path.resolve('/button/theme.css'))
  })
})
