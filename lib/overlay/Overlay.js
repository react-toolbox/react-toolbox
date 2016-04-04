'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Overlay = function (_React$Component) {
  _inherits(Overlay, _React$Component);

  function Overlay() {
    _classCallCheck(this, Overlay);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Overlay).apply(this, arguments));
  }

  _createClass(Overlay, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.app = document.querySelector('[data-react-toolbox="app"]') || document.body;
      this.node = document.createElement('div');
      this.node.setAttribute('data-react-toolbox', 'overlay');
      this.app.appendChild(this.node);
      this.handleRender();
      if (this.props.active) {
        this.escKeyListener = document.body.addEventListener('keydown', this.handleEscKey.bind(this));
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.handleRender();
      if (this.props.active && !this.escKeyListener) {
        this.escKeyListener = document.body.addEventListener('keydown', this.handleEscKey.bind(this));
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _reactDom2.default.unmountComponentAtNode(this.node);
      this.app.removeChild(this.node);
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
    key: 'handleRender',
    value: function handleRender() {
      var _ClassNames;

      var className = (0, _classnames2.default)(_style2.default.root, (_ClassNames = {}, _defineProperty(_ClassNames, _style2.default.active, this.props.active), _defineProperty(_ClassNames, _style2.default.invisible, this.props.invisible), _ClassNames), this.props.className);

      var overlay = _react2.default.createElement(
        'div',
        { className: className },
        _react2.default.createElement('div', { className: _style2.default.overlay, onClick: this.props.onClick }),
        this.props.children
      );

      _reactDom2.default.unstable_renderSubtreeIntoContainer(this, overlay, this.node);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.DOM.noscript();
    }
  }]);

  return Overlay;
}(_react2.default.Component);

Overlay.propTypes = {
  active: _react2.default.PropTypes.bool,
  children: _react2.default.PropTypes.node,
  className: _react2.default.PropTypes.string,
  invisible: _react2.default.PropTypes.bool,
  onClick: _react2.default.PropTypes.func,
  onEscKeyDown: _react2.default.PropTypes.func
};
Overlay.defaultProps = {
  invisible: false
};
exports.default = Overlay;