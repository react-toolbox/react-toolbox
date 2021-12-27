'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListSubHeader = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactCssThemr = require('react-css-themr');

var _identifiers = require('../identifiers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ListSubHeader = function ListSubHeader(_ref) {
  var caption = _ref.caption,
      className = _ref.className,
      theme = _ref.theme;
  return _react2.default.createElement(
    'h5',
    { className: (0, _classnames2.default)(theme.subheader, className) },
    caption
  );
};

ListSubHeader.propTypes = {
  caption: _propTypes2.default.string,
  className: _propTypes2.default.string,
  theme: _propTypes2.default.object };

ListSubHeader.defaultProps = {
  className: ''
};

exports.default = (0, _reactCssThemr.themr)(_identifiers.LIST)(ListSubHeader);
exports.ListSubHeader = ListSubHeader;