'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RawCheck = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ripple = require('../ripple');

var _ripple2 = _interopRequireDefault(_ripple);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Check = function Check(_ref) {
  var checked = _ref.checked;
  var children = _ref.children;
  var onMouseDown = _ref.onMouseDown;

  var className = (0, _classnames2.default)(_style2.default.check, _defineProperty({}, _style2.default.checked, checked));

  return _react2.default.createElement(
    'div',
    { 'data-react-toolbox': 'check', onMouseDown: onMouseDown, className: className },
    children
  );
};

Check.propTypes = {
  checked: _react.PropTypes.bool,
  children: _react.PropTypes.any,
  onMouseDown: _react.PropTypes.func
};

exports.default = (0, _ripple2.default)({
  className: _style2.default.ripple,
  spread: 2.6,
  centered: true
})(Check);
exports.RawCheck = Check;