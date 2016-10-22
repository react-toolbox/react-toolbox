'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Drawer = exports.drawerFactory = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactCssThemr = require('react-css-themr');

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _identifiers = require('../identifiers.js');

var _Overlay = require('../overlay/Overlay.js');

var _Overlay2 = _interopRequireDefault(_Overlay);

var _reactMotion = require('react-motion');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var factory = function factory(Overlay) {
  var Drawer = function (_Component) {
    _inherits(Drawer, _Component);

    function Drawer() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, Drawer);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Drawer.__proto__ || Object.getPrototypeOf(Drawer)).call.apply(_ref, [this].concat(args))), _this), _this.getStyles = function () {
        if (_this.props.active) {
          return [{
            key: 'drawer',
            data: {},
            style: {
              transform: (0, _reactMotion.spring)(0),
              opacity: 0
            }
          }];
        } else {
          return [];
        }
      }, _this.willEnter = function () {
        return { opacity: 0, transform: -100 };
      }, _this.willLeave = function () {
        return { opacity: 0, transform: (0, _reactMotion.spring)(-100) };
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Drawer, [{
      key: 'render',
      value: function render() {
        var _props = this.props;
        var active = _props.active;
        var children = _props.children;
        var className = _props.className;
        var lockScroll = _props.lockScroll;
        var onOverlayClick = _props.onOverlayClick;
        var overlayClassName = _props.overlayClassName;
        var theme = _props.theme;
        var type = _props.type;

        var _className = (0, _classnames3.default)([theme.drawer, theme[type]], _defineProperty({}, theme.active, true), className);

        return _react2.default.createElement(
          _reactMotion.TransitionMotion,
          {
            styles: this.getStyles(),
            willEnter: this.willEnter,
            willLeave: this.willLeave
          },
          function (interpolatedStyles) {
            return _react2.default.createElement(
              'div',
              null,
              interpolatedStyles.map(function (config) {
                return _react2.default.createElement(
                  Overlay,
                  {
                    active: true,
                    key: config.key,
                    className: overlayClassName,
                    lockScroll: lockScroll,
                    onClick: onOverlayClick,
                    theme: theme,
                    themeNamespace: 'overlay'
                  },
                  _react2.default.createElement(
                    'div',
                    { 'data-react-toolbox': 'drawer', className: _className,
                      style: { transform: 'translateX(' + config.style.transform + '%)' }
                    },
                    _react2.default.createElement(
                      'aside',
                      { className: theme.content },
                      children
                    )
                  )
                );
              })
            );
          }
        );
      }
    }]);

    return Drawer;
  }(_react.Component);

  Drawer.propTypes = {
    active: _react.PropTypes.bool,
    children: _react.PropTypes.node,
    className: _react.PropTypes.string,
    lockScroll: _react.PropTypes.bool,
    onOverlayClick: _react.PropTypes.func,
    overlayClassName: _react.PropTypes.string,
    theme: _react.PropTypes.shape({
      active: _react.PropTypes.string,
      content: _react.PropTypes.string,
      drawer: _react.PropTypes.string,
      left: _react.PropTypes.string,
      right: _react.PropTypes.string
    }),
    type: _react.PropTypes.oneOf(['left', 'right'])
  };
  Drawer.defaultProps = {
    active: false,
    className: '',
    lockScroll: true,
    type: 'left'
  };


  return Drawer;
};

var Drawer = factory(_Overlay2.default);
exports.default = (0, _reactCssThemr.themr)(_identifiers.DRAWER)(Drawer);
exports.drawerFactory = factory;
exports.Drawer = Drawer;