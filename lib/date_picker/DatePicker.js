'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DatePicker = exports.datePickerFactory = undefined;

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

var _IconButton = require('../button/IconButton.js');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _Input = require('../input/Input.js');

var _Input2 = _interopRequireDefault(_Input);

var _Dialog = require('../dialog/Dialog.js');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _Calendar = require('./Calendar.js');

var _Calendar2 = _interopRequireDefault(_Calendar);

var _DatePickerDialog = require('./DatePickerDialog.js');

var _DatePickerDialog2 = _interopRequireDefault(_DatePickerDialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var factory = function factory(Input, DatePickerDialog) {
  var DatePicker = function (_Component) {
    _inherits(DatePicker, _Component);

    function DatePicker() {
      var _Object$getPrototypeO;

      var _temp, _this, _ret;

      _classCallCheck(this, DatePicker);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(DatePicker)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
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

    _createClass(DatePicker, [{
      key: 'render',
      value: function render() {
        var _props = this.props;
        var inputClassName = _props.inputClassName;
        var value = _props.value;

        var inputFormat = this.props.inputFormat || _time2.default.formatDate;
        var date = Object.prototype.toString.call(value) === '[object Date]' ? value : undefined;
        var formattedDate = date === undefined ? '' : inputFormat(value);

        return _react2.default.createElement(
          'div',
          { 'data-react-toolbox': 'date-picker' },
          _react2.default.createElement(Input, {
            className: (0, _classnames3.default)(this.props.theme.input, _defineProperty({}, inputClassName, inputClassName)),
            error: this.props.error,
            onMouseDown: this.handleInputMouseDown,
            name: this.props.name,
            label: this.props.label,
            readOnly: true,
            type: 'text',
            icon: this.props.icon,
            value: formattedDate
          }),
          _react2.default.createElement(DatePickerDialog, {
            autoOk: this.props.autoOk,
            active: this.state.active,
            className: this.props.className,
            name: this.props.name,
            maxDate: this.props.maxDate,
            minDate: this.props.minDate,
            onDismiss: this.handleDismiss,
            onSelect: this.handleSelect,
            theme: this.props.theme,
            value: date
          })
        );
      }
    }]);

    return DatePicker;
  }(_react.Component);

  DatePicker.propTypes = {
    autoOk: _react.PropTypes.bool,
    className: _react.PropTypes.string,
    error: _react.PropTypes.string,
    icon: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.element]),
    inputClassName: _react.PropTypes.string,
    inputFormat: _react.PropTypes.func,
    label: _react.PropTypes.string,
    maxDate: _react.PropTypes.object,
    minDate: _react.PropTypes.object,
    name: _react.PropTypes.string,
    onChange: _react.PropTypes.func,
    theme: _react.PropTypes.shape({
      input: _react.PropTypes.string
    }),
    value: _react.PropTypes.oneOfType([_react.PropTypes.instanceOf(Date), _react.PropTypes.string])
  };


  return DatePicker;
};

var Calendar = (0, _Calendar2.default)(_IconButton2.default);
var DatePickerDialog = (0, _DatePickerDialog2.default)(_Dialog2.default, Calendar);
var DatePicker = factory(_Input2.default, DatePickerDialog);

exports.default = (0, _reactCssThemr.themr)(_identifiers.DATE_PICKER)(DatePicker);
exports.datePickerFactory = factory;
exports.DatePicker = DatePicker;