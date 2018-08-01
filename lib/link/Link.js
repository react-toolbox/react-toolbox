'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Link = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _reactCssThemr = require('react-css-themr');

var _identifiers = require('../identifiers');

var _FontIcon = require('../font_icon/FontIcon');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Link = function Link(_ref) {
  var active = _ref.active,
      children = _ref.children,
      className = _ref.className,
      count = _ref.count,
      icon = _ref.icon,
      label = _ref.label,
      theme = _ref.theme,
      others = _objectWithoutProperties(_ref, ['active', 'children', 'className', 'count', 'icon', 'label', 'theme']);

  var _className = (0, _classnames3.default)(theme.link, _defineProperty({}, theme.active, active), className);

  return _react2.default.createElement(
    'a',
    _extends({ 'data-react-toolbox': 'link', className: _className }, others),
    icon ? _react2.default.createElement(_FontIcon.FontIcon, { className: theme.icon, value: icon }) : null,
    label ? _react2.default.createElement(
      'abbr',
      null,
      label
    ) : null,
    count && parseInt(count, 10) !== 0 ? _react2.default.createElement(
      'small',
      null,
      count
    ) : null,
    children
  );
};

Link.propTypes = {
  active: _propTypes2.default.bool,
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,
  count: _propTypes2.default.number,
  icon: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element]),
  label: _propTypes2.default.string,
  theme: _propTypes2.default.shape({
    active: _propTypes2.default.string,
    icon: _propTypes2.default.string,
    link: _propTypes2.default.string
  })
};

Link.defaultProps = {
  active: false,
  className: ''
};

exports.default = (0, _reactCssThemr.themr)(_identifiers.LINK)(Link);
exports.Link = Link;