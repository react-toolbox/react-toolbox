'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _time = require('../utils/time.js');

var _time2 = _interopRequireDefault(_time);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var factory = function factory(Dialog, Calendar) {
  var CalendarDialog = function (_Component) {
    _inherits(CalendarDialog, _Component);

    function CalendarDialog() {
      var _Object$getPrototypeO;

      var _temp, _this, _ret;

      _classCallCheck(this, CalendarDialog);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(CalendarDialog)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
        display: 'months',
        date: _this.props.value
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
      }, _this.updateStateDate = function (date) {
        if (Object.prototype.toString.call(date) === '[object Date]') {
          _this.setState({
            date: date
          });
        }
      }, _this.actions = [{ label: 'Cancel', className: _this.props.theme.button, onClick: _this.props.onDismiss }, { label: 'Ok', className: _this.props.theme.button, name: _this.props.name, onClick: _this.handleSelect }], _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(CalendarDialog, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.updateStateDate(this.props.value);
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        this.updateStateDate(nextProps.value);
      }
    }, {
      key: 'render',
      value: function render() {
        var theme = this.props.theme;

        var display = this.state.display + 'Display';
        var className = (0, _classnames2.default)(theme.dialog, this.props.className);
        var headerClassName = (0, _classnames2.default)(theme.header, theme[display]);

        return _react2.default.createElement(
          Dialog,
          { active: this.props.active, type: 'custom', className: className, actions: this.actions },
          _react2.default.createElement(
            'header',
            { className: headerClassName },
            _react2.default.createElement(
              'span',
              { className: theme.year, onClick: this.handleSwitchDisplay.bind(this, 'years') },
              this.state.date.getFullYear()
            ),
            _react2.default.createElement(
              'h3',
              { className: theme.date, onClick: this.handleSwitchDisplay.bind(this, 'months') },
              _time2.default.getShortDayOfWeek(this.state.date.getDay()),
              ', ',
              _time2.default.getShortMonth(this.state.date),
              ' ',
              this.state.date.getDate()
            )
          ),
          _react2.default.createElement(
            'div',
            { className: theme.calendarWrapper },
            _react2.default.createElement(Calendar, {
              display: this.state.display,
              maxDate: this.props.maxDate,
              minDate: this.props.minDate,
              onChange: this.handleCalendarChange,
              selectedDate: this.state.date,
              theme: this.props.theme })
          )
        );
      }
    }]);

    return CalendarDialog;
  }(_react.Component);

  CalendarDialog.propTypes = {
    active: _react.PropTypes.bool,
    autoOk: _react.PropTypes.bool,
    className: _react.PropTypes.string,
    maxDate: _react.PropTypes.object,
    minDate: _react.PropTypes.object,
    name: _react.PropTypes.string,
    onDismiss: _react.PropTypes.func,
    onSelect: _react.PropTypes.func,
    theme: _react.PropTypes.shape({
      button: _react.PropTypes.string,
      calendarWrapper: _react.PropTypes.string,
      date: _react.PropTypes.string,
      dialog: _react.PropTypes.string,
      header: _react.PropTypes.string,
      monthsDisplay: _react.PropTypes.string,
      year: _react.PropTypes.string,
      yearsDisplay: _react.PropTypes.string
    }),
    value: _react.PropTypes.object
  };
  CalendarDialog.defaultProps = {
    active: false,
    className: '',
    value: new Date()
  };


  return CalendarDialog;
};

exports.default = factory;