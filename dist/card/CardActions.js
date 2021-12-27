'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CardActions = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactCssThemr = require('react-css-themr');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _identifiers = require('../identifiers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var CardActions = function CardActions(_ref) {
  var children = _ref.children,
      className = _ref.className,
      theme = _ref.theme,
      other = _objectWithoutProperties(_ref, ['children', 'className', 'theme']);

  return _react2.default.createElement(
    'div',
    _extends({ className: (0, _classnames2.default)(theme.cardActions, className) }, other),
    children
  );
};

CardActions.propTypes = {
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,
  theme: _propTypes2.default.shape({
    cardActions: _propTypes2.default.string
  })
};

exports.default = (0, _reactCssThemr.themr)(_identifiers.CARD)(CardActions);
exports.CardActions = CardActions;