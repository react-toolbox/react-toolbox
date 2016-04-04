'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var FontIcon = function FontIcon(_ref) {
  var children = _ref.children;
  var className = _ref.className;
  var value = _ref.value;

  var other = _objectWithoutProperties(_ref, ['children', 'className', 'value']);

  var classes = (0, _classnames2.default)({ 'material-icons': typeof value === 'string' }, className);
  return _react2.default.createElement(
    'span',
    _extends({ className: classes }, other, { 'data-react-toolbox': 'font-icon' }),
    value,
    children
  );
};

FontIcon.propTypes = {
  children: _react2.default.PropTypes.any,
  className: _react2.default.PropTypes.string,
  value: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.element])
};

FontIcon.defaultProps = {
  className: ''
};

exports.default = FontIcon;