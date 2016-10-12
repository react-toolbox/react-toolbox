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

var _utils = require('../utils/utils.js');

var _utils2 = _interopRequireDefault(_utils);

var _ClockHand = require('./ClockHand.js');

var _ClockHand2 = _interopRequireDefault(_ClockHand);

var _ClockFace = require('./ClockFace.js');

var _ClockFace2 = _interopRequireDefault(_ClockFace);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
  Minutes: {
    displayName: 'Minutes'
  }
};

var _reactTransformHmr2 = (0, _reactTransformHmr4.default)({
  filename: 'components/time_picker/ClockMinutes.js',
  components: _components,
  locals: [module],
  imports: [_react3.default]
});

var _reactTransformCatchErrors2 = (0, _reactTransformCatchErrors4.default)({
  filename: 'components/time_picker/ClockMinutes.js',
  components: _components,
  locals: [],
  imports: [_react3.default, _redboxReact3.default]
});

function _wrapComponent(id) {
  return function (Component) {
    return _reactTransformHmr2(_reactTransformCatchErrors2(Component, id), id);
  };
}

var minutes = _utils2.default.range(0, 60, 5);
var step = 360 / 60;

var Minutes = _wrapComponent('Minutes')((_temp2 = _class = function (_Component) {
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
      _this.refs.hand.mouseStart(event);
    }, _this.handleTouchStart = function (event) {
      _this.refs.hand.touchStart(event);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Minutes, [{
    key: 'render',
    value: function render() {
      return _react3.default.createElement(
        'div',
        null,
        _react3.default.createElement(_ClockFace2.default, {
          onTouchStart: this.handleTouchStart,
          onMouseDown: this.handleMouseDown,
          numbers: minutes,
          spacing: this.props.spacing,
          radius: this.props.radius,
          active: this.props.selected,
          theme: this.props.theme,
          twoDigits: true
        }),
        _react3.default.createElement(_ClockHand2.default, { ref: 'hand',
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
}(_react2.Component), _class.propTypes = {
  center: _react2.PropTypes.object,
  onChange: _react2.PropTypes.func,
  radius: _react2.PropTypes.number,
  selected: _react2.PropTypes.number,
  spacing: _react2.PropTypes.number,
  theme: _react2.PropTypes.shape({
    small: _react2.PropTypes.string
  })
}, _class.defaultProps = {
  selected: 0,
  onChange: null
}, _temp2));

exports.default = Minutes;