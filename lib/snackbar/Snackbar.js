'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Snackbar = exports.snackbarFactory = undefined;

var _redboxReact2 = require('redbox-react');

var _redboxReact3 = _interopRequireDefault(_redboxReact2);

var _reactTransformCatchErrors3 = require('react-transform-catch-errors');

var _reactTransformCatchErrors4 = _interopRequireDefault(_reactTransformCatchErrors3);

var _react2 = require('react');

var _react3 = _interopRequireDefault(_react2);

var _reactTransformHmr3 = require('react-transform-hmr');

var _reactTransformHmr4 = _interopRequireDefault(_reactTransformHmr3);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _reactCssThemr = require('react-css-themr');

var _identifiers = require('../identifiers.js');

var _ActivableRenderer = require('../hoc/ActivableRenderer.js');

var _ActivableRenderer2 = _interopRequireDefault(_ActivableRenderer);

var _FontIcon = require('../font_icon/FontIcon.js');

var _FontIcon2 = _interopRequireDefault(_FontIcon);

var _Overlay = require('../overlay/Overlay.js');

var _Overlay2 = _interopRequireDefault(_Overlay);

var _Button = require('../button/Button.js');

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
  Snackbar: {
    displayName: 'Snackbar',
    isInFunction: true
  }
};

var _reactTransformHmr2 = (0, _reactTransformHmr4.default)({
  filename: 'components/snackbar/Snackbar.js',
  components: _components,
  locals: [module],
  imports: [_react3.default]
});

var _reactTransformCatchErrors2 = (0, _reactTransformCatchErrors4.default)({
  filename: 'components/snackbar/Snackbar.js',
  components: _components,
  locals: [],
  imports: [_react3.default, _redboxReact3.default]
});

function _wrapComponent(id) {
  return function (Component) {
    return _reactTransformHmr2(_reactTransformCatchErrors2(Component, id), id);
  };
}

var factory = function factory(Overlay, Button) {
  var _class, _temp;

  var Snackbar = _wrapComponent('Snackbar')((_temp = _class = function (_Component) {
    _inherits(Snackbar, _Component);

    function Snackbar() {
      _classCallCheck(this, Snackbar);

      return _possibleConstructorReturn(this, (Snackbar.__proto__ || Object.getPrototypeOf(Snackbar)).apply(this, arguments));
    }

    _createClass(Snackbar, [{
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        var _this2 = this;

        if (nextProps.active && nextProps.timeout) {
          if (this.curTimeout) clearTimeout(this.curTimeout);
          this.curTimeout = setTimeout(function () {
            nextProps.onTimeout();
            _this2.curTimeout = null;
          }, nextProps.timeout);
        }
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        clearTimeout(this.curTimeout);
      }
    }, {
      key: 'render',
      value: function render() {
        var _props = this.props;
        var action = _props.action;
        var active = _props.active;
        var children = _props.children;
        var icon = _props.icon;
        var label = _props.label;
        var onClick = _props.onClick;
        var theme = _props.theme;
        var type = _props.type;

        var className = (0, _classnames3.default)([theme.snackbar, theme[type]], _defineProperty({}, theme.active, active), this.props.className);

        return _react3.default.createElement(
          Overlay,
          { invisible: true },
          _react3.default.createElement(
            'div',
            { 'data-react-toolbox': 'snackbar', className: className },
            icon ? _react3.default.createElement(_FontIcon2.default, { value: icon, className: theme.icon }) : null,
            _react3.default.createElement(
              'span',
              { className: theme.label },
              label,
              children
            ),
            action ? _react3.default.createElement(Button, { className: theme.button, label: action, onClick: onClick }) : null
          )
        );
      }
    }]);

    return Snackbar;
  }(_react2.Component), _class.propTypes = {
    action: _react2.PropTypes.string,
    active: _react2.PropTypes.bool,
    children: _react2.PropTypes.node,
    className: _react2.PropTypes.string,
    icon: _react2.PropTypes.oneOfType([_react2.PropTypes.string, _react2.PropTypes.element]),
    label: _react2.PropTypes.oneOfType([_react2.PropTypes.string, _react2.PropTypes.element]),
    onClick: _react2.PropTypes.func,
    onTimeout: _react2.PropTypes.func,
    theme: _react2.PropTypes.shape({
      accept: _react2.PropTypes.string,
      active: _react2.PropTypes.string,
      button: _react2.PropTypes.string,
      cancel: _react2.PropTypes.string,
      icon: _react2.PropTypes.string,
      label: _react2.PropTypes.string,
      snackbar: _react2.PropTypes.string,
      warning: _react2.PropTypes.string
    }),
    timeout: _react2.PropTypes.number,
    type: _react2.PropTypes.oneOf(['accept', 'cancel', 'warning'])
  }, _temp));

  return (0, _ActivableRenderer2.default)()(Snackbar);
};

var Snackbar = factory(_Overlay2.default, _Button2.default);
exports.default = (0, _reactCssThemr.themr)(_identifiers.SNACKBAR)(Snackbar);
exports.snackbarFactory = factory;
exports.Snackbar = Snackbar;