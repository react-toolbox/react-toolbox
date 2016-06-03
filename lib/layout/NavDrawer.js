'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavDrawer = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames3 = require('classnames');

var _classnames4 = _interopRequireDefault(_classnames3);

var _reactCssThemr = require('react-css-themr');

var _identifiers = require('../identifiers.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var NavDrawer = function NavDrawer(_ref) {
  var _classnames;

  var active = _ref.active;
  var children = _ref.children;
  var className = _ref.className;
  var onOverlayClick = _ref.onOverlayClick;
  var permanentAt = _ref.permanentAt;
  var pinned = _ref.pinned;
  var scrollY = _ref.scrollY;
  var theme = _ref.theme;
  var width = _ref.width;

  var rootClasses = (0, _classnames4.default)([theme.navDrawer], (_classnames = {}, _defineProperty(_classnames, theme[permanentAt + 'Permanent'], permanentAt), _defineProperty(_classnames, theme.wide, width === 'wide'), _defineProperty(_classnames, theme.active, active), _defineProperty(_classnames, theme.pinned, pinned), _classnames), className);

  var drawerClasses = (0, _classnames4.default)(theme.drawerContent, _defineProperty({}, theme.scrollY, scrollY));

  return _react2.default.createElement(
    'div',
    { 'data-react-toolbox': 'nav-drawer', className: rootClasses, onClick: onOverlayClick },
    _react2.default.createElement(
      'div',
      { 'data-react-toolbox': 'nav-drawer-scrim', className: theme.scrim },
      _react2.default.createElement(
        'aside',
        { 'data-react-toolbox': 'nav-drawer-content', className: drawerClasses },
        children
      )
    )
  );
};

NavDrawer.propTypes = {
  active: _react2.default.PropTypes.bool,
  children: _react2.default.PropTypes.any,
  className: _react2.default.PropTypes.string,
  onOverlayClick: _react2.default.PropTypes.func,
  permanentAt: _react2.default.PropTypes.oneOf(['sm', 'md', 'lg', 'xl', 'xxl', 'xxxl']),
  pinned: _react2.default.PropTypes.bool,
  scrollY: _react2.default.PropTypes.bool,
  theme: _react2.default.PropTypes.shape({
    active: _react2.default.PropTypes.string.isRequired,
    drawerContent: _react2.default.PropTypes.string.isRequired,
    lgPermanent: _react2.default.PropTypes.string.isRequired,
    mdPermanent: _react2.default.PropTypes.string.isRequired,
    navDrawer: _react2.default.PropTypes.string.isRequired,
    pinned: _react2.default.PropTypes.string.isRequired,
    scrim: _react2.default.PropTypes.string.isRequired,
    scrollY: _react2.default.PropTypes.string.isRequired,
    smPermanent: _react2.default.PropTypes.string.isRequired,
    wide: _react2.default.PropTypes.string.isRequired,
    xlPermanent: _react2.default.PropTypes.string.isRequired,
    xxlPermanent: _react2.default.PropTypes.string.isRequired,
    xxxlPermanent: _react2.default.PropTypes.string.isRequired
  }),
  width: _react2.default.PropTypes.oneOf(['normal', 'wide'])
};

NavDrawer.defaultProps = {
  active: false,
  className: '',
  scrollY: false,
  width: 'normal'
};

exports.default = (0, _reactCssThemr.themr)(_identifiers.LAYOUT)(NavDrawer);
exports.NavDrawer = NavDrawer;