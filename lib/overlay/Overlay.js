'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Overlay = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _reactCssThemr = require('react-css-themr');

var _identifiers = require('../identifiers.js');

var _Portal = require('../hoc/Portal.js');

var _Portal2 = _interopRequireDefault(_Portal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Overlay = function (_Component) {
  _inherits(Overlay, _Component);

  function Overlay() {
    _classCallCheck(this, Overlay);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Overlay).apply(this, arguments));
  }

  _createClass(Overlay, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.active) {
        this.escKeyListener = document.body.addEventListener('keydown', this.handleEscKey.bind(this));
        document.body.style.overflow = 'hidden';
      }
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps) {
      if (nextProps.active && !this.props.active) document.body.style.overflow = 'hidden';
      if (!nextProps.active && this.props.active) document.body.style.overflow = null;
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.props.active && !this.escKeyListener) {
        this.escKeyListener = document.body.addEventListener('keydown', this.handleEscKey.bind(this));
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.escKeyListener) {
        document.body.removeEventListener('keydown', this.handleEscKey);
        this.escKeyListener = null;
      }
    }
  }, {
    key: 'handleEscKey',
    value: function handleEscKey(e) {
      if (this.props.active && this.props.onEscKeyDown && e.which === 27) {
        this.props.onEscKeyDown(e);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _classnames;

      var _props = this.props;
      var active = _props.active;
      var className = _props.className;
      var children = _props.children;
      var invisible = _props.invisible;
      var onClick = _props.onClick;
      var theme = _props.theme;

      var _className = (0, _classnames3.default)(theme.overlay, (_classnames = {}, _defineProperty(_classnames, theme.active, active), _defineProperty(_classnames, theme.invisible, invisible), _classnames), className);

      return _react2.default.createElement(
        _Portal2.default,
        null,
        _react2.default.createElement(
          'div',
          { className: _className },
          _react2.default.createElement('div', { className: theme.backdrop, onClick: onClick }),
          children
        )
      );
    }
  }]);

  return Overlay;
}(_react.Component);

Overlay.propTypes = {
  active: _react.PropTypes.bool,
  children: _react.PropTypes.node,
  className: _react.PropTypes.string,
  invisible: _react.PropTypes.bool,
  onClick: _react.PropTypes.func,
  onEscKeyDown: _react.PropTypes.func,
  theme: _react.PropTypes.shape({
    active: _react.PropTypes.string,
    backdrop: _react.PropTypes.string,
    invisible: _react.PropTypes.string,
    overlay: _react.PropTypes.string
  })
};
Overlay.defaultProps = {
  invisible: false
};
exports.default = (0, _reactCssThemr.themr)(_identifiers.OVERLAY)(Overlay);
exports.Overlay = Overlay;