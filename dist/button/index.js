'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BrowseButton = exports.IconButton = exports.Button = undefined;

var _reactCssThemr = require('react-css-themr');

var _identifiers = require('../identifiers');

var _Button = require('./Button');

var _BrowseButton = require('./BrowseButton');

var _IconButton = require('./IconButton');

var _FontIcon = require('../font_icon/FontIcon');

var _ripple = require('../ripple');

var _ripple2 = _interopRequireDefault(_ripple);

var _theme = require('./theme.css');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Button = (0, _Button.buttonFactory)((0, _ripple2.default)({ centered: false }), _FontIcon.FontIcon);
var IconButton = (0, _IconButton.iconButtonFactory)((0, _ripple2.default)({ centered: true }), _FontIcon.FontIcon);
var BrowseButton = (0, _BrowseButton.browseButtonFactory)((0, _ripple2.default)({ centered: false }), _FontIcon.FontIcon);
var ThemedButton = (0, _reactCssThemr.themr)(_identifiers.BUTTON, _theme2.default)(Button);
var ThemedIconButton = (0, _reactCssThemr.themr)(_identifiers.BUTTON, _theme2.default)(IconButton);
var ThemedBrowseButton = (0, _reactCssThemr.themr)(_identifiers.BUTTON, _theme2.default)(BrowseButton);

exports.default = ThemedButton;
exports.Button = ThemedButton;
exports.IconButton = ThemedIconButton;
exports.BrowseButton = ThemedBrowseButton;