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

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

var _animations = require('../animations');

var _style = require('./style.clock');

var _style2 = _interopRequireDefault(_style);

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

var _components = {
  Clock: {
    displayName: 'Clock'
  }
};

var _reactTransformHmr2 = (0, _reactTransformHmr4.default)({
  filename: 'components/time_picker/Clock.jsx',
  components: _components,
  locals: [module],
  imports: [_react3.default]
});

var _reactTransformCatchErrors2 = (0, _reactTransformCatchErrors4.default)({
  filename: 'components/time_picker/Clock.jsx',
  components: _components,
  locals: [],
  imports: [_react3.default, _redboxReact3.default]
});

function _wrapComponent(id) {
  return function (Component) {
    return _reactTransformHmr2(_reactTransformCatchErrors2(Component, id), id);
  };
}

var Clock = _wrapComponent('Clock')((_temp2 = _class = function (_React$Component) {
  _inherits(Clock, _React$Component);

  function Clock() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, Clock);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Clock)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
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
      var _this$refs$placeholde = _this.refs.placeholder.getBoundingClientRect();

      var top = _this$refs$placeholde.top;
      var left = _this$refs$placeholde.left;
      var width = _this$refs$placeholde.width;

      _this.setState({
        center: { x: left + width / 2, y: top + width / 2 },
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
        } else {
          return hour === 12 ? 0 : hour;
        }
      } else {
        return hour;
      }
    }
  }, {
    key: 'renderHours',
    value: function renderHours() {
      return _react3.default.createElement(_ClockHours2.default, {
        center: this.state.center,
        format: this.props.format,
        onChange: this.handleHourChange,
        radius: this.state.radius,
        selected: this.props.time.getHours(),
        spacing: this.state.radius * 0.18,
        onHandMoved: this.props.onHandMoved
      });
    }
  }, {
    key: 'renderMinutes',
    value: function renderMinutes() {
      return _react3.default.createElement(_ClockMinutes2.default, {
        center: this.state.center,
        onChange: this.handleMinuteChange,
        radius: this.state.radius,
        selected: this.props.time.getMinutes(),
        spacing: this.state.radius * 0.18,
        onHandMoved: this.props.onHandMoved
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var animation = this.props.display === 'hours' ? _animations.ZoomOut : _animations.ZoomIn;
      return _react3.default.createElement(
        'div',
        { 'data-react-toolbox': 'clock', className: _style2.default.root },
        _react3.default.createElement(
          'div',
          { ref: 'placeholder', className: _style2.default.placeholder, style: { height: this.state.radius * 2 } },
          _react3.default.createElement(
            _reactAddonsCssTransitionGroup2.default,
            { transitionName: animation, transitionEnterTimeout: 500, transitionLeaveTimeout: 500 },
            _react3.default.createElement(
              'div',
              { key: this.props.display, className: _style2.default.wrapper, style: { height: this.state.radius * 2 } },
              this.props.display === 'hours' ? this.renderHours() : null,
              this.props.display === 'minutes' ? this.renderMinutes() : null
            )
          )
        )
      );
    }
  }]);

  return Clock;
}(_react3.default.Component), _class.propTypes = {
  className: _react3.default.PropTypes.string,
  display: _react3.default.PropTypes.oneOf(['hours', 'minutes']),
  format: _react3.default.PropTypes.oneOf(['24hr', 'ampm']),
  onChange: _react3.default.PropTypes.func,
  onHandMoved: _react3.default.PropTypes.func,
  time: _react3.default.PropTypes.object
}, _class.defaultProps = {
  className: '',
  display: 'hours',
  format: '24hr',
  time: new Date()
}, _temp2));

exports.default = Clock;