'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Portal = require('../hoc/Portal');

var _Portal2 = _interopRequireDefault(_Portal);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _reactCssThemr = require('react-css-themr');

var _identifiers = require('../identifiers.js');

var _events = require('../utils/events');

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaults = {
  className: '',
  delay: 0,
  hideOnClick: true,
  theme: {}
};

var tooltipFactory = function tooltipFactory() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var _defaults$options = _extends({}, defaults, options);

  var defaultClassName = _defaults$options.className;
  var defaultDelay = _defaults$options.delay;
  var defaultHideOnClick = _defaults$options.hideOnClick;
  var defaultTheme = _defaults$options.theme;


  return function (ComposedComponent) {
    var TooltippedComponent = function (_Component) {
      _inherits(TooltippedComponent, _Component);

      function TooltippedComponent() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, TooltippedComponent);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(TooltippedComponent)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
          active: false,
          visible: false
        }, _this.onTransformEnd = function (e) {
          if (e.propertyName === 'transform') {
            _events2.default.removeEventListenerOnTransitionEnded(_this.refs.tooltip, _this.onTransformEnd);
            _this.setState({ visible: false });
          }
        }, _this.handleMouseEnter = function (event) {
          var yOffset = window.scrollY || window.pageYOffset;
          var xOffset = window.scrollX || window.pageXOffset;

          var _event$target$getBoun = event.target.getBoundingClientRect();

          var top = _event$target$getBoun.top;
          var left = _event$target$getBoun.left;
          var height = _event$target$getBoun.height;
          var width = _event$target$getBoun.width;

          _this.activate(top + height + yOffset, left + width / 2 + xOffset);
          if (_this.props.onMouseEnter) _this.props.onMouseEnter(event);
        }, _this.handleMouseLeave = function (event) {
          _this.deactivate();
          if (_this.props.onMouseLeave) _this.props.onMouseLeave(event);
        }, _this.handleClick = function (event) {
          if (_this.props.tooltipHideOnClick) _this.deactivate();
          if (_this.props.onClick) _this.props.onClick(event);
        }, _temp), _possibleConstructorReturn(_this, _ret);
      }

      _createClass(TooltippedComponent, [{
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          if (this.refs.tooltip) {
            _events2.default.removeEventListenerOnTransitionEnded(this.refs.tooltip, this.onTransformEnd);
          }
        }
      }, {
        key: 'activate',
        value: function activate(top, left) {
          var _this2 = this;

          if (this.timeout) clearTimeout(this.timeout);
          this.setState({ visible: true });
          this.timeout = setTimeout(function () {
            _this2.setState({ active: true, top: top, left: left });
          }, this.props.tooltipDelay);
        }
      }, {
        key: 'deactivate',
        value: function deactivate() {
          if (this.timeout) clearTimeout(this.timeout);
          if (this.state.active) {
            _events2.default.addEventListenerOnTransitionEnded(this.refs.tooltip, this.onTransformEnd);
            this.setState({ active: false });
          } else if (this.state.visible) {
            this.setState({ visible: false });
          }
        }
      }, {
        key: 'render',
        value: function render() {
          var _state = this.state;
          var active = _state.active;
          var left = _state.left;
          var top = _state.top;
          var visible = _state.visible;
          var _props = this.props;
          var children = _props.children;
          var className = _props.className;
          var theme = _props.theme;
          var tooltip = _props.tooltip;
          var tooltipDelay = _props.tooltipDelay;
          var tooltipHideOnClick = _props.tooltipHideOnClick;

          var other = _objectWithoutProperties(_props, ['children', 'className', 'theme', 'tooltip', 'tooltipDelay', 'tooltipHideOnClick']);

          return _react2.default.createElement(
            ComposedComponent,
            _extends({}, other, {
              className: className,
              onClick: this.handleClick,
              onMouseEnter: this.handleMouseEnter,
              onMouseLeave: this.handleMouseLeave,
              theme: theme
            }),
            children ? children : null,
            visible && _react2.default.createElement(
              _Portal2.default,
              null,
              _react2.default.createElement('span', {
                ref: 'tooltip',
                children: tooltip,
                className: (0, _classnames3.default)(theme.tooltip, _defineProperty({}, theme.tooltipActive, active)),
                'data-react-toolbox': 'tooltip',
                style: { top: top, left: left }
              })
            )
          );
        }
      }]);

      return TooltippedComponent;
    }(_react.Component);

    TooltippedComponent.propTypes = {
      children: _react.PropTypes.any,
      className: _react.PropTypes.string,
      onClick: _react.PropTypes.func,
      onMouseEnter: _react.PropTypes.func,
      onMouseLeave: _react.PropTypes.func,
      theme: _react.PropTypes.shape({
        tooltip: _react.PropTypes.string,
        tooltipActive: _react.PropTypes.string,
        tooltipWrapper: _react.PropTypes.string
      }),
      tooltip: _react.PropTypes.string,
      tooltipDelay: _react.PropTypes.number,
      tooltipHideOnClick: _react.PropTypes.bool
    };
    TooltippedComponent.defaultProps = {
      className: defaultClassName,
      tooltipDelay: defaultDelay,
      tooltipHideOnClick: defaultHideOnClick
    };


    return (0, _reactCssThemr.themr)(_identifiers.TOOLTIP, defaultTheme)(TooltippedComponent);
  };
};

exports.default = tooltipFactory;