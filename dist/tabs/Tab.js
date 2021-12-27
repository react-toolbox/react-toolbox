'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tab = exports.tabFactory = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _reactCssThemr = require('react-css-themr');

var _identifiers = require('../identifiers');

var _Ripple = require('../ripple/Ripple');

var _Ripple2 = _interopRequireDefault(_Ripple);

var _FontIcon = require('../font_icon/FontIcon');

var _FontIcon2 = _interopRequireDefault(_FontIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var factory = function factory(ripple, FontIcon) {
  var Tab = function (_Component) {
    _inherits(Tab, _Component);

    function Tab() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, Tab);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Tab.__proto__ || Object.getPrototypeOf(Tab)).call.apply(_ref, [this].concat(args))), _this), _this.handleClick = function (event) {
        if (!_this.props.disabled && _this.props.onClick) {
          _this.props.onClick(event, _this.props.index);
        }
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Tab, [{
      key: 'componentDidUpdate',
      value: function componentDidUpdate(prevProps) {
        if (!prevProps.active && this.props.active && this.props.onActive) {
          this.props.onActive();
        }
      }
    }, {
      key: 'render',
      value: function render() {
        var _classnames;

        var _props = this.props,
            index = _props.index,
            onActive = _props.onActive,
            active = _props.active,
            activeClassName = _props.activeClassName,
            children = _props.children,
            className = _props.className,
            disabled = _props.disabled,
            hidden = _props.hidden,
            label = _props.label,
            icon = _props.icon,
            theme = _props.theme,
            other = _objectWithoutProperties(_props, ['index', 'onActive', 'active', 'activeClassName', 'children', 'className', 'disabled', 'hidden', 'label', 'icon', 'theme']);

        var _className = (0, _classnames3.default)(theme.label, (_classnames = {}, _defineProperty(_classnames, theme.active, active), _defineProperty(_classnames, theme.hidden, hidden), _defineProperty(_classnames, theme.withText, label), _defineProperty(_classnames, theme.withIcon, icon), _defineProperty(_classnames, theme.disabled, disabled), _defineProperty(_classnames, activeClassName, active), _classnames), className);

        return _react2.default.createElement(
          'div',
          _extends({}, other, { 'data-react-toolbox': 'tab', role: 'tab', tabIndex: '0', className: _className, onClick: this.handleClick }),
          icon && _react2.default.createElement(FontIcon, { className: theme.icon, value: icon }),
          label,
          children
        );
      }
    }]);

    return Tab;
  }(_react.Component);

  Tab.propTypes = {
    active: _propTypes2.default.bool,
    activeClassName: _propTypes2.default.string,
    children: _propTypes2.default.node,
    className: _propTypes2.default.string,
    disabled: _propTypes2.default.bool,
    hidden: _propTypes2.default.bool,
    icon: _propTypes2.default.node,
    index: _propTypes2.default.number,
    label: _propTypes2.default.node,
    onActive: _propTypes2.default.func,
    onClick: _propTypes2.default.func,
    theme: _propTypes2.default.shape({
      active: _propTypes2.default.string,
      disabled: _propTypes2.default.string,
      hidden: _propTypes2.default.string,
      label: _propTypes2.default.string,
      rippleWrapper: _propTypes2.default.string,
      withIcon: _propTypes2.default.string,
      withText: _propTypes2.default.string
    })
  };
  Tab.defaultProps = {
    active: false,
    className: '',
    disabled: false,
    hidden: false
  };


  return ripple(Tab);
};

var Tab = factory((0, _Ripple2.default)({ centered: false }), _FontIcon2.default);
exports.default = (0, _reactCssThemr.themr)(_identifiers.TABS)(Tab);
exports.tabFactory = factory;
exports.Tab = Tab;