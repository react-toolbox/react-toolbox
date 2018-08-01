'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Panel = exports.NavDrawer = exports.Sidebar = exports.Layout = undefined;

var _reactCssThemr = require('react-css-themr');

var _identifiers = require('../identifiers');

var _Layout = require('./Layout');

var _Sidebar = require('./Sidebar');

var _NavDrawer = require('./NavDrawer');

var _Panel = require('./Panel');

var _app_bar = require('../app_bar');

var _drawer = require('../drawer');

var _theme = require('./theme.css');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var injectTheme = function injectTheme(component) {
  return (0, _reactCssThemr.themr)(_identifiers.LAYOUT, _theme2.default)(component);
};
var ThemedNavDrawer = injectTheme((0, _NavDrawer.navDrawerFactory)(_drawer.Drawer));
var ThemedSidebar = injectTheme((0, _Sidebar.sidebarFactory)(_drawer.Drawer));
var ThemedPanel = injectTheme(_Panel.Panel);
var ThemedLayout = injectTheme((0, _Layout.layoutFactory)(_app_bar.AppBar, ThemedNavDrawer, ThemedSidebar));

exports.default = ThemedLayout;
exports.Layout = ThemedLayout;
exports.Sidebar = ThemedSidebar;
exports.NavDrawer = ThemedNavDrawer;
exports.Panel = ThemedPanel;