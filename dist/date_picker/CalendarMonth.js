'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utils = require('../utils/utils');

var _time = require('../utils/time');

var _time2 = _interopRequireDefault(_time);

var _CalendarDay = require('./CalendarDay');

var _CalendarDay2 = _interopRequireDefault(_CalendarDay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Month = function (_Component) {
  _inherits(Month, _Component);

  function Month() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Month);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Month.__proto__ || Object.getPrototypeOf(Month)).call.apply(_ref, [this].concat(args))), _this), _this.handleDayClick = function (day) {
      if (_this.props.onDayClick) _this.props.onDayClick(day);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Month, [{
    key: 'isDayDisabled',
    value: function isDayDisabled(date) {
      var _props = this.props,
          minDate = _props.minDate,
          maxDate = _props.maxDate,
          enabledDates = _props.enabledDates,
          disabledDates = _props.disabledDates;

      var compareDate = function compareDate(compDate) {
        return date.getTime() === compDate.getTime();
      };
      var dateInDisabled = disabledDates.filter(compareDate).length > 0;
      var dateInEnabled = enabledDates.filter(compareDate).length > 0;
      return _time2.default.dateOutOfRange(date, minDate, maxDate) || enabledDates.length > 0 && !dateInEnabled || dateInDisabled;
    }
  }, {
    key: 'renderWeeks',
    value: function renderWeeks() {
      var _this2 = this;

      var days = (0, _utils.range)(0, 7).map(function (d) {
        return _time2.default.getDayOfWeekLetter(d, _this2.props.locale);
      });
      var source = this.props.sundayFirstDayOfWeek ? days : [].concat(_toConsumableArray(days.slice(1)), [days[0]]);
      return source.map(function (day, i) {
        return _react2.default.createElement(
          'span',
          { key: i },
          day
        );
      }); // eslint-disable-line
    }
  }, {
    key: 'renderDays',
    value: function renderDays() {
      var _this3 = this;

      return (0, _utils.range)(1, _time2.default.getDaysInMonth(this.props.viewDate) + 1).map(function (i) {
        var date = new Date(_this3.props.viewDate.getFullYear(), _this3.props.viewDate.getMonth(), i);
        return _react2.default.createElement(_CalendarDay2.default, {
          key: i,
          day: i,
          disabled: _this3.isDayDisabled(date),
          onClick: _this3.handleDayClick,
          selectedDate: _this3.props.selectedDate,
          theme: _this3.props.theme,
          viewDate: _this3.props.viewDate,
          sundayFirstDayOfWeek: _this3.props.sundayFirstDayOfWeek
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var fullMonth = _time2.default.getFullMonth(this.props.viewDate, this.props.locale);
      var fullYear = this.props.viewDate.getFullYear();
      return _react2.default.createElement(
        'div',
        { 'data-react-toolbox': 'month', className: this.props.theme.month },
        _react2.default.createElement(
          'span',
          { className: this.props.theme.title },
          fullMonth,
          ' ',
          fullYear
        ),
        _react2.default.createElement(
          'div',
          { className: this.props.theme.week },
          this.renderWeeks()
        ),
        _react2.default.createElement(
          'div',
          { className: this.props.theme.days },
          this.renderDays()
        )
      );
    }
  }]);

  return Month;
}(_react.Component);

Month.propTypes = {
  disabledDates: _propTypes2.default.arrayOf(_propTypes2.default.instanceOf(Date)),
  enabledDates: _propTypes2.default.arrayOf(_propTypes2.default.instanceOf(Date)),
  locale: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]),
  maxDate: _propTypes2.default.instanceOf(Date),
  minDate: _propTypes2.default.instanceOf(Date),
  onDayClick: _propTypes2.default.func,
  selectedDate: _propTypes2.default.instanceOf(Date),
  sundayFirstDayOfWeek: _propTypes2.default.bool,
  theme: _propTypes2.default.shape({
    days: _propTypes2.default.string,
    month: _propTypes2.default.string,
    title: _propTypes2.default.string,
    week: _propTypes2.default.string
  }),
  viewDate: _propTypes2.default.instanceOf(Date)
};
Month.defaultProps = {
  disabledDates: [],
  enabledDates: []
};
exports.default = Month;