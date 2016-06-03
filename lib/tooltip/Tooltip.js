'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tooltipFactory = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _reactCssThemr = require('react-css-themr');

var _identifiers = require('../identifiers.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var factory = function factory() {
  var defaultTheme = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var Tooltip = function Tooltip(ComposedComponent) {
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
          active: false
        }, _this.handleMouseEnter = function (event) {
          if (_this.timeout) clearTimeout(_this.timeout);
          _this.timeout = setTimeout(function () {
            return _this.setState({ active: true });
          }, _this.props.tooltipDelay);
          if (_this.props.onMouseEnter) _this.props.onMouseEnter(event);
        }, _this.handleMouseLeave = function (event) {
          if (_this.timeout) clearTimeout(_this.timeout);
          if (_this.state.active) _this.setState({ active: false });
          if (_this.props.onMouseLeave) _this.props.onMouseLeave(event);
        }, _this.handleClick = function (event) {
          if (_this.timeout) clearTimeout(_this.timeout);
          if (_this.props.tooltipHideOnClick) _this.setState({ active: false });
          if (_this.props.onClick) _this.props.onClick(event);
        }, _temp), _possibleConstructorReturn(_this, _ret);
      }

      _createClass(TooltippedComponent, [{
        key: 'render',
        value: function render() {
          var _props = this.props;
          var children = _props.children;
          var className = _props.className;
          var tooltip = _props.tooltip;
          var tooltipDelay = _props.tooltipDelay;
          var tooltipHideOnClick = _props.tooltipHideOnClick;
          var theme = _props.theme;

          var other = _objectWithoutProperties(_props, ['children', 'className', 'tooltip', 'tooltipDelay', 'tooltipHideOnClick', 'theme']); //eslint-disable-line no-unused-vars


          var composedClassName = (0, _classnames3.default)(this.props.theme.tooltipWrapper, className);
          var tooltipClassName = (0, _classnames3.default)(this.props.theme.tooltip, _defineProperty({}, this.props.theme.tooltipActive, this.state.active));

          return _react2.default.createElement(
            ComposedComponent,
            _extends({}, other, {
              className: composedClassName,
              onClick: this.handleClick,
              onMouseEnter: this.handleMouseEnter,
              onMouseLeave: this.handleMouseLeave
            }),
            children ? children : null,
            _react2.default.createElement(
              'span',
              { 'data-react-toolbox': 'tooltip', className: tooltipClassName },
              tooltip
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
      className: '',
      tooltipDelay: 0,
      tooltipHideOnClick: true
    };


    return (0, _reactCssThemr.themr)(_identifiers.TOOLTIP, defaultTheme)(TooltippedComponent);
  };

  return Tooltip;
};

exports.default = factory();
exports.tooltipFactory = factory;