'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

var _time = require('../utils/time');

var _time2 = _interopRequireDefault(_time);

var _Clock = require('./Clock');

var _Clock2 = _interopRequireDefault(_Clock);

var _dialog = require('../dialog');

var _dialog2 = _interopRequireDefault(_dialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TimePickerDialog = function (_React$Component) {
  _inherits(TimePickerDialog, _React$Component);

  function TimePickerDialog() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, TimePickerDialog);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(TimePickerDialog)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
      display: 'hours',
      displayTime: _this.props.value
    }, _this.handleClockChange = function (value) {
      _this.setState({ displayTime: value });
    }, _this.handleSelect = function (event) {
      _this.props.onSelect(_this.state.displayTime, event);
    }, _this.toggleTimeMode = function () {
      _this.setState({ displayTime: _time2.default.toggleTimeMode(_this.state.displayTime) });
    }, _this.handleHandMoved = function () {
      if (_this.state.display === 'hours') _this.setState({ display: 'minutes' });
    }, _this.switchDisplay = function (display) {
      _this.setState({ display: display });
    }, _this.actions = [{ label: 'Cancel', className: _style2.default.button, onClick: _this.props.onDismiss }, { label: 'Ok', className: _style2.default.button, onClick: _this.handleSelect }], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(TimePickerDialog, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (!prevProps.active && this.props.active) {
        setTimeout(this.refs.clock.handleCalculateShape, 1000);
      }
    }
  }, {
    key: 'formatHours',
    value: function formatHours() {
      if (this.props.format === 'ampm') {
        return this.state.displayTime.getHours() % 12 || 12;
      } else {
        return this.state.displayTime.getHours();
      }
    }
  }, {
    key: 'renderAMPMLabels',
    value: function renderAMPMLabels() {
      if (this.props.format === 'ampm') {
        return _react2.default.createElement(
          'div',
          { className: _style2.default.ampm },
          _react2.default.createElement(
            'span',
            { className: _style2.default.am, onClick: this.toggleTimeMode },
            'AM'
          ),
          _react2.default.createElement(
            'span',
            { className: _style2.default.pm, onClick: this.toggleTimeMode },
            'PM'
          )
        );
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var display = 'display-' + this.state.display;
      var format = 'format-' + _time2.default.getTimeMode(this.state.displayTime);
      var className = (0, _classnames2.default)([_style2.default.dialog, _style2.default[display], _style2.default[format]], this.props.className);
      return _react2.default.createElement(
        _dialog2.default,
        { active: this.props.active, className: className, actions: this.actions },
        _react2.default.createElement(
          'header',
          { className: _style2.default.header },
          _react2.default.createElement(
            'span',
            { className: _style2.default.hours, onClick: this.switchDisplay.bind(this, 'hours') },
            ('0' + this.formatHours()).slice(-2)
          ),
          _react2.default.createElement(
            'span',
            { className: _style2.default.separator },
            ':'
          ),
          _react2.default.createElement(
            'span',
            { className: _style2.default.minutes, onClick: this.switchDisplay.bind(this, 'minutes') },
            ('0' + this.state.displayTime.getMinutes()).slice(-2)
          ),
          this.renderAMPMLabels()
        ),
        _react2.default.createElement(_Clock2.default, {
          ref: 'clock',
          display: this.state.display,
          format: this.props.format,
          onChange: this.handleClockChange,
          onHandMoved: this.handleHandMoved,
          time: this.state.displayTime
        })
      );
    }
  }]);

  return TimePickerDialog;
}(_react2.default.Component);

TimePickerDialog.propTypes = {
  active: _react2.default.PropTypes.bool,
  className: _react2.default.PropTypes.string,
  format: _react2.default.PropTypes.oneOf(['24hr', 'ampm']),
  onDismiss: _react2.default.PropTypes.func,
  onSelect: _react2.default.PropTypes.func,
  value: _react2.default.PropTypes.object
};
TimePickerDialog.defaultProps = {
  active: false,
  format: '24hr',
  value: new Date()
};
exports.default = TimePickerDialog;