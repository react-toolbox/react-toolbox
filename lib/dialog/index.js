'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Dialog = undefined;

var _reactCssThemr = require('react-css-themr');

var _identifiers = require('../identifiers');

var _Dialog = require('./Dialog');

var _overlay = require('../overlay');

var _button = require('../button');

var _theme = require('./theme.css');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Dialog = (0, _Dialog.dialogFactory)(_overlay.Overlay, _button.Button);
var ThemedDialog = (0, _reactCssThemr.themr)(_identifiers.DIALOG, _theme2.default)(Dialog);

exports.default = ThemedDialog;
exports.Dialog = ThemedDialog;