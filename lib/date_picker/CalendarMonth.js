'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redboxReact2 = require('redbox-react');

var _redboxReact3 = _interopRequireDefault(_redboxReact2);

var _reactTransformCatchErrors3 = require('react-transform-catch-errors');

var _reactTransformCatchErrors4 = _interopRequireDefault(_reactTransformCatchErrors3);

var _react2 = require('react');

var _react3 = _interopRequireDefault(_react2);

var _reactTransformHmr3 = require('react-transform-hmr');

var _reactTransformHmr4 = _interopRequireDefault(_reactTransformHmr3);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp2;

var _time = require('../utils/time.js');

var _time2 = _interopRequireDefault(_time);

var _utils = require('../utils/utils.js');

var _utils2 = _interopRequireDefault(_utils);

var _CalendarDay = require('./CalendarDay.js');

var _CalendarDay2 = _interopRequireDefault(_CalendarDay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
  Month: {
    displayName: 'Month'
  }
};

var _reactTransformHmr2 = (0, _reactTransformHmr4.default)({
  filename: 'components/date_picker/CalendarMonth.js',
  components: _components,
  locals: [module],
  imports: [_react3.default]
});

var _reactTransformCatchErrors2 = (0, _reactTransformCatchErrors4.default)({
  filename: 'components/date_picker/CalendarMonth.js',
  components: _components,
  locals: [],
  imports: [_react3.default, _redboxReact3.default]
});

function _wrapComponent(id) {
  return function (Component) {
    return _reactTransformHmr2(_reactTransformCatchErrors2(Component, id), id);
  };
}

var Month = _wrapComponent('Month')((_temp2 = _class = function (_Component) {
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
    key: 'renderWeeks',
    value: function renderWeeks() {
      var _this2 = this;

      var days = _utils2.default.range(0, 7).map(function (d) {
        return _time2.default.getDayOfWeekLetter(d, _this2.props.locale);
      });
      var source = this.props.sundayFirstDayOfWeek ? days : [].concat(_toConsumableArray(days.slice(1)), [days[0]]);
      return source.map(function (d, i) {
        return _react3.default.createElement(
          'span',
          { key: i },
          d
        );
      });
    }
  }, {
    key: 'renderDays',
    value: function renderDays() {
      var _this3 = this;

      return _utils2.default.range(1, _time2.default.getDaysInMonth(this.props.viewDate) + 1).map(function (i) {
        var date = new Date(_this3.props.viewDate.getFullYear(), _this3.props.viewDate.getMonth(), i);
        var disabled = _time2.default.dateOutOfRange(date, _this3.props.minDate, _this3.props.maxDate);

        return _react3.default.createElement(_CalendarDay2.default, {
          key: i,
          day: i,
          disabled: disabled,
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
      return _react3.default.createElement(
        'div',
        { 'data-react-toolbox': 'month', className: this.props.theme.month },
        _react3.default.createElement(
          'span',
          { className: this.props.theme.title },
          _time2.default.getFullMonth(this.props.viewDate, this.props.locale),
          ' ',
          this.props.viewDate.getFullYear()
        ),
        _react3.default.createElement(
          'div',
          { className: this.props.theme.week },
          this.renderWeeks()
        ),
        _react3.default.createElement(
          'div',
          { className: this.props.theme.days },
          this.renderDays()
        )
      );
    }
  }]);

  return Month;
}(_react2.Component), _class.propTypes = {
  locale: _react3.default.PropTypes.oneOfType([_react3.default.PropTypes.string, _react3.default.PropTypes.object]),
  maxDate: _react2.PropTypes.object,
  minDate: _react2.PropTypes.object,
  onDayClick: _react2.PropTypes.func,
  selectedDate: _react2.PropTypes.object,
  sundayFirstDayOfWeek: _react3.default.PropTypes.bool,
  theme: _react2.PropTypes.shape({
    days: _react2.PropTypes.string,
    month: _react2.PropTypes.string,
    title: _react2.PropTypes.string,
    week: _react2.PropTypes.string
  }),
  viewDate: _react2.PropTypes.object
}, _temp2));

exports.default = Month;