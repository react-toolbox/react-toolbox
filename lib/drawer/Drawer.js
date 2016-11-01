'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Drawer = exports.drawerFactory = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactCssThemr = require('react-css-themr');

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _Portal = require('../hoc/Portal.js');

var _Portal2 = _interopRequireDefault(_Portal);

var _identifiers = require('../identifiers.js');

var _ActivableRenderer = require('../hoc/ActivableRenderer.js');

var _ActivableRenderer2 = _interopRequireDefault(_ActivableRenderer);

var _Overlay = require('../overlay/Overlay.js');

var _Overlay2 = _interopRequireDefault(_Overlay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var factory = function factory(Overlay) {
  var Drawer = function Drawer(_ref) {
    var active = _ref.active,
        children = _ref.children,
        className = _ref.className,
        insideTree = _ref.insideTree,
        onOverlayClick = _ref.onOverlayClick,
        theme = _ref.theme,
        type = _ref.type,
        withOverlay = _ref.withOverlay;

    var _className = (0, _classnames3.default)([theme.drawer, theme[type]], _defineProperty({}, theme.active, active), className);

    var content = _react2.default.createElement('aside', {
      'data-react-toolbox': 'drawer',
      className: _className,
      children: children
    });

    return _react2.default.createElement(insideTree ? 'div' : _Portal2.default, {
      className: theme.wrapper,
      children: [withOverlay && _react2.default.createElement(Overlay, {
        active: active,
        onClick: onOverlayClick,
        theme: theme,
        themeNamespace: 'overlay'
      }), content]
    });
  };

  Drawer.propTypes = {
    active: _react.PropTypes.bool,
    children: _react.PropTypes.node,
    className: _react.PropTypes.string,
    insideTree: _react.PropTypes.bool,
    onOverlayClick: _react.PropTypes.func,
    theme: _react.PropTypes.shape({
      active: _react.PropTypes.string,
      drawer: _react.PropTypes.string,
      left: _react.PropTypes.string,
      right: _react.PropTypes.string
    }),
    type: _react.PropTypes.oneOf(['left', 'right']),
    withOverlay: _react.PropTypes.bool
  };

  Drawer.defaultProps = {
    active: false,
    className: '',
    insideTree: false,
    type: 'left',
    withOverlay: true
  };

  return (0, _ActivableRenderer2.default)()(Drawer);
};

var Drawer = factory(_Overlay2.default);
exports.default = (0, _reactCssThemr.themr)(_identifiers.DRAWER)(Drawer);
exports.drawerFactory = factory;
exports.Drawer = Drawer;