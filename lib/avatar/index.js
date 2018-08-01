'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Avatar = undefined;

var _reactCssThemr = require('react-css-themr');

var _identifiers = require('../identifiers');

var _Avatar = require('./Avatar');

var _FontIcon = require('../font_icon/FontIcon');

var _theme = require('./theme.css');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Avatar = (0, _Avatar.avatarFactory)(_FontIcon.FontIcon);
var ThemedAvatar = (0, _reactCssThemr.themr)(_identifiers.AVATAR, _theme2.default)(Avatar);

exports.default = ThemedAvatar;
exports.Avatar = ThemedAvatar;