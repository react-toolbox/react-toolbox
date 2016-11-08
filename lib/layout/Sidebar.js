'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Sidebar = exports.sidebarFactory = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

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
  var Sidebar = function Sidebar(_ref) {
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
      themeNamespace: 'sidebar',
      type: 'right',
      withOverlay: !pinned
    }));
  };

  Sidebar.propTypes = {
    active: _react.PropTypes.bool,
    children: _react.PropTypes.node,
    className: _react.PropTypes.string,
    clipped: _react.PropTypes.bool,
    permanentAt: _react.PropTypes.oneOf(['sm', 'smTablet', 'md', 'lg', 'lgTablet', 'xl', 'xxl', 'xxxl']),
    pinned: _react.PropTypes.bool,
    theme: _react.PropTypes.object,
    width: _react.PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 25, 33, 50, 66, 75, 100])
  };

  Sidebar.defaultProps = {
    className: '',
    pinned: false,
    right: false
  };

  return Sidebar;
};

var Sidebar = factory(_Drawer2.default);
exports.default = (0, _reactCssThemr.themr)(_identifiers.LAYOUT)(Sidebar);
exports.sidebarFactory = factory;
exports.Sidebar = Sidebar;