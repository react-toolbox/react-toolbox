'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Tooltip = require('./Tooltip.js');

var _theme = require('./theme.scss');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _Tooltip.tooltipFactory)(_theme2.default);