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

var Card = function Card(_ref) {
  var children = _ref.children;
  var className = _ref.className;
  var raised = _ref.raised;

  var other = _objectWithoutProperties(_ref, ['children', 'className', 'raised']);

  var classes = (0, _classnames2.default)(_style2.default.card, _defineProperty({}, _style2.default.raised, raised), className);

  return _react2.default.createElement(
    'div',
    _extends({ 'data-react-toolbox': 'card', className: classes }, other),
    children
  );
};

Card.propTypes = {
  children: _react.PropTypes.any,
  className: _react.PropTypes.string,
  raised: _react.PropTypes.bool
};

exports.default = Card;