'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Overlay = undefined;

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

var Overlay = function (_Component) {
  _inherits(Overlay, _Component);

  function Overlay() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Overlay);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Overlay.__proto__ || Object.getPrototypeOf(Overlay)).call.apply(_ref, [this].concat(args))), _this), _this.handleEscKey = function (e) {
      if (_this.props.active && _this.props.onEscKeyDown && e.which === 27) {
        _this.props.onEscKeyDown(e);
      }
    }, _this.handleClick = function (event) {
      event.preventDefault();
      event.stopPropagation();
      if (_this.props.onClick) {
        _this.props.onClick(event);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Overlay, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          active = _props.active,
          lockScroll = _props.lockScroll,
          onEscKeyDown = _props.onEscKeyDown;

      if (onEscKeyDown) document.body.addEventListener('keydown', this.handleEscKey.bind(this));
      if (active && lockScroll) document.body.style.overflow = 'hidden';
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps) {
      if (this.props.lockScroll) {
        var becomingActive = nextProps.active && !this.props.active;
        var becomingUnactive = !nextProps.active && this.props.active;

        if (becomingActive) {
          document.body.style.overflow = 'hidden';
        }

        if (becomingUnactive && !document.querySelectorAll('[data-react-toolbox="overlay"]')[1]) {
          document.body.style.overflow = '';
        }
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (this.props.active && !prevProps.active && this.props.onEscKeyDown) {
        document.body.addEventListener('keydown', this.handleEscKey.bind(this));
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.props.active && this.props.lockScroll) {
        if (!document.querySelectorAll('[data-react-toolbox="overlay"]')[1]) {
          document.body.style.overflow = '';
        }
      }

      if (this.props.onEscKeyDown) {
        document.body.removeEventListener('keydown', this.handleEscKey);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          active = _props2.active,
          className = _props2.className,
          lockScroll = _props2.lockScroll,
          theme = _props2.theme,
          other = _objectWithoutProperties(_props2, ['active', 'className', 'lockScroll', 'theme']); // eslint-disable-line


      return _react2.default.createElement('div', _extends({}, other, {
        onClick: this.handleClick,
        className: (0, _classnames3.default)(theme.overlay, _defineProperty({}, theme.active, active), className)
      }));
    }
  }]);

  return Overlay;
}(_react.Component);

Overlay.propTypes = {
  active: _react.PropTypes.bool,
  children: _react.PropTypes.node,
  className: _react.PropTypes.string,
  lockScroll: _react.PropTypes.bool,
  onClick: _react.PropTypes.func,
  onEscKeyDown: _react.PropTypes.func,
  theme: _react.PropTypes.shape({
    active: _react.PropTypes.string,
    backdrop: _react.PropTypes.string,
    overlay: _react.PropTypes.string
  })
};
Overlay.defaultProps = {
  lockScroll: true
};
exports.default = (0, _reactCssThemr.themr)(_identifiers.OVERLAY)(Overlay);
exports.Overlay = Overlay;