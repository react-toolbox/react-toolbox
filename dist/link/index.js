'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Link = undefined;

var _reactCssThemr = require('react-css-themr');

var _identifiers = require('../identifiers');

var _Link = require('./Link');

var _theme = require('./theme.css');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ThemedLink = (0, _reactCssThemr.themr)(_identifiers.LINK, _theme2.default)(_Link.Link);

exports.default = ThemedLink;
exports.Link = ThemedLink;