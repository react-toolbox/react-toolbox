'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RawThumb = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ripple = require('../ripple');

var _ripple2 = _interopRequireDefault(_ripple);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Thumb = function Thumb(_ref) {
  var children = _ref.children;
  var onMouseDown = _ref.onMouseDown;
  return _react2.default.createElement(
    'span',
    { role: 'thumb', className: _style2.default.thumb, onMouseDown: onMouseDown },
    children
  );
};

Thumb.propTypes = {
  children: _react.PropTypes.any
};

exports.default = (0, _ripple2.default)({
  className: _style2.default.ripple,
  spread: 2.6,
  centered: true
})(Thumb);
exports.RawThumb = Thumb;