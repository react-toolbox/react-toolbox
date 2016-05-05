'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var ListItemText = function ListItemText(_ref) {
  var className = _ref.className;
  var primary = _ref.primary;
  var children = _ref.children;

  var other = _objectWithoutProperties(_ref, ['className', 'primary', 'children']);

  var _className = (0, _classnames2.default)(_style2.default.itemText, _defineProperty({}, _style2.default.primary, primary), className);

  return _react2.default.createElement(
    'span',
    _extends({ 'data-react-toolbox': 'list-item-text', className: _className }, other),
    children
  );
};

ListItemText.propTypes = {
  children: _react2.default.PropTypes.any,
  className: _react2.default.PropTypes.string,
  primary: _react2.default.PropTypes.bool
};

ListItemText.defaultProps = {
  primary: false
};

exports.default = ListItemText;