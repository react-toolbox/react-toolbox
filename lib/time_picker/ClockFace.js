'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Face = function (_Component) {
  _inherits(Face, _Component);

  function Face() {
    _classCallCheck(this, Face);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Face).apply(this, arguments));
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
    key: 'renderNumber',
    value: function renderNumber(number, idx) {
      var _props = this.props;
      var active = _props.active;
      var radius = _props.radius;
      var spacing = _props.spacing;
      var theme = _props.theme;
      var twoDigits = _props.twoDigits;

      return _react2.default.createElement(
        'span',
        {
          className: (0, _classnames3.default)(theme.number, _defineProperty({}, theme.active, number === active)),
          style: this.numberStyle(radius - spacing, idx + 1),
          key: number
        },
        twoDigits ? ('0' + number).slice(-2) : number
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props;
      var numbers = _props2.numbers;
      var onTouchStart = _props2.onTouchStart;
      var onMouseDown = _props2.onMouseDown;
      var theme = _props2.theme;

      return _react2.default.createElement(
        'div',
        {
          ref: 'root',
          className: theme.face,
          onTouchStart: onTouchStart,
          onMouseDown: onMouseDown,
          style: this.faceStyle()
        },
        numbers.map(this.renderNumber.bind(this))
      );
    }
  }]);

  return Face;
}(_react.Component);

Face.propTypes = {
  active: _react.PropTypes.number,
  numbers: _react.PropTypes.array,
  radius: _react.PropTypes.number,
  spacing: _react.PropTypes.number,
  theme: _react.PropTypes.shape({
    active: _react.PropTypes.string,
    face: _react.PropTypes.string,
    number: _react.PropTypes.string
  }),
  twoDigits: _react.PropTypes.bool
};
Face.defaultProps = {
  active: null,
  numbers: [],
  radius: 0,
  twoDigits: false
};
exports.default = Face;