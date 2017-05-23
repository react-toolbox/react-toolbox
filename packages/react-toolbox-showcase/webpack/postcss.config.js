const path = require('path');

module.exports = {
  plugins: {
    'postcss-import': {
      root: path.join(__dirname, '../'),
      path: [path.join(__dirname, '../components')]
    },
    'postcss-mixins': {},
    'postcss-each': {},
    'postcss-cssnext': {},
    'postcss-nested': {},
    'postcss-reporter': {
      clearMessages: true
    }
  }
}
