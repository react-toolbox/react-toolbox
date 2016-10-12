'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Overlay = undefined;

var _redboxReact2 = require('redbox-react');

var _redboxReact3 = _interopRequireDefault(_redboxReact2);

var _reactTransformCatchErrors3 = require('react-transform-catch-errors');

var _reactTransformCatchErrors4 = _interopRequireDefault(_reactTransformCatchErrors3);

var _react2 = require('react');

var _react3 = _interopRequireDefault(_react2);

var _reactTransformHmr3 = require('react-transform-hmr');

var _reactTransformHmr4 = _interopRequireDefault(_reactTransformHmr3);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

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

var _components = {
  Overlay: {
    displayName: 'Overlay'
  }
};

var _reactTransformHmr2 = (0, _reactTransformHmr4.default)({
  filename: 'components/overlay/Overlay.js',
  components: _components,
  locals: [module],
  imports: [_react3.default]
});

var _reactTransformCatchErrors2 = (0, _reactTransformCatchErrors4.default)({
  filename: 'components/overlay/Overlay.js',
  components: _components,
  locals: [],
  imports: [_react3.default, _redboxReact3.default]
});

function _wrapComponent(id) {
  return function (Component) {
    return _reactTransformHmr2(_reactTransformCatchErrors2(Component, id), id);
  };
}

var Overlay = _wrapComponent('Overlay')((_temp = _class = function (_Component) {
  _inherits(Overlay, _Component);

  function Overlay() {
    _classCallCheck(this, Overlay);

    return _possibleConstructorReturn(this, (Overlay.__proto__ || Object.getPrototypeOf(Overlay)).apply(this, arguments));
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
      if (!nextProps.active && this.props.active && !document.querySelectorAll('[data-react-toolbox="overlay"]')[1]) document.body.style.overflow = '';
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
      if (!document.querySelectorAll('[data-react-toolbox="overlay"]')[1]) document.body.style.overflow = '';
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

      return _react3.default.createElement(
        _Portal2.default,
        null,
        _react3.default.createElement(
          'div',
          { className: _className, 'data-react-toolbox': 'overlay' },
          _react3.default.createElement('div', { className: theme.backdrop, onClick: onClick }),
          children
        )
      );
    }
  }]);

  return Overlay;
}(_react2.Component), _class.propTypes = {
  active: _react2.PropTypes.bool,
  children: _react2.PropTypes.node,
  className: _react2.PropTypes.string,
  invisible: _react2.PropTypes.bool,
  onClick: _react2.PropTypes.func,
  onEscKeyDown: _react2.PropTypes.func,
  theme: _react2.PropTypes.shape({
    active: _react2.PropTypes.string,
    backdrop: _react2.PropTypes.string,
    invisible: _react2.PropTypes.string,
    overlay: _react2.PropTypes.string
  })
}, _class.defaultProps = {
  invisible: false
}, _temp));

exports.default = (0, _reactCssThemr.themr)(_identifiers.OVERLAY)(Overlay);
exports.Overlay = Overlay;