'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _style = require('./style.clock');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Face = function (_React$Component) {
  _inherits(Face, _React$Component);

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
      var className = _style2.default.number;
      if (number === this.props.active) className += ' ' + _style2.default.active;
      return _react2.default.createElement(
        'span',
        {
          className: className,
          style: this.numberStyle(this.props.radius - this.props.spacing, idx + 1),
          key: number
        },
        this.props.twoDigits ? ('0' + number).slice(-2) : number
      );
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        {
          ref: 'root',
          className: _style2.default.face,
          onTouchStart: this.props.onTouchStart,
          onMouseDown: this.props.onMouseDown,
          style: this.faceStyle()
        },
        this.props.numbers.map(this.renderNumber.bind(this))
      );
    }
  }]);

  return Face;
}(_react2.default.Component);

Face.propTypes = {
  active: _react2.default.PropTypes.number,
  numbers: _react2.default.PropTypes.array,
  radius: _react2.default.PropTypes.number,
  spacing: _react2.default.PropTypes.number,
  twoDigits: _react2.default.PropTypes.bool
};
Face.defaultProps = {
  active: null,
  numbers: [],
  radius: 0,
  twoDigits: false
};
exports.default = Face;