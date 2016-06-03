'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Thumb = require('./Thumb');

var _Thumb2 = _interopRequireDefault(_Thumb);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Switch = function (_React$Component) {
  _inherits(Switch, _React$Component);

  function Switch() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, Switch);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Switch)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.handleToggle = function (event) {
      if (event.pageX !== 0 && event.pageY !== 0) _this.blur();
      if (!_this.props.disabled && _this.props.onChange) {
        _this.props.onChange(!_this.props.checked, event);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Switch, [{
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
      var className = _style2.default[this.props.disabled ? 'disabled' : 'field'];
      var switchClassName = _style2.default[this.props.checked ? 'on' : 'off'];
      var _props = this.props;
      var onChange = _props.onChange;

      var others = _objectWithoutProperties(_props, ['onChange']); //eslint-disable-line no-unused-vars


      if (this.props.className) className += ' ' + this.props.className;

      return _react2.default.createElement(
        'label',
        { 'data-react-toolbox': 'switch', className: className },
        _react2.default.createElement('input', _extends({}, others, {
          checked: this.props.checked,
          className: _style2.default.input,
          onClick: this.handleToggle,
          readOnly: true,
          ref: 'input',
          type: 'checkbox'
        })),
        _react2.default.createElement(
          'span',
          { className: switchClassName },
          _react2.default.createElement(_Thumb2.default, { disabled: this.props.disabled })
        ),
        this.props.label ? _react2.default.createElement(
          'span',
          { className: _style2.default.text },
          this.props.label
        ) : null
      );
    }
  }]);

  return Switch;
}(_react2.default.Component);

Switch.propTypes = {
  checked: _react2.default.PropTypes.bool,
  className: _react2.default.PropTypes.string,
  disabled: _react2.default.PropTypes.bool,
  label: _react2.default.PropTypes.string,
  name: _react2.default.PropTypes.string,
  onBlur: _react2.default.PropTypes.func,
  onChange: _react2.default.PropTypes.func,
  onFocus: _react2.default.PropTypes.func
};
Switch.defaultProps = {
  checked: false,
  className: '',
  disabled: false
};
exports.default = Switch;