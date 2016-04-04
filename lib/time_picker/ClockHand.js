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

var _style = require('./style.clock');

var _style2 = _interopRequireDefault(_style);

var _events = require('../utils/events');

var _events2 = _interopRequireDefault(_events);

var _prefixer = require('../utils/prefixer');

var _prefixer2 = _interopRequireDefault(_prefixer);

var _utils = require('../utils/utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
  Hand: {
    displayName: 'Hand'
  }
};

var _reactTransformHmr2 = (0, _reactTransformHmr4.default)({
  filename: 'components/time_picker/ClockHand.jsx',
  components: _components,
  locals: [module],
  imports: [_react3.default]
});

var _reactTransformCatchErrors2 = (0, _reactTransformCatchErrors4.default)({
  filename: 'components/time_picker/ClockHand.jsx',
  components: _components,
  locals: [],
  imports: [_react3.default, _redboxReact3.default]
});

function _wrapComponent(id) {
  return function (Component) {
    return _reactTransformHmr2(_reactTransformCatchErrors2(Component, id), id);
  };
}

var Hand = _wrapComponent('Hand')((_temp2 = _class = function (_React$Component) {
  _inherits(Hand, _React$Component);

  function Hand() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, Hand);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Hand)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
      knobWidth: 0
    }, _this.handleMouseMove = function (event) {
      _this.move(_events2.default.getMousePosition(event));
    }, _this.handleTouchMove = function (event) {
      _this.move(_events2.default.getTouchPosition(event));
    }, _this.handleMouseUp = function () {
      _this.end(_this.getMouseEventMap());
    }, _this.handleTouchEnd = function () {
      _this.end(_this.getTouchEventMap());
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Hand, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      setTimeout(function () {
        _this2.setState({ knobWidth: _this2.refs.knob.offsetWidth });
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _events2.default.removeEventsFromDocument(this.getMouseEventMap());
      _events2.default.removeEventsFromDocument(this.getTouchEventMap());
    }
  }, {
    key: 'getMouseEventMap',
    value: function getMouseEventMap() {
      return {
        mousemove: this.handleMouseMove,
        mouseup: this.handleMouseUp
      };
    }
  }, {
    key: 'getTouchEventMap',
    value: function getTouchEventMap() {
      return {
        touchmove: this.handleTouchMove,
        touchend: this.handleTouchEnd
      };
    }
  }, {
    key: 'mouseStart',
    value: function mouseStart(event) {
      _events2.default.addEventsToDocument(this.getMouseEventMap());
      this.move(_events2.default.getMousePosition(event));
    }
  }, {
    key: 'touchStart',
    value: function touchStart(event) {
      _events2.default.addEventsToDocument(this.getTouchEventMap());
      this.move(_events2.default.getTouchPosition(event));
      _events2.default.pauseEvent(event);
    }
  }, {
    key: 'getPositionRadius',
    value: function getPositionRadius(position) {
      var x = this.props.origin.x - position.x;
      var y = this.props.origin.y - position.y;
      return Math.sqrt(x * x + y * y);
    }
  }, {
    key: 'trimAngleToValue',
    value: function trimAngleToValue(angle) {
      return this.props.step * Math.round(angle / this.props.step);
    }
  }, {
    key: 'positionToAngle',
    value: function positionToAngle(position) {
      return _utils2.default.angle360FromPositions(this.props.origin.x, this.props.origin.y, position.x, position.y);
    }
  }, {
    key: 'end',
    value: function end(evts) {
      if (this.props.onMoved) this.props.onMoved();
      _events2.default.removeEventsFromDocument(evts);
    }
  }, {
    key: 'move',
    value: function move(position) {
      var degrees = this.trimAngleToValue(this.positionToAngle(position));
      var radius = this.getPositionRadius(position);
      if (this.props.onMove) this.props.onMove(degrees === 360 ? 0 : degrees, radius);
    }
  }, {
    key: 'render',
    value: function render() {
      var className = _style2.default.hand + ' ' + this.props.className;
      var handStyle = (0, _prefixer2.default)({
        height: this.props.length - this.state.knobWidth / 2,
        transform: 'rotate(' + this.props.angle + 'deg)'
      });

      return _react3.default.createElement(
        'div',
        { className: className, style: handStyle },
        _react3.default.createElement('div', { ref: 'knob', className: _style2.default.knob })
      );
    }
  }]);

  return Hand;
}(_react3.default.Component), _class.propTypes = {
  angle: _react3.default.PropTypes.number,
  className: _react3.default.PropTypes.string,
  length: _react3.default.PropTypes.number,
  onMove: _react3.default.PropTypes.func,
  onMoved: _react3.default.PropTypes.func,
  origin: _react3.default.PropTypes.object,
  step: _react3.default.PropTypes.number
}, _class.defaultProps = {
  className: '',
  angle: 0,
  length: 0,
  origin: {}
}, _temp2));

exports.default = Hand;