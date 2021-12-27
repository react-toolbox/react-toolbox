'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IconMenu = exports.iconMenuFactory = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactCssThemr = require('react-css-themr');

var _identifiers = require('../identifiers');

var _IconButton = require('../button/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _Menu = require('./Menu');

var _Menu2 = _interopRequireDefault(_Menu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var factory = function factory(IconButton, Menu) {
  var IconMenu = function (_Component) {
    _inherits(IconMenu, _Component);

    function IconMenu() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, IconMenu);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = IconMenu.__proto__ || Object.getPrototypeOf(IconMenu)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
        active: _this.props.active
      }, _this.handleButtonClick = function (event) {
        _this.setState({ active: !_this.state.active });
        if (_this.props.onClick) _this.props.onClick(event);
      }, _this.handleMenuHide = function () {
        _this.setState({ active: false });
        if (_this.props.onHide) _this.props.onHide();
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(IconMenu, [{
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        if (this.state.active !== nextProps.active) {
          this.setState({ active: nextProps.active });
        }
      }
    }, {
      key: 'render',
      value: function render() {
        var _props = this.props,
            active = _props.active,
            children = _props.children,
            className = _props.className,
            icon = _props.icon,
            iconRipple = _props.iconRipple,
            inverse = _props.inverse,
            menuRipple = _props.menuRipple,
            onHide = _props.onHide,
            onSelect = _props.onSelect,
            onShow = _props.onShow,
            position = _props.position,
            selectable = _props.selectable,
            selected = _props.selected,
            theme = _props.theme,
            other = _objectWithoutProperties(_props, ['active', 'children', 'className', 'icon', 'iconRipple', 'inverse', 'menuRipple', 'onHide', 'onSelect', 'onShow', 'position', 'selectable', 'selected', 'theme']);

        return _react2.default.createElement(
          'div',
          _extends({}, other, { className: (0, _classnames2.default)(theme.iconMenu, className) }),
          _react2.default.createElement(IconButton, {
            className: theme.icon,
            icon: icon,
            inverse: inverse,
            onClick: this.handleButtonClick,
            ripple: iconRipple
          }),
          _react2.default.createElement(
            Menu,
            {
              active: this.state.active,
              onHide: this.handleMenuHide,
              onSelect: onSelect,
              onShow: onShow,
              position: position,
              ripple: menuRipple,
              selectable: selectable,
              selected: selected,
              theme: theme
            },
            children
          )
        );
      }
    }]);

    return IconMenu;
  }(_react.Component);

  IconMenu.propTypes = {
    active: _propTypes2.default.bool,
    children: _propTypes2.default.node,
    className: _propTypes2.default.string,
    icon: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element]),
    iconRipple: _propTypes2.default.bool,
    inverse: _propTypes2.default.bool,
    menuRipple: _propTypes2.default.bool,
    onClick: _propTypes2.default.func,
    onHide: _propTypes2.default.func,
    onSelect: _propTypes2.default.func,
    onShow: _propTypes2.default.func,
    position: _propTypes2.default.string,
    selectable: _propTypes2.default.bool,
    selected: _propTypes2.default.node,
    theme: _propTypes2.default.shape({
      icon: _propTypes2.default.string,
      iconMenu: _propTypes2.default.string
    })
  };
  IconMenu.defaultProps = {
    active: false,
    className: '',
    icon: 'more_vert',
    iconRipple: true,
    menuRipple: true,
    position: 'auto',
    selectable: false
  };


  return IconMenu;
};

var IconMenu = factory(_IconButton2.default, _Menu2.default);
exports.default = (0, _reactCssThemr.themr)(_identifiers.MENU)(IconMenu);
exports.iconMenuFactory = factory;
exports.IconMenu = IconMenu;