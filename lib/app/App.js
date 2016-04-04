'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var App = function App(_ref) {
  var className = _ref.className;
  var children = _ref.children;
  return _react2.default.createElement(
    'div',
    { 'data-react-toolbox': 'app', className: _style2.default.root + ' ' + className },
    children
  );
};

App.propTypes = {
  children: _react2.default.PropTypes.node,
  className: _react2.default.PropTypes.string
};

App.defaultProps = {
  className: ''
};

exports.default = App;