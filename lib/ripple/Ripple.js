'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _reactCssThemr = require('react-css-themr');

var _identifiers = require('../identifiers.js');

var _events = require('../utils/events');

var _events2 = _interopRequireDefault(_events);

var _prefixer = require('../utils/prefixer');

var _prefixer2 = _interopRequireDefault(_prefixer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaults = {
  centered: false,
  className: '',
  spread: 2,
  theme: {}
};

var rippleFactory = function rippleFactory() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var _defaults$options = _extends({}, defaults, options);

  var defaultCentered = _defaults$options.centered;
  var defaultClassName = _defaults$options.className;
  var defaultSpread = _defaults$options.spread;
  var defaultTheme = _defaults$options.theme;

  var props = _objectWithoutProperties(_defaults$options, ['centered', 'className', 'spread', 'theme']);

  return function (ComposedComponent) {
    var RippledComponent = function (_Component) {
      _inherits(RippledComponent, _Component);

      function RippledComponent() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, RippledComponent);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(RippledComponent)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
          active: false,
          left: null,
          restarting: false,
          top: null,
          width: null
        }, _this.handleEnd = function () {
          document.removeEventListener(_this.touch ? 'touchend' : 'mouseup', _this.handleEnd);
          _this.setState({ active: false });
        }, _this.start = function (_ref) {
          var pageX = _ref.pageX;
          var pageY = _ref.pageY;
          var touch = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

          if (!_this._isTouchRippleReceivingMouseEvent(touch)) {
            _this.touch = touch;
            document.addEventListener(_this.touch ? 'touchend' : 'mouseup', _this.handleEnd);

            var _this$_getDescriptor = _this._getDescriptor(pageX, pageY);

            var top = _this$_getDescriptor.top;
            var left = _this$_getDescriptor.left;
            var width = _this$_getDescriptor.width;

            _this.setState({ active: false, restarting: true, top: top, left: left, width: width }, function () {
              _this.refs.ripple.offsetWidth; //eslint-disable-line no-unused-expressions
              _this.setState({ active: true, restarting: false });
            });
          }
        }, _this.handleMouseDown = function (event) {
          if (!_this.props.disabled) _this.start(event);
          if (_this.props.onMouseDown) _this.props.onMouseDown(event);
        }, _temp), _possibleConstructorReturn(_this, _ret);
      }

      _createClass(RippledComponent, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
          var _this2 = this;

          if (this.props.onRippleEnded) {
            _events2.default.addEventListenerOnTransitionEnded(this.refs.ripple, function (evt) {
              if (evt.propertyName === 'transform') _this2.props.onRippleEnded(evt);
            });
          }
        }
      }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          if (this.props.onRippleEnded) {
            _events2.default.removeEventListenerOnTransitionEnded(this.refs.ripple);
          }
        }
      }, {
        key: '_isTouchRippleReceivingMouseEvent',
        value: function _isTouchRippleReceivingMouseEvent(touch) {
          return this.touch && !touch;
        }
      }, {
        key: '_getDescriptor',
        value: function _getDescriptor(pageX, pageY) {
          var _ReactDOM$findDOMNode = _reactDom2.default.findDOMNode(this).getBoundingClientRect();

          var left = _ReactDOM$findDOMNode.left;
          var top = _ReactDOM$findDOMNode.top;
          var height = _ReactDOM$findDOMNode.height;
          var width = _ReactDOM$findDOMNode.width;
          var _props = this.props;
          var centered = _props.rippleCentered;
          var spread = _props.rippleSpread;

          return {
            left: centered ? 0 : pageX - left - width / 2 - window.scrollX,
            top: centered ? 0 : pageY - top - height / 2 - window.scrollY,
            width: width * spread
          };
        }
      }, {
        key: 'render',
        value: function render() {
          if (!this.props.ripple) {
            return _react2.default.createElement(ComposedComponent, this.props);
          } else {
            var _classnames;

            var _props2 = this.props;
            var children = _props2.children;
            var ripple = _props2.ripple;
            var className = _props2.rippleClassName;
            var centered = _props2.rippleCentered;
            var spread = _props2.rippleSpread;

            var other = _objectWithoutProperties(_props2, ['children', 'ripple', 'rippleClassName', 'rippleCentered', 'rippleSpread']);

            var rippleClassName = (0, _classnames3.default)(this.props.theme.ripple, (_classnames = {}, _defineProperty(_classnames, this.props.theme.rippleActive, this.state.active), _defineProperty(_classnames, this.props.theme.rippleRestarting, this.state.restarting), _classnames), className);

            var _state = this.state;
            var left = _state.left;
            var top = _state.top;
            var width = _state.width;

            var scale = this.state.restarting ? 0 : 1;
            var rippleStyle = (0, _prefixer2.default)({
              transform: 'translate3d(' + (-width / 2 + left) + 'px, ' + (-width / 2 + top) + 'px, 0) scale(' + scale + ')'
            }, { width: width, height: width });

            return _react2.default.createElement(
              ComposedComponent,
              _extends({}, other, { onMouseDown: this.handleMouseDown }),
              children ? children : null,
              _react2.default.createElement(
                'span',
                _extends({ 'data-react-toolbox': 'ripple', className: this.props.theme.rippleWrapper }, props),
                _react2.default.createElement('span', { ref: 'ripple', role: 'ripple', className: rippleClassName, style: rippleStyle })
              )
            );
          }
        }
      }]);

      return RippledComponent;
    }(_react.Component);

    RippledComponent.propTypes = {
      children: _react.PropTypes.any,
      disabled: _react.PropTypes.bool,
      onRippleEnded: _react.PropTypes.func,
      ripple: _react.PropTypes.bool,
      rippleCentered: _react.PropTypes.bool,
      rippleClassName: _react.PropTypes.string,
      rippleSpread: _react.PropTypes.number,
      theme: _react.PropTypes.shape({
        ripple: _react.PropTypes.string,
        rippleActive: _react.PropTypes.string,
        rippleRestarting: _react.PropTypes.string,
        rippleWrapper: _react.PropTypes.string
      })
    };
    RippledComponent.defaultProps = {
      disabled: false,
      ripple: true,
      rippleCentered: defaultCentered,
      rippleClassName: defaultClassName,
      rippleSpread: defaultSpread
    };


    return (0, _reactCssThemr.themr)(_identifiers.RIPPLE, defaultTheme)(RippledComponent);
  };
};

exports.default = rippleFactory;