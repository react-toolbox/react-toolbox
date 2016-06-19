'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimePicker = exports.timePickerFactory = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _reactCssThemr = require('react-css-themr');

var _identifiers = require('../identifiers.js');

var _events = require('../utils/events.js');

var _events2 = _interopRequireDefault(_events);

var _time = require('../utils/time.js');

var _time2 = _interopRequireDefault(_time);

var _Dialog = require('../dialog/Dialog.js');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _Input = require('../input/Input.js');

var _Input2 = _interopRequireDefault(_Input);

var _TimePickerDialog = require('./TimePickerDialog.js');

var _TimePickerDialog2 = _interopRequireDefault(_TimePickerDialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var factory = function factory(TimePickerDialog, Input) {
  var TimePicker = function (_Component) {
    _inherits(TimePicker, _Component);

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
        var theme = _props.theme;

        var formattedTime = value ? _time2.default.formatTime(value, format) : '';
        return _react2.default.createElement(
          'div',
          { 'data-react-toolbox': 'time-picker' },
          _react2.default.createElement(Input, {
            className: (0, _classnames3.default)(theme.input, _defineProperty({}, inputClassName, inputClassName)),
            error: this.props.error,
            name: this.props.name,
            label: this.props.label,
            onMouseDown: this.handleInputMouseDown,
            readOnly: true,
            type: 'text',
            value: formattedTime
          }),
          _react2.default.createElement(TimePickerDialog, {
            active: this.state.active,
            className: this.props.className,
            name: this.props.name,
            format: format,
            onDismiss: this.handleDismiss,
            onSelect: this.handleSelect,
            theme: this.props.theme,
            value: this.props.value
          })
        );
      }
    }]);

    return TimePicker;
  }(_react.Component);

  TimePicker.propTypes = {
    className: _react.PropTypes.string,
    error: _react.PropTypes.string,
    format: _react.PropTypes.oneOf(['24hr', 'ampm']),
    inputClassName: _react.PropTypes.string,
    label: _react.PropTypes.string,
    name: _react.PropTypes.string,
    onChange: _react.PropTypes.func,
    theme: _react.PropTypes.shape({
      input: _react.PropTypes.string
    }),
    value: _react.PropTypes.object
  };
  TimePicker.defaultProps = {
    className: '',
    format: '24hr'
  };


  return TimePicker;
};

var TimePickerDialog = (0, _TimePickerDialog2.default)(_Dialog2.default);
var TimePicker = factory(TimePickerDialog, _Input2.default);
exports.default = (0, _reactCssThemr.themr)(_identifiers.TIME_PICKER)(TimePicker);
exports.timePickerFactory = factory;
exports.TimePicker = TimePicker;