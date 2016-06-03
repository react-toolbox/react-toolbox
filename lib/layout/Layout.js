'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Layout = function Layout(_ref) {
  var className = _ref.className;
  var children = _ref.children;
  return _react2.default.createElement(
    'div',
    { 'data-react-toolbox': 'layout', className: (0, _classnames2.default)(_style2.default.root, className) },
    children
  );
};

var ALLOWED = ['Panel', 'NavDrawer|Panel', 'NavDrawer|Panel|Sidebar', 'Panel|Sidebar'];

function getChildName(child) {
  if (child.type) {
    return child.type.name || child.type;
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
    if (! ~ALLOWED.indexOf(names)) {
      return new Error('`' + componentName + '` ' + 'should have a Panel for a child, optionally preceded by a NavDrawer and/or followed by a Sidebar.');
    }
  },

  className: _react2.default.PropTypes.string
};

Layout.defaultProps = {
  className: ''
};

exports.default = Layout;