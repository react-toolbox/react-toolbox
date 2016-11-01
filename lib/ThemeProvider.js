'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getProperty = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require('styled-components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getProperty = function getProperty(name) {
  return function (props) {
    var value = name.split('.').reduce(function (current, next) {
      return current[next];
    }, props.theme.reactToolbox);

    return value;
  };
};

var defaultTheme = {
  animationCurveDefault: 'cubic-bezier(0.4, 0, 0.2, 1)',
  animationCurveFastOutLinearIn: 'cubic-bezier(0.4, 0, 0.2, 1)',
  primaryColor: 'rgba(63, 81, 181, 1)',
  primaryColorContrast: 'rgba(255, 255, 255, 1)',
  accentColor: 'rgba(255, 64, 129, 1)',
  accentColorContrast: 'rgba(255, 255, 255, 1)',
  shadow2p: '\n    0 2px 2px 0 rgba(0, 0, 0, 0.14),\n    0 3px 1px -2px rgba(0, 0, 0, 0.2),\n    0 1px 5px 0 rgba(0, 0, 0, 0.12);\n  '
};

var ReactToolboxThemeProvider = function ReactToolboxThemeProvider(props) {
  var theme = {
    reactToolbox: Object.assign({}, defaultTheme, props.theme)
  };

  return _react2.default.createElement(
    _styledComponents.ThemeProvider,
    { theme: theme },
    props.children
  );
};

ReactToolboxThemeProvider.propTypes = {
  children: _react.PropTypes.node,
  theme: _react.PropTypes.object
};

exports.default = ReactToolboxThemeProvider;
exports.getProperty = getProperty;