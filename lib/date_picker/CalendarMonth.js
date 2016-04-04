'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _CalendarDay = require('./CalendarDay');

var _CalendarDay2 = _interopRequireDefault(_CalendarDay);

var _time = require('../utils/time');

var _time2 = _interopRequireDefault(_time);

var _utils = require('../utils/utils');

var _utils2 = _interopRequireDefault(_utils);

var _style = require('./style.calendar');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Month = function (_React$Component) {
  _inherits(Month, _React$Component);

  function Month() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, Month);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Month)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.handleDayClick = function (day) {
      if (_this.props.onDayClick) _this.props.onDayClick(day);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Month, [{
    key: 'renderWeeks',
    value: function renderWeeks() {
      return _utils2.default.range(0, 7).map(function (i) {
        return _react2.default.createElement(
          'span',
          { key: i },
          _time2.default.getFullDayOfWeek(i).charAt(0)
        );
      });
    }
  }, {
    key: 'renderDays',
    value: function renderDays() {
      var _this2 = this;

      return _utils2.default.range(1, _time2.default.getDaysInMonth(this.props.viewDate) + 1).map(function (i) {
        var date = new Date(_this2.props.viewDate.getFullYear(), _this2.props.viewDate.getMonth(), i);
        var disabled = _time2.default.dateOutOfRange(date, _this2.props.minDate, _this2.props.maxDate);

        return _react2.default.createElement(_CalendarDay2.default, {
          key: i,
          day: i,
          disabled: disabled,
          onClick: !disabled ? _this2.handleDayClick.bind(_this2, i) : null,
          selectedDate: _this2.props.selectedDate,
          viewDate: _this2.props.viewDate
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { 'data-react-toolbox': 'month', className: _style2.default.month },
        _react2.default.createElement(
          'span',
          { className: _style2.default.title },
          _time2.default.getFullMonth(this.props.viewDate),
          ' ',
          this.props.viewDate.getFullYear()
        ),
        _react2.default.createElement(
          'div',
          { className: _style2.default.week },
          this.renderWeeks()
        ),
        _react2.default.createElement(
          'div',
          { className: _style2.default.days },
          this.renderDays()
        )
      );
    }
  }]);

  return Month;
}(_react2.default.Component);

Month.propTypes = {
  maxDate: _react2.default.PropTypes.object,
  minDate: _react2.default.PropTypes.object,
  onDayClick: _react2.default.PropTypes.func,
  selectedDate: _react2.default.PropTypes.object,
  viewDate: _react2.default.PropTypes.object
};
exports.default = Month;