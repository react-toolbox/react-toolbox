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

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _time = require('../utils/time.js');

var _time2 = _interopRequireDefault(_time);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
  Day: {
    displayName: 'Day'
  }
};

var _reactTransformHmr2 = (0, _reactTransformHmr4.default)({
  filename: 'components/date_picker/CalendarDay.js',
  components: _components,
  locals: [module],
  imports: [_react3.default]
});

var _reactTransformCatchErrors2 = (0, _reactTransformCatchErrors4.default)({
  filename: 'components/date_picker/CalendarDay.js',
  components: _components,
  locals: [],
  imports: [_react3.default, _redboxReact3.default]
});

function _wrapComponent(id) {
  return function (Component) {
    return _reactTransformHmr2(_reactTransformCatchErrors2(Component, id), id);
  };
}

var Day = _wrapComponent('Day')((_temp2 = _class = function (_Component) {
  _inherits(Day, _Component);

  function Day() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Day);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Day.__proto__ || Object.getPrototypeOf(Day)).call.apply(_ref, [this].concat(args))), _this), _this.handleClick = function () {
      if (!_this.props.disabled && _this.props.onClick) {
        _this.props.onClick(_this.props.day);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Day, [{
    key: 'dayStyle',
    value: function dayStyle() {
      if (this.props.day === 1) {
        var e = this.props.sundayFirstDayOfWeek ? 0 : 1;
        return {
          marginLeft: (_time2.default.getFirstWeekDay(this.props.viewDate) - e) * 100 / 7 + '%'
        };
      }
    }
  }, {
    key: 'isSelected',
    value: function isSelected() {
      var sameYear = this.props.viewDate.getFullYear() === this.props.selectedDate.getFullYear();
      var sameMonth = this.props.viewDate.getMonth() === this.props.selectedDate.getMonth();
      var sameDay = this.props.day === this.props.selectedDate.getDate();
      return sameYear && sameMonth && sameDay;
    }
  }, {
    key: 'render',
    value: function render() {
      var _classnames;

      var className = (0, _classnames3.default)(this.props.theme.day, (_classnames = {}, _defineProperty(_classnames, this.props.theme.active, this.isSelected()), _defineProperty(_classnames, this.props.theme.disabled, this.props.disabled), _classnames));

      return _react3.default.createElement(
        'div',
        { 'data-react-toolbox': 'day', className: className, style: this.dayStyle() },
        _react3.default.createElement(
          'span',
          { onClick: this.handleClick },
          this.props.day
        )
      );
    }
  }]);

  return Day;
}(_react2.Component), _class.propTypes = {
  day: _react2.PropTypes.number,
  disabled: _react2.PropTypes.bool,
  onClick: _react2.PropTypes.func,
  selectedDate: _react2.PropTypes.object,
  sundayFirstDayOfWeek: _react2.PropTypes.bool,
  theme: _react2.PropTypes.shape({
    active: _react2.PropTypes.string,
    day: _react2.PropTypes.string,
    disabled: _react2.PropTypes.string
  }),
  viewDate: _react2.PropTypes.object
}, _temp2));

exports.default = Day;