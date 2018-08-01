'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavDrawer = exports.navDrawerFactory = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _reactCssThemr = require('react-css-themr');

var _Drawer = require('../drawer/Drawer');

var _Drawer2 = _interopRequireDefault(_Drawer);

var _identifiers = require('../identifiers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var factory = function factory(Drawer) {
  var NavDrawer = function NavDrawer(_ref) {
    var _classnames;

    var active = _ref.active,
        className = _ref.className,
        clipped = _ref.clipped,
        permanentAt = _ref.permanentAt,
        pinned = _ref.pinned,
        theme = _ref.theme,
        rest = _objectWithoutProperties(_ref, ['active', 'className', 'clipped', 'permanentAt', 'pinned', 'theme']);

    var _className = (0, _classnames3.default)((_classnames = {}, _defineProperty(_classnames, theme.pinned, pinned), _defineProperty(_classnames, theme.clipped, clipped), _classnames), className);

    return _react2.default.createElement(Drawer, _extends({}, rest, {
      active: active || pinned,
      className: _className,
      insideTree: true,
      theme: theme,
      themeNamespace: 'navDrawer',
      withOverlay: !pinned
    }));
  };

  NavDrawer.propTypes = {
    active: _propTypes2.default.bool,
    children: _propTypes2.default.node,
    className: _propTypes2.default.string,
    clipped: _propTypes2.default.bool,
    permanentAt: _propTypes2.default.oneOf(['sm', 'smTablet', 'md', 'lg', 'lgTablet', 'xl', 'xxl', 'xxxl']),
    pinned: _propTypes2.default.bool,
    right: _propTypes2.default.bool,
    theme: _propTypes2.default.shape({
      clipped: _propTypes2.default.string,
      pinned: _propTypes2.default.string
    })
  };

  NavDrawer.defaultProps = {
    className: '',
    pinned: false
  };

  return NavDrawer;
};

var NavDrawer = factory(_Drawer2.default);
exports.default = (0, _reactCssThemr.themr)(_identifiers.LAYOUT)(NavDrawer);
exports.navDrawerFactory = factory;
exports.NavDrawer = NavDrawer;