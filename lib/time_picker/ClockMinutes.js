'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utils = require('../utils/utils');

var _ClockHand = require('./ClockHand');

var _ClockHand2 = _interopRequireDefault(_ClockHand);

var _ClockFace = require('./ClockFace');

var _ClockFace2 = _interopRequireDefault(_ClockFace);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var minutes = (0, _utils.range)(0, 60, 5);
var step = 360 / 60;

var Minutes = function (_Component) {
  _inherits(Minutes, _Component);

  function Minutes() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Minutes);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Minutes.__proto__ || Object.getPrototypeOf(Minutes)).call.apply(_ref, [this].concat(args))), _this), _this.handleHandMove = function (degrees) {
      _this.props.onChange(degrees / step);
    }, _this.handleMouseDown = function (event) {
      _this.handNode.mouseStart(event);
    }, _this.handleTouchStart = function (event) {
      _this.handNode.touchStart(event);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Minutes, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_ClockFace2.default, {
          onTouchStart: this.handleTouchStart,
          onMouseDown: this.handleMouseDown,
          numbers: minutes,
          spacing: this.props.spacing,
          radius: this.props.radius,
          active: this.props.selected,
          theme: this.props.theme,
          twoDigits: true
        }),
        _react2.default.createElement(_ClockHand2.default, {
          ref: function ref(node) {
            _this2.handNode = node;
          },
          className: minutes.indexOf(this.props.selected) === -1 ? this.props.theme.small : '',
          angle: this.props.selected * step,
          length: this.props.radius - this.props.spacing,
          onMove: this.handleHandMove,
          origin: this.props.center,
          theme: this.props.theme,
          step: step
        })
      );
    }
  }]);

  return Minutes;
}(_react.Component);

Minutes.propTypes = {
  center: _propTypes2.default.shape({
    x: _propTypes2.default.number,
    y: _propTypes2.default.number
  }),
  onChange: _propTypes2.default.func,
  radius: _propTypes2.default.number,
  selected: _propTypes2.default.number,
  spacing: _propTypes2.default.number,
  theme: _propTypes2.default.shape({
    small: _propTypes2.default.string
  })
};
Minutes.defaultProps = {
  selected: 0,
  onChange: null
};
exports.default = Minutes;