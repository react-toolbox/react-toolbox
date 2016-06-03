'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Layout = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactCssThemr = require('react-css-themr');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _identifiers = require('../identifiers.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Layout = function Layout(_ref) {
  var className = _ref.className;
  var children = _ref.children;
  var theme = _ref.theme;
  return _react2.default.createElement(
    'div',
    { 'data-react-toolbox': 'layout', className: (0, _classnames2.default)(theme.layout, className) },
    children
  );
};

var ALLOWED_THEMED = ['Themed Panel', 'Themed NavDrawer|Themed Panel', 'Themed NavDrawer|Themed Panel|Themed Sidebar', 'Themed Panel|Themed Sidebar'];

function getChildName(child) {
  if (child.type) {
    return child.type.displayName || child.type.name || child.type;
  }
  if (!child.constructor || !child.constructor.name) {
    return 'UNKNOWN';
  }
  return child.constructor.name;
}

Layout.propTypes = {
  children: function children(props, propName, componentName) {
    // Accept only [NavDrawer]Pane[Sidebar]
    var children = props[propName];
    if (_react2.default.Children.count(children) > 3) {
      return new Error('`' + componentName + '` ' + 'should have a Pane for a child, optionally preceded and/or followed by a Drawer.');
    }

    var names = _react2.default.Children.map(children, getChildName).join('|');
    if (! ~ALLOWED_THEMED.indexOf(names)) {
      return new Error('`' + componentName + '` ' + 'should have a Panel for a child, optionally preceded by a NavDrawer and/or followed by a Sidebar.');
    }
  },

  className: _react.PropTypes.string,
  theme: _react.PropTypes.shape({
    layout: _react.PropTypes.string
  })
};

Layout.defaultProps = {
  className: ''
};

exports.default = (0, _reactCssThemr.themr)(_identifiers.LAYOUT)(Layout);
exports.Layout = Layout;