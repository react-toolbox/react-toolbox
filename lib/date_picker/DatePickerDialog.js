'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Calendar = require('./Calendar');

var _Calendar2 = _interopRequireDefault(_Calendar);

var _dialog = require('../dialog');

var _dialog2 = _interopRequireDefault(_dialog);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

var _time = require('../utils/time');

var _time2 = _interopRequireDefault(_time);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CalendarDialog = function (_React$Component) {
  _inherits(CalendarDialog, _React$Component);

  function CalendarDialog() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, CalendarDialog);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(CalendarDialog)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
      date: _this.props.value,
      display: 'months'
    }, _this.handleCalendarChange = function (value, dayClick) {
      var state = { display: 'months', date: value };
      if (_time2.default.dateOutOfRange(value, _this.props.minDate, _this.props.maxDate)) {
        state.date = _this.props.maxDate || _this.props.minDate;
      }
      _this.setState(state);
      if (dayClick && _this.props.autoOk && _this.props.onSelect) {
        _this.props.onSelect(value);
      }
    }, _this.handleSelect = function (event) {
      if (_this.props.onSelect) _this.props.onSelect(_this.state.date, event);
    }, _this.handleSwitchDisplay = function (display) {
      _this.setState({ display: display });
    }, _this.actions = [{ label: 'Cancel', className: _style2.default.button, onClick: _this.props.onDismiss }, { label: 'Ok', className: _style2.default.button, onClick: _this.handleSelect }], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(CalendarDialog, [{
    key: 'render',
    value: function render() {
      var display = 'display-' + this.state.display;
      var className = (0, _classnames2.default)(_style2.default.dialog, this.props.className);
      var headerClassName = (0, _classnames2.default)(_style2.default.header, _style2.default[display]);

      return _react2.default.createElement(
        _dialog2.default,
        { active: this.props.active, type: 'custom', className: className, actions: this.actions },
        _react2.default.createElement(
          'header',
          { className: headerClassName },
          _react2.default.createElement(
            'span',
            { className: _style2.default.year, onClick: this.handleSwitchDisplay.bind(this, 'years') },
            this.state.date.getFullYear()
          ),
          _react2.default.createElement(
            'h3',
            { className: _style2.default.date, onClick: this.handleSwitchDisplay.bind(this, 'months') },
            _time2.default.getShortDayOfWeek(this.state.date.getDay()),
            ', ',
            _time2.default.getShortMonth(this.state.date),
            ' ',
            this.state.date.getDate()
          )
        ),
        _react2.default.createElement(
          'div',
          { className: _style2.default.wrapper },
          _react2.default.createElement(_Calendar2.default, {
            display: this.state.display,
            maxDate: this.props.maxDate,
            minDate: this.props.minDate,
            onChange: this.handleCalendarChange,
            selectedDate: this.state.date })
        )
      );
    }
  }]);

  return CalendarDialog;
}(_react2.default.Component);

CalendarDialog.propTypes = {
  active: _react2.default.PropTypes.bool,
  autoOk: _react2.default.PropTypes.bool,
  className: _react2.default.PropTypes.string,
  maxDate: _react2.default.PropTypes.object,
  minDate: _react2.default.PropTypes.object,
  onDismiss: _react2.default.PropTypes.func,
  onSelect: _react2.default.PropTypes.func,
  value: _react2.default.PropTypes.object
};
CalendarDialog.defaultProps = {
  active: false,
  className: '',
  value: new Date()
};
exports.default = CalendarDialog;