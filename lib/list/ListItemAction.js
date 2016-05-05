'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ListItemAction = function ListItemAction(_ref) {
  var action = _ref.action;
  var _action$props = action.props;
  var onClick = _action$props.onClick;
  var onMouseDown = _action$props.onMouseDown;

  var stopRipple = onClick && !onMouseDown;
  var stop = function stop(e) {
    return e.stopPropagation();
  };
  return _react2.default.createElement(
    'span',
    { className: _style2.default.itemAction, onMouseDown: stopRipple && stop, onClick: onClick && stop },
    action
  );
};

ListItemAction.propTypes = {
  action: _react.PropTypes.object
};

ListItemAction.defaultProps = {};

exports.default = ListItemAction;