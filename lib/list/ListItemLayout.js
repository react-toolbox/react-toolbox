'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _font_icon = require('../font_icon');

var _font_icon2 = _interopRequireDefault(_font_icon);

var _avatar = require('../avatar');

var _avatar2 = _interopRequireDefault(_avatar);

var _ListItemContent = require('./ListItemContent');

var _ListItemContent2 = _interopRequireDefault(_ListItemContent);

var _ListItemActions = require('./ListItemActions');

var _ListItemActions2 = _interopRequireDefault(_ListItemActions);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ListItemLayout = function ListItemLayout(props) {
  var _ClassNames;

  var className = (0, _classnames2.default)(_style2.default.item, (_ClassNames = {}, _defineProperty(_ClassNames, _style2.default.disabled, props.disabled), _defineProperty(_ClassNames, _style2.default.selectable, props.selectable), _ClassNames), props.className);

  var leftActions = [props.leftIcon && _react2.default.createElement(_font_icon2.default, { value: props.leftIcon, key: 'leftIcon' }), props.avatar && _react2.default.createElement(_avatar2.default, { image: props.avatar, key: 'avatar' })].concat(_toConsumableArray(props.leftActions));
  var rightActions = [props.rightIcon && _react2.default.createElement(_font_icon2.default, { value: props.rightIcon, key: 'rightIcon' })].concat(_toConsumableArray(props.rightActions));
  var content = props.itemContent || _react2.default.createElement(_ListItemContent2.default, { caption: props.caption, legend: props.legend });
  var emptyActions = function emptyActions(item) {
    return !item[0] && !item[1];
  };

  return _react2.default.createElement(
    'span',
    { className: className },
    !emptyActions(leftActions) > 0 && _react2.default.createElement(
      _ListItemActions2.default,
      { type: 'left' },
      leftActions
    ),
    content,
    !emptyActions(rightActions) > 0 && _react2.default.createElement(
      _ListItemActions2.default,
      { type: 'right' },
      rightActions
    )
  );
};

ListItemLayout.propTypes = {
  avatar: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.element]),
  caption: _react2.default.PropTypes.string,
  children: _react2.default.PropTypes.any,
  className: _react2.default.PropTypes.string,
  disabled: _react2.default.PropTypes.bool,
  itemContent: _react2.default.PropTypes.element,
  leftActions: _react2.default.PropTypes.array,
  leftIcon: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.element]),
  legend: _react2.default.PropTypes.string,
  rightActions: _react2.default.PropTypes.array,
  rightIcon: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.element]),
  selectable: _react2.default.PropTypes.bool,
  to: _react2.default.PropTypes.string
};

ListItemLayout.defaultProps = {
  disabled: false,
  selectable: false
};

exports.default = ListItemLayout;