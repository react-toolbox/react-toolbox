'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RawButton = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _font_icon = require('../font_icon');

var _font_icon2 = _interopRequireDefault(_font_icon);

var _ripple = require('../ripple');

var _ripple2 = _interopRequireDefault(_ripple);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Button = function (_React$Component) {
  _inherits(Button, _React$Component);

  function Button() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, Button);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Button)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.handleMouseUp = function (event) {
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
      var _ClassNames;

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
      var raised = _props.raised;

      var others = _objectWithoutProperties(_props, ['accent', 'children', 'className', 'flat', 'floating', 'href', 'icon', 'inverse', 'label', 'mini', 'neutral', 'primary', 'raised']);

      var element = href ? 'a' : 'button';
      var level = primary ? 'primary' : accent ? 'accent' : 'neutral';
      var shape = flat ? 'flat' : raised ? 'raised' : floating ? 'floating' : 'flat';

      var classes = (0, _classnames2.default)([_style2.default[shape]], (_ClassNames = {}, _defineProperty(_ClassNames, _style2.default[level], neutral), _defineProperty(_ClassNames, _style2.default.mini, mini), _defineProperty(_ClassNames, _style2.default.inverse, inverse), _ClassNames), className);

      var props = _extends({}, others, {
        href: href,
        ref: 'button',
        className: classes,
        disabled: this.props.disabled,
        onMouseUp: this.handleMouseUp,
        onMouseLeave: this.handleMouseLeave,
        'data-react-toolbox': 'button'
      });

      return _react2.default.createElement(element, props, icon ? _react2.default.createElement(_font_icon2.default, { className: _style2.default.icon, value: icon }) : null, label, children);
    }
  }]);

  return Button;
}(_react2.default.Component);

Button.propTypes = {
  accent: _react2.default.PropTypes.bool,
  children: _react2.default.PropTypes.node,
  className: _react2.default.PropTypes.string,
  disabled: _react2.default.PropTypes.bool,
  flat: _react2.default.PropTypes.bool,
  floating: _react2.default.PropTypes.bool,
  href: _react2.default.PropTypes.string,
  icon: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.element]),
  inverse: _react2.default.PropTypes.bool,
  label: _react2.default.PropTypes.string,
  mini: _react2.default.PropTypes.bool,
  neutral: _react2.default.PropTypes.bool,
  onMouseLeave: _react2.default.PropTypes.func,
  onMouseUp: _react2.default.PropTypes.func,
  primary: _react2.default.PropTypes.bool,
  raised: _react2.default.PropTypes.bool,
  type: _react2.default.PropTypes.string
};
Button.defaultProps = {
  accent: false,
  className: '',
  flat: false,
  floating: false,
  mini: false,
  neutral: true,
  primary: false,
  raised: false
};
exports.default = (0, _ripple2.default)({ centered: false })(Button);
exports.RawButton = Button;