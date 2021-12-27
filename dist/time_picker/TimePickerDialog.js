'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _time = require('../utils/time');

var _time2 = _interopRequireDefault(_time);

var _Clock = require('./Clock');

var _Clock2 = _interopRequireDefault(_Clock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var factory = function factory(Dialog) {
  var TimePickerDialog = function (_Component) {
    _inherits(TimePickerDialog, _Component);

    function TimePickerDialog() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, TimePickerDialog);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TimePickerDialog.__proto__ || Object.getPrototypeOf(TimePickerDialog)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
        display: 'hours',
        displayTime: new Date(_this.props.value.getTime())
      }, _this.updateRefAndCalculateHandleShape = function (node) {
        _this.clockNode = node;
        if (_this.props.active) {
          _this.clockNode.handleCalculateShape();
        }
      }, _this.handleClockChange = function (value) {
        _this.setState({ displayTime: value });
      }, _this.handleSelect = function (event) {
        _this.props.onSelect(_this.state.displayTime, event);
      }, _this.toggleTimeMode = function () {
        _this.setState({ displayTime: _time2.default.toggleTimeMode(_this.state.displayTime) });
      }, _this.handleHandMoved = function () {
        if (_this.state.display === 'hours') _this.setState({ display: 'minutes' });
      }, _this.switchDisplay = function (event) {
        _this.setState({ display: event.target.id });
      }, _this.actions = [{
        label: _this.props.cancelLabel,
        className: _this.props.theme.button,
        onClick: _this.props.onDismiss
      }, {
        label: _this.props.okLabel,
        className: _this.props.theme.button,
        name: _this.props.name,
        onClick: _this.handleSelect
      }], _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(TimePickerDialog, [{
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        if (nextProps.value.getTime() !== this.state.displayTime.getTime()) {
          this.setState({ displayTime: new Date(nextProps.value.getTime()) });
        }
      }
    }, {
      key: 'formatHours',
      value: function formatHours() {
        if (this.props.format === 'ampm') {
          return this.state.displayTime.getHours() % 12 || 12;
        }
        return this.state.displayTime.getHours();
      }
    }, {
      key: 'renderAMPMLabels',
      value: function renderAMPMLabels() {
        var theme = this.props.theme;

        if (this.props.format !== 'ampm') return undefined;
        return _react2.default.createElement(
          'div',
          { className: theme.ampm },
          _react2.default.createElement(
            'span',
            { className: theme.am, onClick: this.toggleTimeMode },
            'AM'
          ),
          _react2.default.createElement(
            'span',
            { className: theme.pm, onClick: this.toggleTimeMode },
            'PM'
          )
        );
      }
    }, {
      key: 'render',
      value: function render() {
        var theme = this.props.theme;

        var display = this.state.display + 'Display';
        var format = _time2.default.getTimeMode(this.state.displayTime) + 'Format';
        var className = (0, _classnames2.default)([theme.dialog, theme[display], theme[format]], this.props.className);
        return _react2.default.createElement(
          Dialog,
          {
            actions: this.actions,
            active: this.props.active,
            className: className,
            onEscKeyDown: this.props.onEscKeyDown,
            onOverlayClick: this.props.onOverlayClick
          },
          _react2.default.createElement(
            'header',
            { className: theme.header },
            _react2.default.createElement(
              'span',
              { id: 'hours', className: theme.hours, onClick: this.switchDisplay },
              ('0' + this.formatHours()).slice(-2)
            ),
            _react2.default.createElement(
              'span',
              { className: theme.separator },
              ':'
            ),
            _react2.default.createElement(
              'span',
              { id: 'minutes', className: theme.minutes, onClick: this.switchDisplay },
              ('0' + this.state.displayTime.getMinutes()).slice(-2)
            ),
            this.renderAMPMLabels()
          ),
          _react2.default.createElement(_Clock2.default, {
            ref: this.updateRefAndCalculateHandleShape,
            display: this.state.display,
            format: this.props.format,
            onChange: this.handleClockChange,
            onHandMoved: this.handleHandMoved,
            theme: this.props.theme,
            time: this.state.displayTime
          })
        );
      }
    }]);

    return TimePickerDialog;
  }(_react.Component);

  TimePickerDialog.propTypes = {
    active: _propTypes2.default.bool,
    cancelLabel: _propTypes2.default.string,
    className: _propTypes2.default.string,
    format: _propTypes2.default.oneOf(['24hr', 'ampm']),
    name: _propTypes2.default.string,
    okLabel: _propTypes2.default.string,
    onDismiss: _propTypes2.default.func,
    onEscKeyDown: _propTypes2.default.func,
    onOverlayClick: _propTypes2.default.func,
    onSelect: _propTypes2.default.func,
    theme: _propTypes2.default.shape({
      am: _propTypes2.default.string,
      amFormat: _propTypes2.default.string,
      ampm: _propTypes2.default.string,
      button: _propTypes2.default.string,
      dialog: _propTypes2.default.string,
      header: _propTypes2.default.string,
      hours: _propTypes2.default.string,
      hoursDisplay: _propTypes2.default.string,
      minutes: _propTypes2.default.string,
      minutesDisplay: _propTypes2.default.string,
      pm: _propTypes2.default.string,
      pmFormat: _propTypes2.default.string,
      separator: _propTypes2.default.string
    }),
    value: _propTypes2.default.instanceOf(Date)
  };
  TimePickerDialog.defaultProps = {
    active: false,
    cancelLabel: 'Cancel',
    format: '24hr',
    okLabel: 'Ok',
    value: new Date()
  };


  return TimePickerDialog;
};

exports.default = factory;