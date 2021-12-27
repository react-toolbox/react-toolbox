'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tabs = exports.Tab = undefined;

var _reactCssThemr = require('react-css-themr');

var _identifiers = require('../identifiers');

var _Tabs = require('./Tabs');

var _TabContent = require('./TabContent');

var _Tab = require('./Tab');

var _ripple = require('../ripple');

var _ripple2 = _interopRequireDefault(_ripple);

var _FontIcon = require('../font_icon/FontIcon');

var _theme = require('./theme.css');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var applyTheme = function applyTheme(Component) {
  return (0, _reactCssThemr.themr)(_identifiers.TABS, _theme2.default)(Component);
};
var ThemedTabContent = applyTheme(_TabContent.TabContent);
var ThemedTab = applyTheme((0, _Tab.tabFactory)((0, _ripple2.default)({ centered: false }), _FontIcon.FontIcon));
var ThemedTabs = applyTheme((0, _Tabs.tabsFactory)(ThemedTab, ThemedTabContent, _FontIcon.FontIcon));

exports.Tab = ThemedTab;
exports.Tabs = ThemedTabs;