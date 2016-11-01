'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Panel = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _reactCssThemr = require('react-css-themr');

var _identifiers = require('../identifiers.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Panel = function Panel(_ref) {
  var bodyScroll = _ref.bodyScroll,
      children = _ref.children,
      className = _ref.className,
      theme = _ref.theme,
      other = _objectWithoutProperties(_ref, ['bodyScroll', 'children', 'className', 'theme']);

  return _react2.default.createElement('div', _extends({}, other, {
    'data-react-toolbox': 'panel',
    className: (0, _classnames3.default)(theme.panel, _defineProperty({}, theme.bodyScroll, bodyScroll), className),
    children: children
  }));
};

Panel.propTypes = {
  bodyScroll: _react.PropTypes.bool,
  children: _react.PropTypes.any,
  className: _react.PropTypes.string,
  theme: _react.PropTypes.shape({
    panel: _react.PropTypes.string
  })
};

Panel.defaultProps = {
  bodyScroll: true,
  className: ''
};

exports.default = (0, _reactCssThemr.themr)(_identifiers.LAYOUT)(Panel);
exports.Panel = Panel;