module.exports = {
  extends: 'stylelint-config-standard',
  plugins: [
    'stylelint-order',
  ],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'define-mixin',
          'mixin',
          'each',
        ],
      },
    ],
    'property-no-unknown': [
      true,
      {
        ignoreProperties: [
          'composes',
          'font-smoothing',
        ],
      },
    ],
    'color-hex-case': 'lower',
    'order/order': [
      'custom-properties',
      'declarations',
    ],
    'order/properties-alphabetical-order': true,
    'font-family-name-quotes': 'always-where-recommended',
    'string-quotes': 'single',
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: [
          'global',
        ],
      },
    ],
  },
};
