'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SideNav = exports.sideNavFactory = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var factory = function factory(Drawer) {
  var SideNav = function (_Component) {
    _inherits(SideNav, _Component);

    function SideNav() {
      _classCallCheck(this, SideNav);

      return _possibleConstructorReturn(this, (SideNav.__proto__ || Object.getPrototypeOf(SideNav)).apply(this, arguments));
    }

    _createClass(SideNav, [{
      key: 'render',
      value: function render() {
        var _this2 = this;

        var _props = this.props;
        var active = _props.active;
        var children = _props.children;
        var permanentAt = _props.permanentAt;
        var pinned = _props.pinned;
        var theme = _props.theme;

        var rest = _objectWithoutProperties(_props, ['active', 'children', 'permanentAt', 'pinned', 'theme']);

        return _react2.default.createElement(
          Drawer,
          _extends({
            active: active,
            lockScroll: false,
            overlayClassName: (0, _classnames3.default)(_defineProperty({}, theme.pinned, pinned)),
            theme: theme,
            themeNamespace: 'drawer'
          }, rest),
          _react2.default.createElement(
            'div',
            { ref: function ref(node) {
                _this2.rootNode = node;
              } },
            children
          )
        );
      }
    }]);

    return SideNav;
  }(_react.Component);

  SideNav.propTypes = {
    active: _react.PropTypes.bool,
    permanentAt: _react.PropTypes.number
  };

  SideNav.defaultProps = {
    permanentAt: 1200,
    pinned: false
  };

  return SideNav;
};

var SideNav = factory(_Drawer2.default);
exports.default = (0, _reactCssThemr.themr)(_identifiers.LAYOUT, null, { withRef: true })(SideNav);
exports.sideNavFactory = factory;
exports.SideNav = SideNav;