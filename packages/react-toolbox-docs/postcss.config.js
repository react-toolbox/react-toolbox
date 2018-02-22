const path = require('path');

module.exports = {
  plugins: {
    'postcss-import': {
      root: path.join(__dirname, './'),
      path: [path.join(__dirname, './app/components')]
    },
    'postcss-mixins': {},
    'postcss-each': {},
    'postcss-apply': {},
    'postcss-nesting': {},
    'postcss-cssnext': {
      features: {
        customProperties: {
          variables: {
            'color-primary': 'var(--palette-indigo-500)',
            'color-primary-dark': 'var(--palette-indigo-700)',
            'color-primary-light': 'var(--palette-indigo-500)',
            'color-accent': 'var(--palette-pink-a200)',
            'color-accent-dark': 'var(--palette-pink-700)',
            'color-primary-contrast': 'var(--color-dark-contrast)',
            'color-accent-contrast': 'var(--color-dark-contrast)'
          }
        },
        rem: {
          rootValue: 10,
          html: false,
        },
      }
    },
    'postcss-reporter': {
      clearMessages: true
    }
  }
}
