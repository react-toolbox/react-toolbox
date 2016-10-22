'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Layout = exports.layoutFactory = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactCssThemr = require('react-css-themr');

var _filterReactChildren = require('../utils/filter-react-children.js');

var _filterReactChildren2 = _interopRequireDefault(_filterReactChildren);

var _isComponentOfType = require('../utils/is-component-of-type.js');

var _isComponentOfType2 = _interopRequireDefault(_isComponentOfType);

var _SideNav = require('./SideNav');

var _SideNav2 = _interopRequireDefault(_SideNav);

var _identifiers = require('../identifiers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XL_VIEWPORT = 1440;

var factory = function factory(SideNav) {
  var isUnknown = function isUnknown(child) {
    return !(0, _isComponentOfType2.default)(SideNav, child);
  };
  var isSideNav = function isSideNav(child) {
    return (0, _isComponentOfType2.default)(SideNav, child);
  };
  var isOnRight = function isOnRight(child) {
    return child.props.type === 'right';
  };
  var isOnLeft = function isOnLeft(child) {
    return !isOnRight(child);
  };
  var isLeftSideNav = function isLeftSideNav(child) {
    return isSideNav(child) && isOnLeft(child);
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
        width: null
      }, _this.handleResize = function () {
        var _this$rootNode$getBou = _this.rootNode.getBoundingClientRect();

        var width = _this$rootNode$getBou.width;

        _this.setState({ width: width });
      }, _this.getLeftSideNav = function () {
        return (0, _filterReactChildren2.default)(_this.props.children, isLeftSideNav)[0];
      }, _this.isPinned = function () {
        var sideNav = _this.getLeftSideNav();
        if (!sideNav) return false;
        var _sideNav$props = sideNav.props;
        var permanentAt = _sideNav$props.permanentAt;
        var pinned = _sideNav$props.pinned;
        var width = _this.state.width;

        return width > permanentAt || pinned;
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Layout, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
      }
    }, {
      key: 'componentDidUpdate',
      value: function componentDidUpdate() {
        console.log(this.leftSideNav);
        var leftSideNode = this.leftSideNav.getWrappedInstance().rootNode;

        var _leftSideNode$getBoun = leftSideNode.getBoundingClientRect();

        var width = _leftSideNode$getBoun.width;

        console.log(width);
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
      }
    }, {
      key: 'render',
      value: function render() {
        var _this2 = this;

        var _props = this.props;
        var children = _props.children;
        var theme = _props.theme;

        var unknown = (0, _filterReactChildren2.default)(children, isUnknown);
        var pinned = this.isPinned();

        var leftSideNav = this.getLeftSideNav() && (0, _react.cloneElement)(this.getLeftSideNav(), {
          ref: function ref(node) {
            _this2.leftSideNav = node;
          },
          active: pinned,
          pinned: pinned
        });

        return _react2.default.createElement(
          'div',
          { className: theme.layout, ref: function ref(node) {
              _this2.rootNode = node;
            } },
          leftSideNav,
          unknown
        );
      }
    }]);

    return Layout;
  }(_react.Component);

  Layout.propTypes = {
    children: _react.PropTypes.node,
    theme: _react.PropTypes.object
  };


  return Layout;
};

var Layout = factory(_SideNav2.default);
exports.default = (0, _reactCssThemr.themr)(_identifiers.LAYOUT)(Layout);
exports.layoutFactory = factory;
exports.Layout = Layout;