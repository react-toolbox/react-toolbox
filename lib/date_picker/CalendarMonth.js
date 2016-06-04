'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _time = require('../utils/time.js');

var _time2 = _interopRequireDefault(_time);

var _utils = require('../utils/utils.js');

var _utils2 = _interopRequireDefault(_utils);

var _CalendarDay = require('./CalendarDay.js');

var _CalendarDay2 = _interopRequireDefault(_CalendarDay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Month = function (_Component) {
  _inherits(Month, _Component);

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
          theme: _this2.props.theme,
          viewDate: _this2.props.viewDate
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { 'data-react-toolbox': 'month', className: this.props.theme.month },
        _react2.default.createElement(
          'span',
          { className: this.props.theme.title },
          _time2.default.getFullMonth(this.props.viewDate),
          ' ',
          this.props.viewDate.getFullYear()
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
  maxDate: _react.PropTypes.object,
  minDate: _react.PropTypes.object,
  onDayClick: _react.PropTypes.func,
  selectedDate: _react.PropTypes.object,
  theme: _react.PropTypes.shape({
    days: _react.PropTypes.string,
    month: _react.PropTypes.string,
    title: _react.PropTypes.string,
    week: _react.PropTypes.string
  }),
  viewDate: _react.PropTypes.object
};
exports.default = Month;