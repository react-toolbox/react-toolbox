'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListItemActions = exports.listItemActionsFactory = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactCssThemr = require('react-css-themr');

var _identifiers = require('../identifiers');

var _ListItemAction = require('./ListItemAction');

var _ListItemAction2 = _interopRequireDefault(_ListItemAction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var factory = function factory(ListItemAction) {
  var ListItemActions = function ListItemActions(_ref) {
    var type = _ref.type,
        children = _ref.children,
        theme = _ref.theme;

    var validChildren = _react2.default.Children.toArray(children).filter(function (c) {
      return _react2.default.isValidElement(c);
    });

    return _react2.default.createElement(
      'span',
      { className: theme[type] },
      validChildren.map(function (action, i) {
        return _react2.default.createElement(ListItemAction, { key: i, theme: theme, action: action }) // eslint-disable-line
        ;
      })
    );
  };

  ListItemActions.propTypes = {
    children: _propTypes2.default.node,
    theme: _propTypes2.default.shape({
      left: _propTypes2.default.string,
      right: _propTypes2.default.string
    }),
    type: _propTypes2.default.oneOf(['left', 'right'])
  };

  return ListItemActions;
};

var ListItemActions = factory(_ListItemAction2.default);
exports.default = (0, _reactCssThemr.themr)(_identifiers.LIST)(ListItemActions);
exports.listItemActionsFactory = factory;
exports.ListItemActions = ListItemActions;