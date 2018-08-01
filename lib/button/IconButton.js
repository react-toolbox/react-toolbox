'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IconButton = exports.iconButtonFactory = undefined;

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

var _FontIcon = require('../font_icon/FontIcon');

var _FontIcon2 = _interopRequireDefault(_FontIcon);

var _Ripple = require('../ripple/Ripple');

var _Ripple2 = _interopRequireDefault(_Ripple);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var factory = function factory(ripple, FontIcon) {
  var IconButton = function (_Component) {
    _inherits(IconButton, _Component);

    function IconButton() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, IconButton);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = IconButton.__proto__ || Object.getPrototypeOf(IconButton)).call.apply(_ref, [this].concat(args))), _this), _this.getLevel = function () {
        if (_this.props.primary) return 'primary';
        if (_this.props.accent) return 'accent';
        return 'neutral';
      }, _this.handleMouseUp = function (event) {
        _this.buttonNode.blur();
        if (_this.props.onMouseUp) _this.props.onMouseUp(event);
      }, _this.handleMouseLeave = function (event) {
        _this.buttonNode.blur();
        if (_this.props.onMouseLeave) _this.props.onMouseLeave(event);
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(IconButton, [{
      key: 'render',
      value: function render() {
        var _classnames,
            _this2 = this;

        var _props = this.props,
            accent = _props.accent,
            children = _props.children,
            className = _props.className,
            href = _props.href,
            icon = _props.icon,
            inverse = _props.inverse,
            neutral = _props.neutral,
            primary = _props.primary,
            theme = _props.theme,
            type = _props.type,
            others = _objectWithoutProperties(_props, ['accent', 'children', 'className', 'href', 'icon', 'inverse', 'neutral', 'primary', 'theme', 'type']);

        var element = href ? 'a' : 'button';
        var level = this.getLevel();
        var classes = (0, _classnames3.default)([theme.toggle], (_classnames = {}, _defineProperty(_classnames, theme[level], neutral), _defineProperty(_classnames, theme.inverse, inverse), _classnames), className);

        var props = _extends({}, others, {
          href: href,
          ref: function ref(node) {
            _this2.buttonNode = node;
          },
          className: classes,
          disabled: this.props.disabled,
          onMouseUp: this.handleMouseUp,
          onMouseLeave: this.handleMouseLeave,
          type: !href ? type : null,
          'data-react-toolbox': 'button'
        });

        var iconElement = typeof icon === 'string' ? _react2.default.createElement(FontIcon, { className: theme.icon, value: icon }) : icon;

        return _react2.default.createElement(element, props, icon && iconElement, children);
      }
    }]);

    return IconButton;
  }(_react.Component);

  IconButton.propTypes = {
    accent: _propTypes2.default.bool,
    children: _propTypes2.default.node,
    className: _propTypes2.default.string,
    disabled: _propTypes2.default.bool,
    href: _propTypes2.default.string,
    icon: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element]),
    inverse: _propTypes2.default.bool,
    neutral: _propTypes2.default.bool,
    onMouseLeave: _propTypes2.default.func,
    onMouseUp: _propTypes2.default.func,
    primary: _propTypes2.default.bool,
    theme: _propTypes2.default.shape({
      accent: _propTypes2.default.string,
      button: _propTypes2.default.string,
      flat: _propTypes2.default.string,
      floating: _propTypes2.default.string,
      icon: _propTypes2.default.string,
      inverse: _propTypes2.default.string,
      mini: _propTypes2.default.string,
      neutral: _propTypes2.default.string,
      primary: _propTypes2.default.string,
      raised: _propTypes2.default.string,
      rippleWrapper: _propTypes2.default.string,
      toggle: _propTypes2.default.string
    }),
    type: _propTypes2.default.string
  };
  IconButton.defaultProps = {
    accent: false,
    className: '',
    neutral: true,
    primary: false,
    type: 'button'
  };


  return ripple(IconButton);
};

var IconButton = factory((0, _Ripple2.default)({ centered: true }), _FontIcon2.default);
exports.default = (0, _reactCssThemr.themr)(_identifiers.BUTTON)(IconButton);
exports.iconButtonFactory = factory;
exports.IconButton = IconButton;