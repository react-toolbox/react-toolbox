'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SideNav = exports.Layout = undefined;

var _reactCssThemr = require('react-css-themr');

var _identifiers = require('../identifiers');

var _SideNav = require('./SideNav');

var _Layout = require('./Layout');

var _drawer = require('../drawer');

var _drawer2 = _interopRequireDefault(_drawer);

var _theme = require('./theme.css');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var injectTheme = function injectTheme(component) {
  return (0, _reactCssThemr.themr)(_identifiers.LAYOUT, _theme2.default, { withRef: true })(component);
};
var ThemedSideNav = injectTheme((0, _SideNav.sideNavFactory)(_drawer2.default));
var ThemedLayout = injectTheme((0, _Layout.layoutFactory)(ThemedSideNav));

exports.default = ThemedLayout;
exports.Layout = ThemedLayout;
exports.SideNav = ThemedSideNav;