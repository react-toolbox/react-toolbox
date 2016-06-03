'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Sidebar = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames3 = require('classnames');

var _classnames4 = _interopRequireDefault(_classnames3);

var _reactCssThemr = require('react-css-themr');

var _identifiers = require('../identifiers.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Sidebar = function Sidebar(_ref) {
  var children = _ref.children;
  var className = _ref.className;
  var pinned = _ref.pinned;
  var scrollY = _ref.scrollY;
  var theme = _ref.theme;
  var width = _ref.width;

  var wrapperClasses = (0, _classnames4.default)(theme.sidebar, theme['width-' + width], _defineProperty({}, theme.pinned, pinned), className);

  var innerClasses = (0, _classnames4.default)(theme.sidebarContent, _defineProperty({}, theme.scrollY, scrollY));

  return _react2.default.createElement(
    'div',
    { 'data-react-toolbox': 'sidebar', className: wrapperClasses },
    _react2.default.createElement(
      'aside',
      { 'data-react-toolbox': 'sidebar-content', className: innerClasses },
      children
    )
  );
};

Sidebar.propTypes = {
  children: _react2.default.PropTypes.any,
  className: _react2.default.PropTypes.string,
  pinned: _react2.default.PropTypes.bool,
  scrollY: _react2.default.PropTypes.bool,
  theme: _react2.default.PropTypes.shape({
    pinned: _react2.default.PropTypes.string.isRequired,
    scrollY: _react2.default.PropTypes.string.isRequired,
    sidebar: _react2.default.PropTypes.string.isRequired,
    sidebarContent: _react2.default.PropTypes.string.isRequired
  }),
  width: _react2.default.PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 25, 33, 50, 66, 75, 100])
};

Sidebar.defaultProps = {
  className: '',
  pinned: false,
  scrollY: false,
  width: 5
};

exports.default = (0, _reactCssThemr.themr)(_identifiers.LAYOUT)(Sidebar);
exports.Sidebar = Sidebar;