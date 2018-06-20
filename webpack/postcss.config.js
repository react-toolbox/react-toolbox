const path = require('path');

module.exports = {
  plugins: {
    'postcss-import': {
      root: path.join(__dirname, '../'),
      path: [path.join(__dirname, '../components')]
    },
    'postcss-mixins': {},
    'postcss-each': {},
    'postcss-apply': {},
    'postcss-nesting': {},
    'postcss-preset-env': {
      stage: 0,
    },
    'postcss-reporter': {
      clearMessages: true
    }
  }
}
