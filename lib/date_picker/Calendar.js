'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

var _animations = require('../animations');

var _time = require('../utils/time.js');

var _time2 = _interopRequireDefault(_time);

var _utils = require('../utils/utils.js');

var _utils2 = _interopRequireDefault(_utils);

var _CalendarMonth = require('./CalendarMonth.js');

var _CalendarMonth2 = _interopRequireDefault(_CalendarMonth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var factory = function factory(IconButton) {
  var Calendar = function (_Component) {
    _inherits(Calendar, _Component);

    function Calendar() {
      var _Object$getPrototypeO;

      var _temp, _this, _ret;

      _classCallCheck(this, Calendar);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Calendar)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
        viewDate: _this.props.selectedDate
      }, _this.handleDayClick = function (day) {
        _this.props.onChange(_time2.default.setDay(_this.state.viewDate, day), true);
      }, _this.handleYearClick = function (year) {
        var viewDate = _time2.default.setYear(_this.props.selectedDate, year);
        _this.setState({ viewDate: viewDate });
        _this.props.onChange(viewDate, false);
      }, _this.changeViewMonth = function (direction, step) {
        _this.setState({
          direction: direction,
          viewDate: _time2.default.addMonths(_this.state.viewDate, step)
        });
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Calendar, [{
      key: 'componentDidUpdate',
      value: function componentDidUpdate() {
        if (this.refs.activeYear) {
          this.scrollToActive();
        }
      }
    }, {
      key: 'scrollToActive',
      value: function scrollToActive() {
        this.refs.years.scrollTop = this.refs.activeYear.offsetTop - this.refs.years.offsetHeight / 2 + this.refs.activeYear.offsetHeight / 2;
      }
    }, {
      key: 'renderYear',
      value: function renderYear(year) {
        var props = {
          className: year === this.state.viewDate.getFullYear() ? this.props.theme.active : '',
          key: year,
          onClick: this.handleYearClick.bind(this, year)
        };

        if (year === this.state.viewDate.getFullYear()) {
          props.ref = 'activeYear';
        }

        return _react2.default.createElement(
          'li',
          props,
          year
        );
      }
    }, {
      key: 'renderYears',
      value: function renderYears() {
        var _this2 = this;

        return _react2.default.createElement(
          'ul',
          { 'data-react-toolbox': 'years', ref: 'years', className: this.props.theme.years },
          _utils2.default.range(1900, 2100).map(function (i) {
            return _this2.renderYear(i);
          })
        );
      }
    }, {
      key: 'renderMonths',
      value: function renderMonths() {
        var theme = this.props.theme;

        var animation = this.state.direction === 'left' ? _animations.SlideLeft : _animations.SlideRight;
        return _react2.default.createElement(
          'div',
          { 'data-react-toolbox': 'calendar' },
          _react2.default.createElement(IconButton, { className: theme.prev, icon: 'chevron_left', onClick: this.changeViewMonth.bind(this, 'left', -1) }),
          _react2.default.createElement(IconButton, { className: theme.next, icon: 'chevron_right', onClick: this.changeViewMonth.bind(this, 'right', 1) }),
          _react2.default.createElement(
            _reactAddonsCssTransitionGroup2.default,
            { transitionName: animation, transitionEnterTimeout: 350, transitionLeaveTimeout: 350 },
            _react2.default.createElement(_CalendarMonth2.default, {
              key: this.state.viewDate.getMonth(),
              maxDate: this.props.maxDate,
              minDate: this.props.minDate,
              onDayClick: this.handleDayClick,
              selectedDate: this.props.selectedDate,
              theme: this.props.theme,
              viewDate: this.state.viewDate
            })
          )
        );
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          'div',
          { className: this.props.theme.calendar },
          this.props.display === 'months' ? this.renderMonths() : this.renderYears()
        );
      }
    }]);

    return Calendar;
  }(_react.Component);

  Calendar.propTypes = {
    display: _react.PropTypes.oneOf(['months', 'years']),
    maxDate: _react.PropTypes.object,
    minDate: _react.PropTypes.object,
    onChange: _react.PropTypes.func,
    selectedDate: _react.PropTypes.object,
    theme: _react.PropTypes.shape({
      active: _react.PropTypes.string,
      calendar: _react.PropTypes.string,
      next: _react.PropTypes.string,
      prev: _react.PropTypes.string,
      years: _react.PropTypes.string
    }),
    viewDate: _react.PropTypes.object
  };
  Calendar.defaultProps = {
    display: 'months',
    selectedDate: new Date()
  };


  return Calendar;
};

exports.default = factory;