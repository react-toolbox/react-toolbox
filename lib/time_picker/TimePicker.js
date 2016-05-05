'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _events = require('../utils/events');

var _events2 = _interopRequireDefault(_events);

var _time = require('../utils/time');

var _time2 = _interopRequireDefault(_time);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

var _input = require('../input');

var _input2 = _interopRequireDefault(_input);

var _TimePickerDialog = require('./TimePickerDialog');

var _TimePickerDialog2 = _interopRequireDefault(_TimePickerDialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TimePicker = function (_React$Component) {
  _inherits(TimePicker, _React$Component);

  function TimePicker() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, TimePicker);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(TimePicker)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
      active: false
    }, _this.handleDismiss = function () {
      _this.setState({ active: false });
    }, _this.handleInputMouseDown = function (event) {
      _events2.default.pauseEvent(event);
      _this.setState({ active: true });
    }, _this.handleSelect = function (value, event) {
      if (_this.props.onChange) _this.props.onChange(value, event);
      _this.setState({ active: false });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(TimePicker, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var value = _props.value;
      var format = _props.format;
      var inputClassName = _props.inputClassName;

      var formattedTime = value ? _time2.default.formatTime(value, format) : null;
      return _react2.default.createElement(
        'div',
        { 'data-react-toolbox': 'time-picker' },
        _react2.default.createElement(_input2.default, {
          className: (0, _classnames3.default)(_style2.default.input, _defineProperty({}, inputClassName, inputClassName)),
          error: this.props.error,
          label: this.props.label,
          onMouseDown: this.handleInputMouseDown,
          readOnly: true,
          type: 'text',
          value: formattedTime
        }),
        _react2.default.createElement(_TimePickerDialog2.default, {
          active: this.state.active,
          className: this.props.className,
          format: format,
          onDismiss: this.handleDismiss,
          onSelect: this.handleSelect,
          value: this.props.value
        })
      );
    }
  }]);

  return TimePicker;
}(_react2.default.Component);

TimePicker.propTypes = {
  className: _react2.default.PropTypes.string,
  error: _react2.default.PropTypes.string,
  format: _react2.default.PropTypes.oneOf(['24hr', 'ampm']),
  inputClassName: _react2.default.PropTypes.string,
  label: _react2.default.PropTypes.string,
  onChange: _react2.default.PropTypes.func,
  value: _react2.default.PropTypes.object
};
TimePicker.defaultProps = {
  className: '',
  format: '24hr'
};
exports.default = TimePicker;