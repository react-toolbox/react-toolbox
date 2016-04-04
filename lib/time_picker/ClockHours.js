'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('../utils/utils');

var _utils2 = _interopRequireDefault(_utils);

var _ClockFace = require('./ClockFace');

var _ClockFace2 = _interopRequireDefault(_ClockFace);

var _ClockHand = require('./ClockHand');

var _ClockHand2 = _interopRequireDefault(_ClockHand);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var outerNumbers = [0].concat(_toConsumableArray(_utils2.default.range(13, 24)));
var innerNumbers = [12].concat(_toConsumableArray(_utils2.default.range(1, 12)));
var innerSpacing = 1.7;
var step = 360 / 12;

var Hours = function (_React$Component) {
  _inherits(Hours, _React$Component);

  function Hours() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, Hours);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Hours)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
      inner: _this.props.format === '24hr' && _this.props.selected > 0 && _this.props.selected <= 12
    }, _this.handleHandMove = function (degrees, radius) {
      var currentInner = radius < _this.props.radius - _this.props.spacing * innerSpacing;
      if (_this.props.format === '24hr' && _this.state.inner !== currentInner) {
        _this.setState({ inner: currentInner }, function () {
          _this.props.onChange(_this.valueFromDegrees(degrees));
        });
      } else {
        _this.props.onChange(_this.valueFromDegrees(degrees));
      }
    }, _this.handleMouseDown = function (event) {
      _this.refs.hand.mouseStart(event);
    }, _this.handleTouchStart = function (event) {
      _this.refs.hand.touchStart(event);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Hours, [{
    key: 'valueFromDegrees',
    value: function valueFromDegrees(degrees) {
      if (this.props.format === 'ampm' || this.props.format === '24hr' && this.state.inner) {
        return innerNumbers[degrees / step];
      } else {
        return outerNumbers[degrees / step];
      }
    }
  }, {
    key: 'renderInnerFace',
    value: function renderInnerFace(innerRadius) {
      if (this.props.format === '24hr') {
        return _react2.default.createElement(_ClockFace2.default, {
          onTouchStart: this.handleTouchStart,
          onMouseDown: this.handleMouseDown,
          numbers: innerNumbers,
          spacing: this.props.spacing,
          radius: innerRadius,
          active: this.props.selected
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var format = _props.format;
      var selected = _props.selected;
      var radius = _props.radius;
      var spacing = _props.spacing;
      var center = _props.center;
      var onHandMoved = _props.onHandMoved;

      var is24hr = format === '24hr';

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_ClockFace2.default, {
          onTouchStart: this.handleTouchStart,
          onMouseDown: this.handleMouseDown,
          numbers: is24hr ? outerNumbers : innerNumbers,
          spacing: spacing,
          radius: radius,
          twoDigits: is24hr,
          active: is24hr ? selected : selected % 12 || 12
        }),
        this.renderInnerFace(radius - spacing * innerSpacing),
        _react2.default.createElement(_ClockHand2.default, { ref: 'hand',
          angle: selected * step,
          length: (this.state.inner ? radius - spacing * innerSpacing : radius) - spacing,
          onMove: this.handleHandMove,
          onMoved: onHandMoved,
          origin: center,
          step: step
        })
      );
    }
  }]);

  return Hours;
}(_react2.default.Component);

Hours.propTypes = {
  center: _react2.default.PropTypes.object,
  format: _react2.default.PropTypes.oneOf(['24hr', 'ampm']),
  onChange: _react2.default.PropTypes.func,
  onHandMoved: _react2.default.PropTypes.func,
  radius: _react2.default.PropTypes.number,
  selected: _react2.default.PropTypes.number,
  spacing: _react2.default.PropTypes.number
};
exports.default = Hours;