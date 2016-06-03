'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _avatar = require('../avatar');

var _avatar2 = _interopRequireDefault(_avatar);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Chip = function Chip(_ref) {
  var _ClassNames;

  var children = _ref.children;
  var className = _ref.className;
  var deletable = _ref.deletable;
  var onDeleteClick = _ref.onDeleteClick;

  var other = _objectWithoutProperties(_ref, ['children', 'className', 'deletable', 'onDeleteClick']);

  var hasAvatar = false;
  if (_react2.default.Children.count(children)) {
    var firstChild = children[0];
    hasAvatar = firstChild && firstChild.type && firstChild.type === _avatar2.default;
  }

  var classes = (0, _classnames2.default)(_style2.default.chip, (_ClassNames = {}, _defineProperty(_ClassNames, _style2.default.deletable, !!deletable), _defineProperty(_ClassNames, _style2.default.avatar, !!hasAvatar), _ClassNames), className);

  return _react2.default.createElement(
    'div',
    _extends({ 'data-react-toolbox': 'chip', className: classes }, other),
    typeof children === 'string' ? _react2.default.createElement(
      'span',
      null,
      children
    ) : children,
    deletable ? _react2.default.createElement(
      'span',
      { className: _style2.default.delete, onClick: onDeleteClick },
      _react2.default.createElement(
        'svg',
        { viewBox: '0 0 40 40', className: _style2.default.deleteIcon },
        _react2.default.createElement('path', { className: _style2.default.deleteX, d: 'M 12,12 L 28,28 M 28,12 L 12,28' })
      )
    ) : null
  );
};

Chip.propTypes = {
  children: _react.PropTypes.node,
  className: _react.PropTypes.string,
  deletable: _react.PropTypes.bool,
  onDeleteClick: _react.PropTypes.func
};

Chip.defaultProps = {
  className: '',
  deletable: false
};

exports.default = Chip;