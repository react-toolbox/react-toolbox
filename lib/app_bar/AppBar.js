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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var AppBar = function AppBar(props) {
  var _ClassNames;

  var className = (0, _classnames2.default)(_style2.default.root, (_ClassNames = {}, _defineProperty(_ClassNames, _style2.default.fixed, props.fixed), _defineProperty(_ClassNames, _style2.default.flat, props.flat), _ClassNames), props.className);

  return _react2.default.createElement(
    'header',
    { className: className, 'data-react-toolbox': 'app-bar' },
    props.children
  );
};

AppBar.propTypes = {
  children: _react2.default.PropTypes.node,
  className: _react2.default.PropTypes.string,
  fixed: _react2.default.PropTypes.bool,
  flat: _react2.default.PropTypes.bool
};

AppBar.defaultProps = {
  className: '',
  fixed: false,
  flat: false
};

exports.default = AppBar;