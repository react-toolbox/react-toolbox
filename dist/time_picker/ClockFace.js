'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable no-mixed-operators */


var Face = function (_Component) {
  _inherits(Face, _Component);

  function Face() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Face);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Face.__proto__ || Object.getPrototypeOf(Face)).call.apply(_ref, [this].concat(args))), _this), _this.renderNumber = function (number, idx) {
      var _this$props = _this.props,
          active = _this$props.active,
          radius = _this$props.radius,
          spacing = _this$props.spacing,
          theme = _this$props.theme,
          twoDigits = _this$props.twoDigits;

      return _react2.default.createElement(
        'span',
        {
          className: (0, _classnames3.default)(theme.number, _defineProperty({}, theme.active, number === active)),
          style: _this.numberStyle(radius - spacing, idx + 1),
          key: number
        },
        twoDigits ? ('0' + number).slice(-2) : number
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Face, [{
    key: 'numberStyle',
    value: function numberStyle(rad, num) {
      return {
        position: 'absolute',
        left: rad + rad * Math.sin(360 * (Math.PI / 180) / 12 * (num - 1)) + this.props.spacing,
        top: rad - rad * Math.cos(360 * (Math.PI / 180) / 12 * (num - 1)) + this.props.spacing
      };
    }
  }, {
    key: 'faceStyle',
    value: function faceStyle() {
      return {
        height: this.props.radius * 2,
        width: this.props.radius * 2
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          numbers = _props.numbers,
          onTouchStart = _props.onTouchStart,
          onMouseDown = _props.onMouseDown,
          theme = _props.theme; // eslint-disable-line

      return _react2.default.createElement(
        'div',
        {
          className: theme.face,
          onTouchStart: onTouchStart,
          onMouseDown: onMouseDown,
          style: this.faceStyle()
        },
        numbers.map(this.renderNumber)
      );
    }
  }]);

  return Face;
}(_react.Component);

Face.propTypes = {
  active: _propTypes2.default.number,
  numbers: _propTypes2.default.arrayOf(_propTypes2.default.number),
  radius: _propTypes2.default.number,
  spacing: _propTypes2.default.number,
  theme: _propTypes2.default.shape({
    active: _propTypes2.default.string,
    face: _propTypes2.default.string,
    number: _propTypes2.default.string
  }),
  twoDigits: _propTypes2.default.bool
};
Face.defaultProps = {
  active: null,
  numbers: [],
  radius: 0,
  twoDigits: false
};
exports.default = Face;