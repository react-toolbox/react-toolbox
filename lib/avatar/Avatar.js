'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _font_icon = require('../font_icon');

var _font_icon2 = _interopRequireDefault(_font_icon);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Avatar = function Avatar(_ref) {
  var children = _ref.children;
  var className = _ref.className;
  var icon = _ref.icon;
  var image = _ref.image;
  var title = _ref.title;

  var other = _objectWithoutProperties(_ref, ['children', 'className', 'icon', 'image', 'title']);

  return _react2.default.createElement(
    'div',
    _extends({ 'data-react-toolbox': 'avatar', className: _style2.default.avatar + ' ' + className }, other),
    children,
    typeof image === 'string' ? _react2.default.createElement('img', { className: _style2.default.image, src: image, title: title }) : image,
    typeof icon === 'string' ? _react2.default.createElement(_font_icon2.default, { className: _style2.default.letter, value: icon }) : icon,
    title ? _react2.default.createElement(
      'span',
      { className: _style2.default.letter },
      title[0]
    ) : null
  );
};

Avatar.propTypes = {
  children: _react.PropTypes.node,
  className: _react.PropTypes.string,
  icon: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.element]),
  image: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.element]),
  title: _react.PropTypes.string
};

exports.default = Avatar;