'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _avatar = require('../avatar');

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var CardTitle = function CardTitle(_ref) {
  var _ClassNames;

  var avatar = _ref.avatar;
  var children = _ref.children;
  var className = _ref.className;
  var subtitle = _ref.subtitle;
  var title = _ref.title;

  var other = _objectWithoutProperties(_ref, ['avatar', 'children', 'className', 'subtitle', 'title']);

  var classes = (0, _classnames2.default)(_style2.default.cardTitle, (_ClassNames = {}, _defineProperty(_ClassNames, _style2.default.small, avatar), _defineProperty(_ClassNames, _style2.default.large, !avatar), _ClassNames), className);

  var avatarComponent = void 0;

  if (typeof avatar === 'string') {
    avatarComponent = _react2.default.createElement(_avatar.Avatar, { image: avatar });
  } else {
    avatarComponent = avatar;
  }

  return _react2.default.createElement(
    'div',
    _extends({ className: classes }, other),
    avatarComponent && _react2.default.createElement(
      'div',
      { className: _style2.default.avatar },
      avatarComponent
    ),
    _react2.default.createElement(
      'div',
      null,
      title && _react2.default.createElement(
        'h5',
        { className: _style2.default.title },
        title
      ),
      children && typeof children === 'string' && _react2.default.createElement(
        'h5',
        { className: _style2.default.title },
        children
      ),
      subtitle && _react2.default.createElement(
        'p',
        { className: _style2.default.subtitle },
        subtitle
      ),
      children && typeof children !== 'string' && children
    )
  );
};

CardTitle.propTypes = {
  avatar: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.element]),
  children: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.element, _react.PropTypes.array]),
  className: _react.PropTypes.string,
  subtitle: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.element]),
  title: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.element])
};

exports.default = CardTitle;