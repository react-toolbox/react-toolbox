'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Snackbar = exports.snackbarFactory = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _reactCssThemr = require('react-css-themr');

var _identifiers = require('../identifiers');

var _ActivableRenderer = require('../hoc/ActivableRenderer');

var _ActivableRenderer2 = _interopRequireDefault(_ActivableRenderer);

var _Button = require('../button/Button');

var _Button2 = _interopRequireDefault(_Button);

var _Portal = require('../hoc/Portal');

var _Portal2 = _interopRequireDefault(_Portal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var factory = function factory(Button) {
  var Snackbar = function (_Component) {
    _inherits(Snackbar, _Component);

    function Snackbar() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, Snackbar);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Snackbar.__proto__ || Object.getPrototypeOf(Snackbar)).call.apply(_ref, [this].concat(args))), _this), _this.scheduleTimeout = function (props) {
        var onTimeout = props.onTimeout,
            timeout = props.timeout;

        if (_this.curTimeout) clearTimeout(_this.curTimeout);
        _this.curTimeout = setTimeout(function () {
          if (onTimeout) onTimeout();
          _this.curTimeout = null;
        }, timeout);
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Snackbar, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        if (this.props.active && this.props.timeout) {
          this.scheduleTimeout(this.props);
        }
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        if (nextProps.active && nextProps.timeout) {
          this.scheduleTimeout(nextProps);
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
        var _props = this.props,
            action = _props.action,
            active = _props.active,
            children = _props.children,
            label = _props.label,
            onClick = _props.onClick,
            theme = _props.theme,
            type = _props.type;

        var className = (0, _classnames3.default)([theme.snackbar, theme[type]], _defineProperty({}, theme.active, active), this.props.className);

        return _react2.default.createElement(
          _Portal2.default,
          { className: theme.portal },
          _react2.default.createElement(
            'div',
            { 'data-react-toolbox': 'snackbar', className: className },
            _react2.default.createElement(
              'span',
              { className: theme.label },
              label,
              children
            ),
            action ? _react2.default.createElement(Button, { className: theme.button, label: action, onClick: onClick }) : null
          )
        );
      }
    }]);

    return Snackbar;
  }(_react.Component);

  Snackbar.propTypes = {
    action: _propTypes2.default.string,
    active: _propTypes2.default.bool,
    children: _propTypes2.default.node,
    className: _propTypes2.default.string,
    label: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element]),
    onClick: _propTypes2.default.func,
    onTimeout: _propTypes2.default.func, // eslint-disable-line
    theme: _propTypes2.default.shape({
      accept: _propTypes2.default.string,
      active: _propTypes2.default.string,
      button: _propTypes2.default.string,
      cancel: _propTypes2.default.string,
      label: _propTypes2.default.string,
      snackbar: _propTypes2.default.string,
      warning: _propTypes2.default.string
    }),
    timeout: _propTypes2.default.number,
    type: _propTypes2.default.oneOf(['accept', 'cancel', 'warning'])
  };


  return (0, _ActivableRenderer2.default)()(Snackbar);
};

var Snackbar = factory(_Button2.default);
exports.default = (0, _reactCssThemr.themr)(_identifiers.SNACKBAR)(Snackbar);
exports.snackbarFactory = factory;
exports.Snackbar = Snackbar;