'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppBar = exports.appBarFactory = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _reactCssThemr = require('react-css-themr');

var _identifiers = require('../identifiers.js');

var _FontIcon = require('../font_icon/FontIcon.js');

var _FontIcon2 = _interopRequireDefault(_FontIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var factory = function factory(FontIcon) {
  var AppBar = function AppBar(_ref) {
    var _classnames;

    var children = _ref.children;
    var leftIcon = _ref.leftIcon;
    var onLeftIconClick = _ref.onLeftIconClick;
    var onRightIconClick = _ref.onRightIconClick;
    var rightIcon = _ref.rightIcon;
    var theme = _ref.theme;
    var title = _ref.title;

    var props = _objectWithoutProperties(_ref, ['children', 'leftIcon', 'onLeftIconClick', 'onRightIconClick', 'rightIcon', 'theme', 'title']);

    var className = (0, _classnames3.default)(theme.appBar, (_classnames = {}, _defineProperty(_classnames, theme.fixed, props.fixed), _defineProperty(_classnames, theme.flat, props.flat), _classnames), props.className);

    return _react2.default.createElement(
      'header',
      { className: className, 'data-react-toolbox': 'app-bar' },
      leftIcon && _react2.default.createElement(FontIcon, {
        className: (0, _classnames3.default)(theme.leftIcon),
        onClick: onLeftIconClick,
        value: leftIcon }),
      title && _react2.default.createElement(
        'h1',
        { className: (0, _classnames3.default)(theme.title) },
        title
      ),
      children,
      rightIcon && _react2.default.createElement(FontIcon, {
        className: (0, _classnames3.default)(theme.rightIcon),
        onClick: onRightIconClick,
        value: rightIcon })
    );
  };

  AppBar.propTypes = {
    children: _react.PropTypes.node,
    className: _react.PropTypes.string,
    fixed: _react.PropTypes.bool,
    flat: _react.PropTypes.bool,
    leftIcon: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.element]),
    onLeftIconClick: _react.PropTypes.func,
    onRightIconClick: _react.PropTypes.func,
    rightIcon: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.element]),
    theme: _react.PropTypes.shape({
      appBar: _react.PropTypes.string,
      fixed: _react.PropTypes.string,
      flat: _react.PropTypes.string,
      leftIcon: _react.PropTypes.string,
      rightIcon: _react.PropTypes.string,
      title: _react.PropTypes.string
    }),
    title: _react.PropTypes.string
  };

  AppBar.defaultProps = {
    className: '',
    fixed: false,
    flat: false
  };

  return AppBar;
};

var AppBar = factory(_FontIcon2.default);
exports.default = (0, _reactCssThemr.themr)(_identifiers.APP_BAR, null)(AppBar);
exports.appBarFactory = factory;
exports.AppBar = AppBar;