'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _button = require('../button');

var _Menu = require('./Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _style = require('./style.icon_menu');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IconMenu = function (_React$Component) {
  _inherits(IconMenu, _React$Component);

  function IconMenu() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, IconMenu);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(IconMenu)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.handleButtonClick = function (event) {
      _this.refs.menu.show();
      if (_this.props.onClick) _this.props.onClick(event);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(IconMenu, [{
    key: 'render',
    value: function render() {
      var className = _style2.default.root;
      if (this.props.className) className += ' ' + this.props.className;

      return _react2.default.createElement(
        'div',
        { className: className },
        _react2.default.createElement(_button.IconButton, {
          className: _style2.default.icon,
          icon: this.props.icon,
          onClick: this.handleButtonClick,
          ripple: this.props.iconRipple
        }),
        _react2.default.createElement(
          _Menu2.default,
          {
            ref: 'menu',
            onHide: this.props.onHide,
            onSelect: this.props.onSelect,
            onShow: this.props.onShow,
            position: this.props.position,
            ripple: this.props.menuRipple,
            selectable: this.props.selectable,
            selected: this.props.selected
          },
          this.props.children
        )
      );
    }
  }]);

  return IconMenu;
}(_react2.default.Component);

IconMenu.propTypes = {
  children: _react2.default.PropTypes.node,
  className: _react2.default.PropTypes.string,
  icon: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.element]),
  iconRipple: _react2.default.PropTypes.bool,
  menuRipple: _react2.default.PropTypes.bool,
  onClick: _react2.default.PropTypes.func,
  onHide: _react2.default.PropTypes.func,
  onSelect: _react2.default.PropTypes.func,
  onShow: _react2.default.PropTypes.func,
  position: _react2.default.PropTypes.string,
  selectable: _react2.default.PropTypes.bool,
  selected: _react2.default.PropTypes.any
};
IconMenu.defaultProps = {
  className: '',
  icon: 'more_vert',
  iconRipple: true,
  menuRipple: true,
  position: 'auto',
  selectable: false
};
exports.default = IconMenu;