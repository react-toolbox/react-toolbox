'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListItemAction = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactCssThemr = require('react-css-themr');

var _identifiers = require('../identifiers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ListItemAction = function ListItemAction(_ref) {
  var action = _ref.action,
      theme = _ref.theme;
  var _action$props = action.props,
      onClick = _action$props.onClick,
      onMouseDown = _action$props.onMouseDown;

  var stopRipple = onClick && !onMouseDown;
  var stop = function stop(e) {
    return e.stopPropagation();
  };
  return _react2.default.createElement(
    'span',
    { className: theme.itemAction, onMouseDown: stopRipple && stop, onClick: onClick && stop },
    action
  );
};

ListItemAction.propTypes = {
  action: _propTypes2.default.node,
  theme: _propTypes2.default.shape({
    itemAction: _propTypes2.default.string
  })
};

exports.default = (0, _reactCssThemr.themr)(_identifiers.LIST)(ListItemAction);
exports.ListItemAction = ListItemAction;