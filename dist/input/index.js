'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Input = undefined;

var _reactCssThemr = require('react-css-themr');

var _identifiers = require('../identifiers');

var _Input = require('./Input');

var _FontIcon = require('../font_icon/FontIcon');

var _theme = require('./theme.css');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Input = (0, _Input.inputFactory)(_FontIcon.FontIcon);
var ThemedInput = (0, _reactCssThemr.themr)(_identifiers.INPUT, _theme2.default, { withRef: true })(Input);

exports.default = ThemedInput;
exports.Input = ThemedInput;