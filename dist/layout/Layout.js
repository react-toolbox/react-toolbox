'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Layout = exports.layoutFactory = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _reactCssThemr = require('react-css-themr');

var _utils = require('../utils/utils');

var _filterReactChildren = require('../utils/filter-react-children');

var _filterReactChildren2 = _interopRequireDefault(_filterReactChildren);

var _isComponentOfType = require('../utils/is-component-of-type');

var _isComponentOfType2 = _interopRequireDefault(_isComponentOfType);

var _AppBar = require('../app_bar/AppBar');

var _AppBar2 = _interopRequireDefault(_AppBar);

var _NavDrawer = require('./NavDrawer');

var _NavDrawer2 = _interopRequireDefault(_NavDrawer);

var _Sidebar = require('./Sidebar');

var _Sidebar2 = _interopRequireDefault(_Sidebar);

var _isBrowser = require('../utils/is-browser');

var _isBrowser2 = _interopRequireDefault(_isBrowser);

var _breakpoints = require('../utils/breakpoints');

var _breakpoints2 = _interopRequireDefault(_breakpoints);

var _identifiers = require('../identifiers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var factory = function factory(AppBar, NavDrawer, Sidebar) {
  var isNavDrawer = function isNavDrawer(child) {
    return (0, _isComponentOfType2.default)(NavDrawer, child);
  };
  var isSidebar = function isSidebar(child) {
    return (0, _isComponentOfType2.default)(Sidebar, child);
  };
  var isAppBar = function isAppBar(child) {
    return (0, _isComponentOfType2.default)(AppBar, child);
  };
  var isUnknown = function isUnknown(child) {
    return !isNavDrawer(child) && !isSidebar(child) && !isAppBar(child);
  };

  var Layout = function (_Component) {
    _inherits(Layout, _Component);

    function Layout() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, Layout);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Layout.__proto__ || Object.getPrototypeOf(Layout)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
        width: (0, _isBrowser2.default)() && (0, _utils.getViewport)().width
      }, _this.handleResize = function () {
        _this.setState({ width: (0, _utils.getViewport)().width });
      }, _this.isPinned = function (sideNav) {
        if (sideNav) {
          var _sideNav$props = sideNav.props,
              permanentAt = _sideNav$props.permanentAt,
              pinned = _sideNav$props.pinned;
          var width = _this.state.width;

          return width > _breakpoints2.default[permanentAt] || pinned;
        }
        return undefined;
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Layout, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        if (!this.state.width) this.handleResize();
        window.addEventListener('resize', this.handleResize);
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
      }
    }, {
      key: 'render',
      value: function render() {
        var _classnames;

        var _props = this.props,
            children = _props.children,
            className = _props.className,
            theme = _props.theme,
            rest = _objectWithoutProperties(_props, ['children', 'className', 'theme']);

        var appBar = (0, _filterReactChildren2.default)(children, isAppBar)[0];
        var navDrawer = (0, _filterReactChildren2.default)(children, isNavDrawer)[0];
        var sidebar = (0, _filterReactChildren2.default)(children, isSidebar)[0];
        var unknown = (0, _filterReactChildren2.default)(children, isUnknown);
        var appBarFixed = appBar && appBar.props.fixed;
        var navDrawerPinned = this.isPinned(navDrawer);
        var navDrawerClipped = navDrawer && navDrawer.props.clipped;
        var sidebarWidth = sidebar && sidebar.props.width;
        var sidebarPinned = this.isPinned(sidebar);
        var sidebarClipped = sidebar && sidebar.props.clipped;

        var clonedAppBar = appBar && (0, _react.cloneElement)(appBar, {
          theme: theme,
          themeNamespace: 'appbar'
        });

        var clonedLeftSideNav = navDrawer && (0, _react.cloneElement)(navDrawer, {
          clipped: navDrawerClipped,
          pinned: navDrawerPinned
        });

        var clonedRightSideNav = sidebar && (0, _react.cloneElement)(sidebar, {
          clipped: sidebarClipped,
          pinned: sidebarPinned
        });

        var _className = (0, _classnames3.default)(theme.layout, theme['sidebarWidth' + sidebarWidth], (_classnames = {}, _defineProperty(_classnames, theme.navDrawerPinned, navDrawerPinned), _defineProperty(_classnames, theme.navDrawerClipped, navDrawerClipped), _defineProperty(_classnames, theme.sidebarPinned, sidebarPinned), _defineProperty(_classnames, theme.sidebarClipped, sidebarClipped), _defineProperty(_classnames, theme.appbarFixed, appBarFixed), _classnames), className);

        return _react2.default.createElement(
          'div',
          _extends({}, rest, { className: _className }),
          clonedLeftSideNav,
          clonedAppBar,
          unknown,
          clonedRightSideNav
        );
      }
    }]);

    return Layout;
  }(_react.Component);

  Layout.propTypes = {
    children: _propTypes2.default.node,
    className: _propTypes2.default.string,
    theme: _propTypes2.default.shape({
      appbarFixed: _propTypes2.default.string,
      layout: _propTypes2.default.string,
      navDrawerClipped: _propTypes2.default.string,
      navDrawerPinned: _propTypes2.default.string,
      sidebarClipped: _propTypes2.default.string,
      sidebarPinned: _propTypes2.default.string
    })
  };
  Layout.defaultProps = {
    className: ''
  };


  return Layout;
};

var Layout = factory(_AppBar2.default, _NavDrawer2.default, _Sidebar2.default);
exports.default = (0, _reactCssThemr.themr)(_identifiers.LAYOUT)(Layout);
exports.layoutFactory = factory;
exports.Layout = Layout;