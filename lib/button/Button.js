'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Button = exports.buttonFactory = undefined;

var _redboxReact2 = require('redbox-react');

var _redboxReact3 = _interopRequireDefault(_redboxReact2);

var _reactTransformCatchErrors3 = require('react-transform-catch-errors');

var _reactTransformCatchErrors4 = _interopRequireDefault(_reactTransformCatchErrors3);

var _react2 = require('react');

var _react3 = _interopRequireDefault(_react2);

var _reactTransformHmr3 = require('react-transform-hmr');

var _reactTransformHmr4 = _interopRequireDefault(_reactTransformHmr3);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _reactCssThemr = require('react-css-themr');

var _identifiers = require('../identifiers.js');

var _FontIcon = require('../font_icon/FontIcon.js');

var _FontIcon2 = _interopRequireDefault(_FontIcon);

var _Ripple = require('../ripple/Ripple.js');

var _Ripple2 = _interopRequireDefault(_Ripple);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
  Button: {
    displayName: 'Button',
    isInFunction: true
  }
};

var _reactTransformHmr2 = (0, _reactTransformHmr4.default)({
  filename: 'components/button/Button.js',
  components: _components,
  locals: [module],
  imports: [_react3.default]
});

var _reactTransformCatchErrors2 = (0, _reactTransformCatchErrors4.default)({
  filename: 'components/button/Button.js',
  components: _components,
  locals: [],
  imports: [_react3.default, _redboxReact3.default]
});

function _wrapComponent(id) {
  return function (Component) {
    return _reactTransformHmr2(_reactTransformCatchErrors2(Component, id), id);
  };
}

var factory = function factory(ripple, FontIcon) {
  var _class, _temp2;

  var Button = _wrapComponent('Button')((_temp2 = _class = function (_Component) {
    _inherits(Button, _Component);

    function Button() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, Button);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Button.__proto__ || Object.getPrototypeOf(Button)).call.apply(_ref, [this].concat(args))), _this), _this.handleMouseUp = function (event) {
        _this.refs.button.blur();
        if (_this.props.onMouseUp) _this.props.onMouseUp(event);
      }, _this.handleMouseLeave = function (event) {
        _this.refs.button.blur();
        if (_this.props.onMouseLeave) _this.props.onMouseLeave(event);
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Button, [{
      key: 'render',
      value: function render() {
        var _classnames;

        var _props = this.props;
        var accent = _props.accent;
        var children = _props.children;
        var className = _props.className;
        var flat = _props.flat;
        var floating = _props.floating;
        var href = _props.href;
        var icon = _props.icon;
        var inverse = _props.inverse;
        var label = _props.label;
        var mini = _props.mini;
        var neutral = _props.neutral;
        var primary = _props.primary;
        var theme = _props.theme;
        var raised = _props.raised;

        var others = _objectWithoutProperties(_props, ['accent', 'children', 'className', 'flat', 'floating', 'href', 'icon', 'inverse', 'label', 'mini', 'neutral', 'primary', 'theme', 'raised']);

        var element = href ? 'a' : 'button';
        var level = primary ? 'primary' : accent ? 'accent' : 'neutral';
        var shape = flat ? 'flat' : raised ? 'raised' : floating ? 'floating' : 'flat';

        var classes = (0, _classnames3.default)(theme.button, [theme[shape]], (_classnames = {}, _defineProperty(_classnames, theme[level], neutral), _defineProperty(_classnames, theme.mini, mini), _defineProperty(_classnames, theme.inverse, inverse), _classnames), className);

        var props = _extends({}, others, {
          href: href,
          ref: 'button',
          className: classes,
          disabled: this.props.disabled,
          onMouseUp: this.handleMouseUp,
          onMouseLeave: this.handleMouseLeave,
          'data-react-toolbox': 'button'
        });

        return _react3.default.createElement(element, props, icon ? _react3.default.createElement(FontIcon, { className: theme.icon, value: icon }) : null, label, children);
      }
    }]);

    return Button;
  }(_react2.Component), _class.propTypes = {
    accent: _react2.PropTypes.bool,
    children: _react2.PropTypes.node,
    className: _react2.PropTypes.string,
    disabled: _react2.PropTypes.bool,
    flat: _react2.PropTypes.bool,
    floating: _react2.PropTypes.bool,
    href: _react2.PropTypes.string,
    icon: _react2.PropTypes.oneOfType([_react2.PropTypes.string, _react2.PropTypes.element]),
    inverse: _react2.PropTypes.bool,
    label: _react2.PropTypes.string,
    mini: _react2.PropTypes.bool,
    neutral: _react2.PropTypes.bool,
    onMouseLeave: _react2.PropTypes.func,
    onMouseUp: _react2.PropTypes.func,
    primary: _react2.PropTypes.bool,
    raised: _react2.PropTypes.bool,
    theme: _react2.PropTypes.shape({
      accent: _react2.PropTypes.string,
      button: _react2.PropTypes.string,
      flat: _react2.PropTypes.string,
      floating: _react2.PropTypes.string,
      icon: _react2.PropTypes.string,
      inverse: _react2.PropTypes.string,
      mini: _react2.PropTypes.string,
      neutral: _react2.PropTypes.string,
      primary: _react2.PropTypes.string,
      raised: _react2.PropTypes.string,
      rippleWrapper: _react2.PropTypes.string,
      toggle: _react2.PropTypes.string
    }),
    type: _react2.PropTypes.string
  }, _class.defaultProps = {
    accent: false,
    className: '',
    flat: false,
    floating: false,
    mini: false,
    neutral: true,
    primary: false,
    raised: false
  }, _temp2));

  return ripple(Button);
};

var Button = factory((0, _Ripple2.default)({ centered: false }), _FontIcon2.default);
exports.default = (0, _reactCssThemr.themr)(_identifiers.BUTTON)(Button);
exports.buttonFactory = factory;
exports.Button = Button;