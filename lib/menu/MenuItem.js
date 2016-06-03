'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RawMenuItem = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _font_icon = require('../font_icon');

var _font_icon2 = _interopRequireDefault(_font_icon);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ripple = require('../ripple');

var _ripple2 = _interopRequireDefault(_ripple);

var _style = require('./style.menu_item');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MenuItem = function (_React$Component) {
  _inherits(MenuItem, _React$Component);

  function MenuItem() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, MenuItem);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(MenuItem)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.handleClick = function (event) {
      if (_this.props.onClick && !_this.props.disabled) {
        _this.props.onClick(event, _this);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(MenuItem, [{
    key: 'render',
    value: function render() {
      var _ClassNames;

      var _props = this.props;
      var icon = _props.icon;
      var caption = _props.caption;
      var children = _props.children;
      var shortcut = _props.shortcut;
      var selected = _props.selected;
      var disabled = _props.disabled;

      var others = _objectWithoutProperties(_props, ['icon', 'caption', 'children', 'shortcut', 'selected', 'disabled']);

      var className = (0, _classnames2.default)(_style2.default.root, (_ClassNames = {}, _defineProperty(_ClassNames, _style2.default.selected, selected), _defineProperty(_ClassNames, _style2.default.disabled, disabled), _ClassNames), this.props.className);

      return _react2.default.createElement(
        'li',
        _extends({}, others, { 'data-react-toolbox': 'menu-item', className: className, onClick: this.handleClick }),
        icon ? _react2.default.createElement(_font_icon2.default, { value: icon, className: _style2.default.icon }) : null,
        _react2.default.createElement(
          'span',
          { className: _style2.default.caption },
          caption
        ),
        shortcut ? _react2.default.createElement(
          'small',
          { className: _style2.default.shortcut },
          shortcut
        ) : null,
        children
      );
    }
  }]);

  return MenuItem;
}(_react2.default.Component);

MenuItem.propTypes = {
  caption: _react2.default.PropTypes.string.isRequired,
  children: _react2.default.PropTypes.any,
  className: _react2.default.PropTypes.string,
  disabled: _react2.default.PropTypes.bool,
  icon: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.element]),
  onClick: _react2.default.PropTypes.func,
  selected: _react2.default.PropTypes.bool,
  shortcut: _react2.default.PropTypes.string
};
MenuItem.defaultProps = {
  className: '',
  disabled: false,
  selected: false
};
exports.default = (0, _ripple2.default)({
  className: _style2.default.ripple
})(MenuItem);
exports.RawMenuItem = MenuItem;