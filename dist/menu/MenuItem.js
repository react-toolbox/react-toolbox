'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MenuItem = exports.menuItemFactory = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _reactCssThemr = require('react-css-themr');

var _identifiers = require('../identifiers');

var _FontIcon = require('../font_icon/FontIcon');

var _Ripple = require('../ripple/Ripple');

var _Ripple2 = _interopRequireDefault(_Ripple);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var factory = function factory(ripple) {
  var MenuItem = function (_Component) {
    _inherits(MenuItem, _Component);

    function MenuItem() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, MenuItem);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = MenuItem.__proto__ || Object.getPrototypeOf(MenuItem)).call.apply(_ref, [this].concat(args))), _this), _this.handleClick = function (event) {
        if (_this.props.onClick && !_this.props.disabled) {
          _this.props.onClick(event, _this);
        }
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(MenuItem, [{
      key: 'render',
      value: function render() {
        var _classnames;

        var _props = this.props,
            caption = _props.caption,
            children = _props.children,
            disabled = _props.disabled,
            icon = _props.icon,
            selected = _props.selected,
            shortcut = _props.shortcut,
            theme = _props.theme,
            others = _objectWithoutProperties(_props, ['caption', 'children', 'disabled', 'icon', 'selected', 'shortcut', 'theme']);

        var className = (0, _classnames3.default)(theme.menuItem, (_classnames = {}, _defineProperty(_classnames, theme.selected, selected), _defineProperty(_classnames, theme.disabled, disabled), _classnames), this.props.className);

        return _react2.default.createElement(
          'li',
          _extends({}, others, { 'data-react-toolbox': 'menu-item', className: className, onClick: this.handleClick }),
          icon ? _react2.default.createElement(_FontIcon.FontIcon, { value: icon, className: theme.icon }) : null,
          _react2.default.createElement(
            'span',
            { className: theme.caption },
            caption
          ),
          shortcut ? _react2.default.createElement(
            'small',
            { className: theme.shortcut },
            shortcut
          ) : null,
          children
        );
      }
    }]);

    return MenuItem;
  }(_react.Component);

  MenuItem.propTypes = {
    caption: _propTypes2.default.string,
    children: _propTypes2.default.node,
    className: _propTypes2.default.string,
    disabled: _propTypes2.default.bool,
    icon: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element]),
    onClick: _propTypes2.default.func,
    selected: _propTypes2.default.bool,
    shortcut: _propTypes2.default.string,
    theme: _propTypes2.default.shape({
      caption: _propTypes2.default.string,
      disabled: _propTypes2.default.string,
      icon: _propTypes2.default.string,
      menuItem: _propTypes2.default.string,
      selected: _propTypes2.default.string,
      shortcut: _propTypes2.default.string
    })
  };
  MenuItem.defaultProps = {
    className: '',
    disabled: false,
    selected: false
  };


  return ripple(MenuItem);
};

var MenuItem = factory((0, _Ripple2.default)({}));
exports.default = (0, _reactCssThemr.themr)(_identifiers.MENU)(MenuItem);
exports.menuItemFactory = factory;
exports.MenuItem = MenuItem;