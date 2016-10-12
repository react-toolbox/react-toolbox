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

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
  Face: {
    displayName: 'Face'
  }
};

var _reactTransformHmr2 = (0, _reactTransformHmr4.default)({
  filename: 'components/time_picker/ClockFace.js',
  components: _components,
  locals: [module],
  imports: [_react3.default]
});

var _reactTransformCatchErrors2 = (0, _reactTransformCatchErrors4.default)({
  filename: 'components/time_picker/ClockFace.js',
  components: _components,
  locals: [],
  imports: [_react3.default, _redboxReact3.default]
});

function _wrapComponent(id) {
  return function (Component) {
    return _reactTransformHmr2(_reactTransformCatchErrors2(Component, id), id);
  };
}

var Face = _wrapComponent('Face')((_temp2 = _class = function (_Component) {
  _inherits(Face, _Component);

  function Face() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Face);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Face.__proto__ || Object.getPrototypeOf(Face)).call.apply(_ref, [this].concat(args))), _this), _this.renderNumber = function (number, idx) {
      var _this$props = _this.props;
      var active = _this$props.active;
      var radius = _this$props.radius;
      var spacing = _this$props.spacing;
      var theme = _this$props.theme;
      var twoDigits = _this$props.twoDigits;

      return _react3.default.createElement(
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
      var _props = this.props;
      var numbers = _props.numbers;
      var onTouchStart = _props.onTouchStart;
      var onMouseDown = _props.onMouseDown;
      var theme = _props.theme;

      return _react3.default.createElement(
        'div',
        {
          ref: 'root',
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
}(_react2.Component), _class.propTypes = {
  active: _react2.PropTypes.number,
  numbers: _react2.PropTypes.array,
  radius: _react2.PropTypes.number,
  spacing: _react2.PropTypes.number,
  theme: _react2.PropTypes.shape({
    active: _react2.PropTypes.string,
    face: _react2.PropTypes.string,
    number: _react2.PropTypes.string
  }),
  twoDigits: _react2.PropTypes.bool
}, _class.defaultProps = {
  active: null,
  numbers: [],
  radius: 0,
  twoDigits: false
}, _temp2));

exports.default = Face;