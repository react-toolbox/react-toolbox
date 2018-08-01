'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _reactCssThemr = require('react-css-themr');

var _dissoc = require('ramda/src/dissoc');

var _dissoc2 = _interopRequireDefault(_dissoc);

var _identifiers = require('../identifiers');

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
  multiple: true,
  passthrough: true,
  spread: 2,
  theme: {}
};

var rippleFactory = function rippleFactory() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var _defaults$options = _extends({}, defaults, options),
      defaultCentered = _defaults$options.centered,
      defaultClassName = _defaults$options.className,
      defaultMultiple = _defaults$options.multiple,
      defaultPassthrough = _defaults$options.passthrough,
      defaultSpread = _defaults$options.spread,
      defaultTheme = _defaults$options.theme,
      props = _objectWithoutProperties(_defaults$options, ['centered', 'className', 'multiple', 'passthrough', 'spread', 'theme']);

  return function (ComposedComponent) {
    var RippledComponent = function (_Component) {
      _inherits(RippledComponent, _Component);

      function RippledComponent() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, RippledComponent);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = RippledComponent.__proto__ || Object.getPrototypeOf(RippledComponent)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
          ripples: {}
        }, _this.rippleNodes = {}, _this.doRipple = function () {
          return !_this.props.disabled && _this.props.ripple;
        }, _this.handleMouseDown = function (event) {
          if (_this.props.onMouseDown) _this.props.onMouseDown(event);
          if (_this.doRipple()) {
            var _events$getMousePosit = _events2.default.getMousePosition(event),
                x = _events$getMousePosit.x,
                y = _events$getMousePosit.y;

            _this.animateRipple(x, y, false);
          }
        }, _this.handleTouchStart = function (event) {
          if (_this.props.onTouchStart) _this.props.onTouchStart(event);
          if (_this.doRipple()) {
            var _events$getTouchPosit = _events2.default.getTouchPosition(event),
                x = _events$getTouchPosit.x,
                y = _events$getTouchPosit.y;

            _this.animateRipple(x, y, true);
          }
        }, _temp), _possibleConstructorReturn(_this, _ret);
      }

      _createClass(RippledComponent, [{
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
          // If a new ripple was just added, add a remove event listener to its animation
          if (Object.keys(prevState.ripples).length < Object.keys(this.state.ripples).length) {
            this.addRippleRemoveEventListener(this.getLastKey());
          }
        }
      }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          var _this2 = this;

          // Remove document event listeners for ripple if they still exists
          Object.keys(this.state.ripples).forEach(function (key) {
            _this2.state.ripples[key].endRipple();
          });
        }

        /**
         * Find out a descriptor object for the ripple element being created depending on
         * the position where the it was triggered and the component's dimensions.
         *
         * @param {Number} x Coordinate x in the viewport where ripple was triggered
         * @param {Number} y Coordinate y in the viewport where ripple was triggered
         * @return {Object} Descriptor element including position and size of the element
         */

      }, {
        key: 'getDescriptor',
        value: function getDescriptor(x, y) {
          var _ReactDOM$findDOMNode = _reactDom2.default.findDOMNode(this).getBoundingClientRect(),
              left = _ReactDOM$findDOMNode.left,
              top = _ReactDOM$findDOMNode.top,
              height = _ReactDOM$findDOMNode.height,
              width = _ReactDOM$findDOMNode.width;

          var _props = this.props,
              centered = _props.rippleCentered,
              spread = _props.rippleSpread;

          return {
            left: centered ? 0 : x - left - width / 2,
            top: centered ? 0 : y - top - height / 2,
            width: width * spread
          };
        }

        /**
         * Increments and internal counter and returns the next value as a string. It
         * is used to assign key references to new ripple elements.
         *
         * @return {String} Key to be assigned to a ripple.
         */

      }, {
        key: 'getNextKey',
        value: function getNextKey() {
          this.currentCount = this.currentCount ? this.currentCount + 1 : 1;
          return 'ripple' + this.currentCount;
        }

        /**
         * Return the last generated key for a ripple element. When there is only one ripple
         * and to get the reference when a ripple was just created.
         *
         * @return {String} The last generated ripple key.
         */

      }, {
        key: 'getLastKey',
        value: function getLastKey() {
          return 'ripple' + this.currentCount;
        }

        /**
         * Variable to store the ripple references
         */

      }, {
        key: 'rippleShouldTrigger',


        /**
         * Determine if a ripple should start depending if its a touch event. For mobile both
         * touchStart and mouseDown are launched so in case is touch we should always trigger
         * but if its not we should check if a touch was already triggered to decide.
         *
         * @param {Boolean} isTouch True in case a touch event triggered the ripple false otherwise.
         * @return {Boolean} True in case the ripple should trigger or false if it shouldn't.
         */
        value: function rippleShouldTrigger(isTouch) {
          var shouldStart = isTouch ? true : !this.touchCache;
          this.touchCache = isTouch;
          return shouldStart;
        }

        /**
         * Start a ripple animation on an specific point with touch or mouse events. First
         * decides if the animation should trigger. If the ripple is multiple or there is no
         * ripple present, it creates a new key. If it's a simple ripple and already exists,
         * it just restarts the current ripple. The animation happens in two state changes
         * to allow triggering via css.
         *
         * @param {Number} x Coordinate X on the screen where animation should start
         * @param {Number} y Coordinate Y on the screen where animation should start
         * @param {Boolean} isTouch Use events from touch or mouse.
         */

      }, {
        key: 'animateRipple',
        value: function animateRipple(x, y, isTouch) {
          var _this3 = this;

          if (this.rippleShouldTrigger(isTouch)) {
            var _getDescriptor = this.getDescriptor(x, y),
                top = _getDescriptor.top,
                left = _getDescriptor.left,
                width = _getDescriptor.width;

            var noRipplesActive = Object.keys(this.state.ripples).length === 0;
            var key = this.props.rippleMultiple || noRipplesActive ? this.getNextKey() : this.getLastKey();
            var endRipple = this.addRippleDeactivateEventListener(isTouch, key);
            var initialState = { active: false, restarting: true, top: top, left: left, width: width, endRipple: endRipple };
            var runningState = { active: true, restarting: false };
            var ripples = _extends({}, this.state.ripples, _defineProperty({}, key, initialState));
            this.setState({ ripples: ripples }, function () {
              if (_this3.rippleNodes[key]) _this3.rippleNodes[key].offsetWidth; // eslint-disable-line
              _this3.setState({ ripples: _extends({}, _this3.state.ripples, _defineProperty({}, key, Object.assign({}, _this3.state.ripples[key], runningState))) });
            });
          }
        }

        /**
         * Add an event listener to the reference with given key so when the animation transition
         * ends we can be sure that it finished and it can be safely removed from the state.
         * This function is called whenever a new ripple is added to the component.
         *
         * @param {String} rippleKey Is the key of the ripple to add the event.
         */

      }, {
        key: 'addRippleRemoveEventListener',
        value: function addRippleRemoveEventListener(rippleKey) {
          var self = this;
          var rippleNode = this.rippleNodes[rippleKey];
          _events2.default.addEventListenerOnTransitionEnded(rippleNode, function onOpacityEnd(e) {
            if (e.propertyName === 'opacity') {
              if (self.props.onRippleEnded) self.props.onRippleEnded(e);
              _events2.default.removeEventListenerOnTransitionEnded(self.rippleNodes[rippleKey], onOpacityEnd);
              // self.rippleNodes = dissoc(rippleKey, self.rippleNodes);
              delete self.rippleNodes[rippleKey];
              self.setState({ ripples: (0, _dissoc2.default)(rippleKey, self.state.ripples) });
            }
          });
        }

        /**
         * Add an event listener to the document needed to deactivate a ripple and make it dissappear.
         * Deactivation can happen with a touchend or mouseup depending on the trigger type. The
         * ending function is created from a factory function and returned.
         *
         * @param {Boolean} isTouch True in case the trigger was a touch event false otherwise.
         * @param {String} rippleKey It's a key to identify the ripple that should be deactivated.
         * @return {Function} Callback function that deactivates the ripple and removes the listener
         */

      }, {
        key: 'addRippleDeactivateEventListener',
        value: function addRippleDeactivateEventListener(isTouch, rippleKey) {
          var eventType = isTouch ? 'touchend' : 'mouseup';
          var endRipple = this.createRippleDeactivateCallback(eventType, rippleKey);
          document.addEventListener(eventType, endRipple);
          return endRipple;
        }

        /**
         * Generates a function that can be called to deactivate a ripple and remove its finishing
         * event listener. If is generated because we need to store it to be called on unmount in case
         * the ripple is still running.
         *
         * @param {String} eventType Is the event type that can be touchend or mouseup
         * @param {String} rippleKey Is the key representing the ripple
         * @return {Function} Callback function that deactivates the ripple and removes the listener
         */

      }, {
        key: 'createRippleDeactivateCallback',
        value: function createRippleDeactivateCallback(eventType, rippleKey) {
          var self = this;
          return function endRipple() {
            document.removeEventListener(eventType, endRipple);
            self.setState({ ripples: _extends({}, self.state.ripples, _defineProperty({}, rippleKey, Object.assign({}, self.state.ripples[rippleKey], { active: false }))) });
          };
        }
      }, {
        key: 'renderRipple',
        value: function renderRipple(key, className, _ref2) {
          var _classnames,
              _this4 = this;

          var active = _ref2.active,
              left = _ref2.left,
              restarting = _ref2.restarting,
              top = _ref2.top,
              width = _ref2.width;

          var scale = restarting ? 0 : 1;
          var transform = 'translate3d(' + (-width / 2 + left) + 'px, ' + (-width / 2 + top) + 'px, 0) scale(' + scale + ')';
          var _className = (0, _classnames3.default)(this.props.theme.ripple, (_classnames = {}, _defineProperty(_classnames, this.props.theme.rippleActive, active), _defineProperty(_classnames, this.props.theme.rippleRestarting, restarting), _classnames), className);
          return _react2.default.createElement(
            'span',
            _extends({ key: key, 'data-react-toolbox': 'ripple', className: this.props.theme.rippleWrapper }, props),
            _react2.default.createElement('span', {
              className: _className,
              ref: function ref(node) {
                if (node) _this4.rippleNodes[key] = node;
              },
              style: (0, _prefixer2.default)({ transform: transform }, { width: width, height: width })
            })
          );
        }
      }, {
        key: 'render',
        value: function render() {
          var _this5 = this;

          var _props2 = this.props,
              children = _props2.children,
              disabled = _props2.disabled,
              ripple = _props2.ripple,
              onRippleEnded = _props2.onRippleEnded,
              rippleCentered = _props2.rippleCentered,
              rippleClassName = _props2.rippleClassName,
              rippleMultiple = _props2.rippleMultiple,
              rippleSpread = _props2.rippleSpread,
              theme = _props2.theme,
              other = _objectWithoutProperties(_props2, ['children', 'disabled', 'ripple', 'onRippleEnded', 'rippleCentered', 'rippleClassName', 'rippleMultiple', 'rippleSpread', 'theme']);

          var ripples = this.state.ripples;

          var childRipples = Object.keys(ripples).map(function (key) {
            return _this5.renderRipple(key, rippleClassName, ripples[key]);
          });
          var childProps = _extends({
            onMouseDown: this.handleMouseDown,
            onTouchStart: this.handleTouchStart
          }, other);
          var finalProps = defaultPassthrough ? _extends({}, childProps, { theme: theme, disabled: disabled }) : childProps;

          return !ripple ? _react2.default.createElement(ComposedComponent, finalProps, children) : _react2.default.createElement(ComposedComponent, finalProps, [children, childRipples]);
        }
      }]);

      return RippledComponent;
    }(_react.Component);

    RippledComponent.propTypes = {
      children: _propTypes2.default.node,
      disabled: _propTypes2.default.bool,
      onMouseDown: _propTypes2.default.func,
      onRippleEnded: _propTypes2.default.func,
      onTouchStart: _propTypes2.default.func,
      ripple: _propTypes2.default.bool,
      rippleCentered: _propTypes2.default.bool,
      rippleClassName: _propTypes2.default.string,
      rippleMultiple: _propTypes2.default.bool,
      rippleSpread: _propTypes2.default.number,
      theme: _propTypes2.default.shape({
        ripple: _propTypes2.default.string,
        rippleActive: _propTypes2.default.string,
        rippleRestarting: _propTypes2.default.string,
        rippleWrapper: _propTypes2.default.string
      })
    };
    RippledComponent.defaultProps = {
      disabled: false,
      ripple: true,
      rippleCentered: defaultCentered,
      rippleClassName: defaultClassName,
      rippleMultiple: defaultMultiple,
      rippleSpread: defaultSpread
    };


    return (0, _reactCssThemr.themr)(_identifiers.RIPPLE, defaultTheme)(RippledComponent);
  };
};

exports.default = rippleFactory;