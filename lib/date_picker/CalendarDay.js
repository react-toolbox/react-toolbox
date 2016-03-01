'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _time = require('../utils/time');

var _time2 = _interopRequireDefault(_time);

var _style = require('./style.calendar');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Day = function (_React$Component) {
  _inherits(Day, _React$Component);

  function Day() {
    _classCallCheck(this, Day);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Day).apply(this, arguments));
  }

  _createClass(Day, [{
    key: 'dayStyle',
    value: function dayStyle() {
      if (this.props.day === 1) {
        return {
          marginLeft: _time2.default.getFirstWeekDay(this.props.viewDate) * 100 / 7 + '%'
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
      var _ClassNames;

      var className = (0, _classnames2.default)(_style2.default.day, (_ClassNames = {}, _defineProperty(_ClassNames, _style2.default.active, this.isSelected()), _defineProperty(_ClassNames, _style2.default.disabled, this.props.disabled), _ClassNames));

      return _react2.default.createElement(
        'div',
        { 'data-react-toolbox': 'day', className: className, style: this.dayStyle() },
        _react2.default.createElement(
          'span',
          { onClick: this.props.onClick },
          this.props.day
        )
      );
    }
  }]);

  return Day;
}(_react2.default.Component);

Day.propTypes = {
  day: _react2.default.PropTypes.number,
  disabled: _react2.default.PropTypes.bool,
  onClick: _react2.default.PropTypes.func,
  selectedDate: _react2.default.PropTypes.object,
  viewDate: _react2.default.PropTypes.object
};
exports.default = Day;