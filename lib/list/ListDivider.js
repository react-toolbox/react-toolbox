'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ListDivider = function ListDivider(_ref) {
  var inset = _ref.inset;

  var className = inset ? _style2.default.divider + ' ' + _style2.default.inset : _style2.default.divider;
  return _react2.default.createElement('hr', { className: className });
};

ListDivider.propTypes = {
  inset: _react2.default.PropTypes.bool
};

ListDivider.defaultProps = {
  inset: false
};

exports.default = ListDivider;