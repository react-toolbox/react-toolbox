'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _TransitionGroup = require('react-transition-group/TransitionGroup');

var _TransitionGroup2 = _interopRequireDefault(_TransitionGroup);

var _CSSTransition = require('react-transition-group/CSSTransition');

var _CSSTransition2 = _interopRequireDefault(_CSSTransition);

var _utils = require('../utils/utils');

var _time = require('../utils/time');

var _time2 = _interopRequireDefault(_time);

var _ClockHours = require('./ClockHours');

var _ClockHours2 = _interopRequireDefault(_ClockHours);

var _ClockMinutes = require('./ClockMinutes');

var _ClockMinutes2 = _interopRequireDefault(_ClockMinutes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Clock = function (_Component) {
  _inherits(Clock, _Component);

  function Clock() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Clock);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Clock.__proto__ || Object.getPrototypeOf(Clock)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      center: { x: null, y: null },
      radius: 0
    }, _this.handleHourChange = function (hours) {
      if (_this.props.time.getHours() !== hours) {
        _this.props.onChange(_time2.default.setHours(_this.props.time, _this.adaptHourToFormat(hours)));
      }
    }, _this.handleMinuteChange = function (minutes) {
      if (_this.props.time.getMinutes() !== minutes) {
        _this.props.onChange(_time2.default.setMinutes(_this.props.time, minutes));
      }
    }, _this.handleCalculateShape = function () {
      var _this$placeholderNode = _this.placeholderNode.getBoundingClientRect(),
          top = _this$placeholderNode.top,
          left = _this$placeholderNode.left,
          width = _this$placeholderNode.width;

      _this.setState({
        center: {
          x: left + (width / 2 - window.pageXOffset),
          y: top + (width / 2 - window.pageXOffset)
        },
        radius: width / 2
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Clock, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      window.addEventListener('resize', this.handleCalculateShape);
      setTimeout(function () {
        _this2.handleCalculateShape();
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this.handleCalculateShape);
    }
  }, {
    key: 'adaptHourToFormat',
    value: function adaptHourToFormat(hour) {
      if (this.props.format === 'ampm') {
        if (_time2.default.getTimeMode(this.props.time) === 'pm') {
          return hour < 12 ? hour + 12 : hour;
        }
        return hour === 12 ? 0 : hour;
      }
      return hour;
    }
  }, {
    key: 'renderHours',
    value: function renderHours() {
      return _react2.default.createElement(_ClockHours2.default, {
        center: this.state.center,
        format: this.props.format,
        onChange: this.handleHourChange,
        radius: this.state.radius,
        selected: this.props.time.getHours(),
        spacing: this.state.radius * 0.18,
        onHandMoved: this.props.onHandMoved,
        theme: this.props.theme
      });
    }
  }, {
    key: 'renderMinutes',
    value: function renderMinutes() {
      return _react2.default.createElement(_ClockMinutes2.default, {
        center: this.state.center,
        onChange: this.handleMinuteChange,
        radius: this.state.radius,
        selected: this.props.time.getMinutes(),
        spacing: this.state.radius * 0.18,
        onHandMoved: this.props.onHandMoved,
        theme: this.props.theme
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var theme = this.props.theme;

      var animation = this.state.display === 'hours' ? 'zoomOut' : 'zoomIn';
      var animationModule = (0, _utils.getAnimationModule)(animation, theme);
      return _react2.default.createElement(
        'div',
        { 'data-react-toolbox': 'clock', className: theme.clock },
        _react2.default.createElement(
          'div',
          {
            className: theme.placeholder,
            style: { height: this.state.radius * 2 },
            ref: function ref(node) {
              _this3.placeholderNode = node;
            }
          },
          _react2.default.createElement(
            _TransitionGroup2.default,
            null,
            _react2.default.createElement(
              _CSSTransition2.default,
              { classNames: animationModule, timeout: 500 },
              _react2.default.createElement(
                'div',
                {
                  key: this.props.display,
                  className: theme.clockWrapper,
                  style: { height: this.state.radius * 2 }
                },
                this.props.display === 'hours' ? this.renderHours() : null,
                this.props.display === 'minutes' ? this.renderMinutes() : null
              )
            )
          )
        )
      );
    }
  }]);

  return Clock;
}(_react.Component);

Clock.propTypes = {
  display: _propTypes2.default.oneOf(['hours', 'minutes']),
  format: _propTypes2.default.oneOf(['24hr', 'ampm']),
  onChange: _propTypes2.default.func,
  onHandMoved: _propTypes2.default.func,
  theme: _propTypes2.default.shape({
    clock: _propTypes2.default.string,
    clockWrapper: _propTypes2.default.string,
    placeholder: _propTypes2.default.string
  }),
  time: _propTypes2.default.instanceOf(Date)
};
Clock.defaultProps = {
  className: '',
  display: 'hours',
  format: '24hr',
  time: new Date()
};
exports.default = Clock;