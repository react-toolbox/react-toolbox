'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ListSubHeader = function ListSubHeader(props) {
  var className = _style2.default.subheader;
  if (props.className) className += ' ' + props.className;
  return _react2.default.createElement(
    'h5',
    { className: className },
    props.caption
  );
};

ListSubHeader.propTypes = {
  caption: _react2.default.PropTypes.string,
  className: _react2.default.PropTypes.string
};

exports.default = ListSubHeader;