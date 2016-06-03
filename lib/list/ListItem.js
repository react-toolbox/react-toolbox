'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RawListItem = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ListItemContent = require('./ListItemContent');

var _ListItemContent2 = _interopRequireDefault(_ListItemContent);

var _ListItemLayout = require('./ListItemLayout');

var _ListItemLayout2 = _interopRequireDefault(_ListItemLayout);

var _ripple = require('../ripple');

var _ripple2 = _interopRequireDefault(_ripple);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ListItem = function (_React$Component) {
  _inherits(ListItem, _React$Component);

  function ListItem() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, ListItem);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(ListItem)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.handleClick = function (event) {
      if (_this.props.onClick && !_this.props.disabled) {
        _this.props.onClick(event);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ListItem, [{
    key: 'groupChildren',
    value: function groupChildren() {
      var children = {
        leftActions: [],
        rightActions: [],
        ignored: []
      };

      _react2.default.Children.forEach(this.props.children, function (child, i) {
        if (!_react2.default.isValidElement(child)) {
          return;
        }
        if (child.props.listItemIgnore) {
          children.ignored.push(child);
          return;
        }
        if (child.type === _ListItemContent2.default) {
          children.itemContent = child;
          return;
        }
        var bucket = children.itemContent ? 'rightActions' : 'leftActions';
        children[bucket].push(_extends({}, child, { key: i }));
      });

      return children;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var className = _props.className;
      var onMouseDown = _props.onMouseDown;
      var to = _props.to;
      var onClick = _props.onClick;
      var ripple = _props.ripple;

      var other = _objectWithoutProperties(_props, ['className', 'onMouseDown', 'to', 'onClick', 'ripple']); //eslint-disable-line no-unused-vars


      var children = this.groupChildren();
      var content = _react2.default.createElement(_ListItemLayout2.default, _extends({}, children, other));
      var finalClassName = _style2.default.listItem;
      if (className) finalClassName += ' ' + className;

      return _react2.default.createElement(
        'li',
        { className: finalClassName, onClick: this.handleClick, onMouseDown: onMouseDown },
        to ? _react2.default.createElement(
          'a',
          { href: this.props.to },
          content
        ) : content,
        children.ignored
      );
    }
  }]);

  return ListItem;
}(_react2.default.Component);

ListItem.propTypes = {
  children: _react2.default.PropTypes.any,
  className: _react2.default.PropTypes.string,
  disabled: _react2.default.PropTypes.bool,
  onClick: _react2.default.PropTypes.func,
  ripple: _react2.default.PropTypes.bool,
  to: _react2.default.PropTypes.string
};
ListItem.defaultProps = {
  disabled: false,
  ripple: false
};
exports.default = (0, _ripple2.default)({
  className: _style2.default.ripple,
  centered: false,
  listItemIgnore: true
})(ListItem);
exports.RawListItem = ListItem;