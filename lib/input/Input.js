'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _font_icon = require('../font_icon');

var _font_icon2 = _interopRequireDefault(_font_icon);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Input = function (_React$Component) {
  _inherits(Input, _React$Component);

  function Input() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, Input);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Input)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.handleChange = function (event) {
      if (_this.props.onChange) _this.props.onChange(event.target.value, event);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Input, [{
    key: 'blur',
    value: function blur() {
      this.refs.input.blur();
    }
  }, {
    key: 'focus',
    value: function focus() {
      this.refs.input.focus();
    }
  }, {
    key: 'render',
    value: function render() {
      var _ClassNames2;

      var _props = this.props;
      var children = _props.children;
      var disabled = _props.disabled;
      var error = _props.error;
      var floating = _props.floating;
      var hint = _props.hint;
      var icon = _props.icon;
      var labelText = _props.label;
      var maxLength = _props.maxLength;
      var multiline = _props.multiline;
      var required = _props.required;
      var type = _props.type;
      var value = _props.value;

      var others = _objectWithoutProperties(_props, ['children', 'disabled', 'error', 'floating', 'hint', 'icon', 'label', 'maxLength', 'multiline', 'required', 'type', 'value']);

      var length = maxLength && value ? value.length : 0;
      var labelClassName = (0, _classnames2.default)(_style2.default.label, _defineProperty({}, _style2.default.fixed, !floating));

      var className = (0, _classnames2.default)(_style2.default.root, (_ClassNames2 = {}, _defineProperty(_ClassNames2, _style2.default.disabled, disabled), _defineProperty(_ClassNames2, _style2.default.errored, error), _defineProperty(_ClassNames2, _style2.default.hidden, type === 'hidden'), _defineProperty(_ClassNames2, _style2.default.withIcon, icon), _ClassNames2), this.props.className);

      var valuePresent = value !== null && value !== undefined && value !== '' && !Number.isNaN(value);

      var InputElement = _react2.default.createElement(multiline ? 'textarea' : 'input', _extends({}, others, {
        className: (0, _classnames2.default)(_style2.default.input, _defineProperty({}, _style2.default.filled, valuePresent)),
        onChange: this.handleChange,
        ref: 'input',
        role: 'input',
        disabled: disabled,
        required: required,
        type: type,
        value: value,
        maxLength: maxLength
      }));

      return _react2.default.createElement(
        'div',
        { 'data-react-toolbox': 'input', className: className },
        InputElement,
        icon ? _react2.default.createElement(_font_icon2.default, { className: _style2.default.icon, value: icon }) : null,
        _react2.default.createElement('span', { className: _style2.default.bar }),
        labelText ? _react2.default.createElement(
          'label',
          { className: labelClassName },
          labelText,
          required ? _react2.default.createElement(
            'span',
            { className: _style2.default.required },
            ' * '
          ) : null
        ) : null,
        hint ? _react2.default.createElement(
          'span',
          { className: _style2.default.hint },
          hint
        ) : null,
        error ? _react2.default.createElement(
          'span',
          { className: _style2.default.error },
          error
        ) : null,
        maxLength ? _react2.default.createElement(
          'span',
          { className: _style2.default.counter },
          length,
          '/',
          maxLength
        ) : null,
        children
      );
    }
  }]);

  return Input;
}(_react2.default.Component);

Input.propTypes = {
  children: _react2.default.PropTypes.any,
  className: _react2.default.PropTypes.string,
  disabled: _react2.default.PropTypes.bool,
  error: _react2.default.PropTypes.string,
  floating: _react2.default.PropTypes.bool,
  hint: _react2.default.PropTypes.string,
  icon: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.element]),
  label: _react2.default.PropTypes.string,
  maxLength: _react2.default.PropTypes.number,
  multiline: _react2.default.PropTypes.bool,
  onBlur: _react2.default.PropTypes.func,
  onChange: _react2.default.PropTypes.func,
  onFocus: _react2.default.PropTypes.func,
  onKeyPress: _react2.default.PropTypes.func,
  required: _react2.default.PropTypes.bool,
  type: _react2.default.PropTypes.string,
  value: _react2.default.PropTypes.any
};
Input.defaultProps = {
  className: '',
  hint: '',
  disabled: false,
  floating: true,
  multiline: false,
  required: false,
  type: 'text'
};
exports.default = Input;