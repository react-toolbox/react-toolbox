const path = require('path');
const toolboxVariables = require('./toolbox-variables');

module.exports = {
  plugins: [
    require('postcss-import')({
      root: path.join(__dirname, './../'),
      path: [
        path.join(__dirname, './app'),
        path.join(__dirname, './../components')
      ]
    }),
    require('postcss-mixins')(),
    require('postcss-each')(),
    require('postcss-apply')(),
    require('postcss-preset-env')({
      stage: 0,
      features: {
        'custom-properties': {
          variables: toolboxVariables,
          preserve: false
        }
      }
    }),
    require('postcss-reporter')({ clearMessages: true })
  ]
}