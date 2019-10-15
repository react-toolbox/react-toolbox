module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6
  },
  extends: 'airbnb',
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true
  },
  plugins: [
    'compat',
    'import',
    'jest',
    'jsx-a11y',
    'react'
  ],
  rules: {
    'compat/compat': 'error',
    'func-names': 'off',
    'global-require': 'off',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
        optionalDependencies: false,
        peerDependencies: false
      }
    ],
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/label-has-for': 'off',
    'jsx-a11y/label-has-associated-control': [
      'error', {
        depth: 3,
      },
    ],
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'jsx-a11y/no-noninteractive-tabindex': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'no-underscore-dangle': 'off',
    'no-use-before-define': 'off',
    'react/destructuring-assignment': 'off',
    'react/jsx-filename-extension': 'off',
    'react/jsx-no-bind': 'error',
    'react/no-find-dom-node': 'off',
    'react/require-default-props': 'off',
    'react/sort-prop-types': 'error'
  }
}