'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('../utils/utils');

var _utils2 = _interopRequireDefault(_utils);

var _style = require('./style.clock');

var _style2 = _interopRequireDefault(_style);

var _ClockFace = require('./ClockFace');

var _ClockFace2 = _interopRequireDefault(_ClockFace);

var _ClockHand = require('./ClockHand');

var _ClockHand2 = _interopRequireDefault(_ClockHand);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var minutes = _utils2.default.range(0, 60, 5);
var step = 360 / 60;

var Minutes = function (_React$Component) {
  _inherits(Minutes, _React$Component);

  function Minutes() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, Minutes);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Minutes)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.handleHandMove = function (degrees) {
      _this.props.onChange(degrees / step);
    }, _this.handleMouseDown = function (event) {
      _this.refs.hand.mouseStart(event);
    }, _this.handleTouchStart = function (event) {
      _this.refs.hand.touchStart(event);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Minutes, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_ClockFace2.default, {
          onTouchStart: this.handleTouchStart,
          onMouseDown: this.handleMouseDown,
          numbers: minutes,
          spacing: this.props.spacing,
          radius: this.props.radius,
          twoDigits: true,
          active: this.props.selected
        }),
        _react2.default.createElement(_ClockHand2.default, { ref: 'hand',
          className: minutes.indexOf(this.props.selected) === -1 ? _style2.default.small : '',
          angle: this.props.selected * step,
          length: this.props.radius - this.props.spacing,
          onMove: this.handleHandMove,
          origin: this.props.center,
          step: step
        })
      );
    }
  }]);

  return Minutes;
}(_react2.default.Component);

Minutes.propTypes = {
  center: _react2.default.PropTypes.object,
  onChange: _react2.default.PropTypes.func,
  radius: _react2.default.PropTypes.number,
  selected: _react2.default.PropTypes.number,
  spacing: _react2.default.PropTypes.number
};
Minutes.defaultProps = {
  selected: 0,
  onChange: null
};
exports.default = Minutes;