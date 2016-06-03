'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Panel = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _reactCssThemr = require('react-css-themr');

var _identifiers = require('../identifiers.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Panel = function Panel(_ref) {
  var children = _ref.children;
  var className = _ref.className;
  var scrollY = _ref.scrollY;
  var theme = _ref.theme;

  var _className = (0, _classnames3.default)(theme.panel, _defineProperty({}, theme.scrollY, scrollY), className);

  return _react2.default.createElement(
    'div',
    { 'data-react-toolbox': 'panel', className: _className },
    children
  );
};

Panel.propTypes = {
  children: _react2.default.PropTypes.any,
  className: _react2.default.PropTypes.string,
  scrollY: _react2.default.PropTypes.bool,
  theme: _react2.default.PropTypes.shape({
    panel: _react2.default.PropTypes.string.isRequired,
    scrollY: _react2.default.PropTypes.string.isRequired
  })
};

Panel.defaultProps = {
  className: '',
  scrollY: false
};

exports.default = (0, _reactCssThemr.themr)(_identifiers.LAYOUT)(Panel);
exports.Panel = Panel;