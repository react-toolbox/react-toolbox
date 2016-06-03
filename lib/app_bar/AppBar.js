'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppBar = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _reactCssThemr = require('react-css-themr');

var _identifiers = require('../identifiers.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var AppBar = function AppBar(_ref) {
  var _classnames;

  var theme = _ref.theme;

  var props = _objectWithoutProperties(_ref, ['theme']);

  var className = (0, _classnames3.default)(theme.appBar, (_classnames = {}, _defineProperty(_classnames, theme.fixed, props.fixed), _defineProperty(_classnames, theme.flat, props.flat), _classnames), props.className);

  return _react2.default.createElement(
    'header',
    { className: className, 'data-react-toolbox': 'app-bar' },
    props.children
  );
};

AppBar.propTypes = {
  children: _react.PropTypes.node,
  className: _react.PropTypes.string,
  fixed: _react.PropTypes.bool,
  flat: _react.PropTypes.bool,
  theme: _react.PropTypes.shape({
    appBar: _react.PropTypes.string,
    fixed: _react.PropTypes.string,
    flat: _react.PropTypes.string
  })
};

AppBar.defaultProps = {
  className: '',
  fixed: false,
  flat: false
};

exports.default = (0, _reactCssThemr.themr)(_identifiers.APP_BAR)(AppBar);
exports.AppBar = AppBar;