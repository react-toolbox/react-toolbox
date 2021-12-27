'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Switch = exports.switchFactory = undefined;

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

var _Thumb = require('./Thumb');

var _Thumb2 = _interopRequireDefault(_Thumb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var factory = function factory(Thumb) {
  var Switch = function (_Component) {
    _inherits(Switch, _Component);

    function Switch() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, Switch);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Switch.__proto__ || Object.getPrototypeOf(Switch)).call.apply(_ref, [this].concat(args))), _this), _this.handleToggle = function (event) {
        if (event.pageX !== 0 && event.pageY !== 0) _this.blur();
        if (!_this.props.disabled && _this.props.onChange) {
          _this.props.onChange(!_this.props.checked, event);
        }
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Switch, [{
      key: 'blur',
      value: function blur() {
        this.inputNode.blur();
      }
    }, {
      key: 'focus',
      value: function focus() {
        this.inputNode.focus();
      }
    }, {
      key: 'render',
      value: function render() {
        var _this2 = this;

        var _props = this.props,
            checked = _props.checked,
            className = _props.className,
            disabled = _props.disabled,
            onChange = _props.onChange,
            ripple = _props.ripple,
            theme = _props.theme,
            others = _objectWithoutProperties(_props, ['checked', 'className', 'disabled', 'onChange', 'ripple', 'theme']);

        var _className = (0, _classnames2.default)(theme[disabled ? 'disabled' : 'field'], className);
        return _react2.default.createElement(
          'label',
          { 'data-react-toolbox': 'switch', className: _className },
          _react2.default.createElement('input', _extends({}, others, {
            checked: this.props.checked,
            className: theme.input,
            onClick: this.handleToggle,
            readOnly: true,
            ref: function ref(node) {
              _this2.inputNode = node;
            },
            type: 'checkbox'
          })),
          _react2.default.createElement(
            'span',
            { className: theme[checked ? 'on' : 'off'] },
            _react2.default.createElement(Thumb, { disabled: this.props.disabled, theme: theme, ripple: ripple })
          ),
          this.props.label ? _react2.default.createElement(
            'span',
            { className: theme.text },
            this.props.label
          ) : null
        );
      }
    }]);

    return Switch;
  }(_react.Component);

  Switch.propTypes = {
    checked: _propTypes2.default.bool,
    className: _propTypes2.default.string,
    disabled: _propTypes2.default.bool,
    label: _propTypes2.default.string,
    name: _propTypes2.default.string,
    onBlur: _propTypes2.default.func,
    onChange: _propTypes2.default.func,
    onFocus: _propTypes2.default.func,
    ripple: _propTypes2.default.bool,
    theme: _propTypes2.default.shape({
      disabled: _propTypes2.default.string,
      field: _propTypes2.default.string,
      input: _propTypes2.default.string,
      off: _propTypes2.default.string,
      on: _propTypes2.default.string,
      ripple: _propTypes2.default.string,
      text: _propTypes2.default.string,
      thumb: _propTypes2.default.string
    })
  };
  Switch.defaultProps = {
    checked: false,
    className: '',
    disabled: false
  };


  return Switch;
};

var Thumb = (0, _Thumb2.default)((0, _Ripple2.default)({ centered: true, spread: 2.6 }));
var Switch = factory(Thumb);

exports.default = (0, _reactCssThemr.themr)(_identifiers.SWITCH)(Switch);
exports.switchFactory = factory;
exports.Switch = Switch;