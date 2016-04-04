'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

var _ListItemAction = require('./ListItemAction');

var _ListItemAction2 = _interopRequireDefault(_ListItemAction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ListItemActions = function ListItemActions(_ref) {
  var type = _ref.type;
  var children = _ref.children;

  var validChildren = _react2.default.Children.toArray(children).filter(function (c) {
    return _react2.default.isValidElement(c);
  });

  return _react2.default.createElement(
    'span',
    { className: _style2.default[type] },
    validChildren.map(function (action, i) {
      return _react2.default.createElement(_ListItemAction2.default, { key: i, action: action });
    })
  );
};

ListItemActions.propTypes = {
  children: _react2.default.PropTypes.any,
  type: _react2.default.PropTypes.oneOf(['left', 'right'])
};

exports.default = ListItemActions;