'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RadioButton = exports.radioButtonFactory = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactCssThemr = require('react-css-themr');

var _identifiers = require('../identifiers');

var _Ripple = require('../ripple/Ripple');

var _Ripple2 = _interopRequireDefault(_Ripple);

var _Radio = require('./Radio');

var _Radio2 = _interopRequireDefault(_Radio);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var factory = function factory(Radio) {
  var RadioButton = function (_Component) {
    _inherits(RadioButton, _Component);

    function RadioButton() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, RadioButton);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = RadioButton.__proto__ || Object.getPrototypeOf(RadioButton)).call.apply(_ref, [this].concat(args))), _this), _this.handleClick = function (event) {
        var _this$props = _this.props,
            checked = _this$props.checked,
            disabled = _this$props.disabled,
            onChange = _this$props.onChange;

        if (event.pageX !== 0 && event.pageY !== 0) _this.blur();
        if (!disabled && !checked && onChange) onChange(event, _this);
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(RadioButton, [{
      key: 'blur',
      value: function blur() {
        if (this.inputNode) {
          this.inputNode.blur();
        }
      }
    }, {
      key: 'focus',
      value: function focus() {
        if (this.inputNode) {
          this.inputNode.focus();
        }
      }
    }, {
      key: 'render',
      value: function render() {
        var _this2 = this;

        var _props = this.props,
            checked = _props.checked,
            children = _props.children,
            className = _props.className,
            disabled = _props.disabled,
            label = _props.label,
            name = _props.name,
            onChange = _props.onChange,
            onMouseEnter = _props.onMouseEnter,
            onMouseLeave = _props.onMouseLeave,
            theme = _props.theme,
            others = _objectWithoutProperties(_props, ['checked', 'children', 'className', 'disabled', 'label', 'name', 'onChange', 'onMouseEnter', 'onMouseLeave', 'theme']);

        var _className = (0, _classnames2.default)(theme[this.props.disabled ? 'disabled' : 'field'], className);
        return _react2.default.createElement(
          'label',
          {
            'data-react-toolbox': 'radio-button',
            className: _className,
            onMouseEnter: onMouseEnter,
            onMouseLeave: onMouseLeave
          },
          _react2.default.createElement('input', _extends({}, others, {
            checked: checked,
            className: theme.input,
            disabled: disabled,
            name: name,
            onChange: function onChange() {},
            onClick: this.handleClick,
            ref: function ref(node) {
              _this2.inputNode = node;
            },
            type: 'radio'
          })),
          _react2.default.createElement(Radio, { checked: checked, disabled: disabled, theme: theme }),
          label ? _react2.default.createElement(
            'span',
            { className: theme.text },
            label
          ) : null,
          children
        );
      }
    }]);

    return RadioButton;
  }(_react.Component);

  RadioButton.propTypes = {
    checked: _propTypes2.default.bool,
    children: _propTypes2.default.node,
    className: _propTypes2.default.string,
    disabled: _propTypes2.default.bool,
    label: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node]),
    name: _propTypes2.default.string,
    onBlur: _propTypes2.default.func,
    onChange: _propTypes2.default.func,
    onFocus: _propTypes2.default.func,
    onMouseEnter: _propTypes2.default.func,
    onMouseLeave: _propTypes2.default.func,
    theme: _propTypes2.default.shape({
      disabled: _propTypes2.default.string,
      field: _propTypes2.default.string,
      input: _propTypes2.default.string,
      text: _propTypes2.default.string
    }),
    value: _propTypes2.default.string
  };
  RadioButton.defaultProps = {
    checked: false,
    className: '',
    disabled: false
  };


  return RadioButton;
};

var Radio = (0, _Radio2.default)((0, _Ripple2.default)({ centered: true, spread: 2.6 }));
var RadioButton = factory(Radio);
exports.default = (0, _reactCssThemr.themr)(_identifiers.RADIO)(RadioButton);
exports.radioButtonFactory = factory;
exports.RadioButton = RadioButton;