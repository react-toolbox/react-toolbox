'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _style = require('./style.menu_divider');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MenuDivider = function MenuDivider() {
  return _react2.default.createElement('hr', { 'data-react-toolbox': 'menu-divider', className: _style2.default.root });
};

exports.default = MenuDivider;