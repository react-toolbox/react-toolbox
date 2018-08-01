'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListItem = exports.listItemFactory = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactCssThemr = require('react-css-themr');

var _identifiers = require('../identifiers');

var _ListItemContent = require('./ListItemContent');

var _ListItemContent2 = _interopRequireDefault(_ListItemContent);

var _ListItemLayout = require('./ListItemLayout');

var _ListItemLayout2 = _interopRequireDefault(_ListItemLayout);

var _Ripple = require('../ripple/Ripple');

var _Ripple2 = _interopRequireDefault(_Ripple);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var factory = function factory(ripple, ListItemLayout, ListItemContent) {
  var ListItem = function (_Component) {
    _inherits(ListItem, _Component);

    function ListItem() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, ListItem);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ListItem.__proto__ || Object.getPrototypeOf(ListItem)).call.apply(_ref, [this].concat(args))), _this), _this.handleClick = function (event) {
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
            return undefined;
          }

          var _child$props = child.props,
              listItemIgnore = _child$props.listItemIgnore,
              rest = _objectWithoutProperties(_child$props, ['listItemIgnore']);

          var strippedChild = _extends({}, child, { props: rest });

          if (listItemIgnore) {
            children.ignored.push(strippedChild);
            return undefined;
          }
          if (child.type === ListItemContent) {
            children.itemContent = strippedChild;
            return undefined;
          }
          var bucket = children.itemContent ? 'rightActions' : 'leftActions';
          children[bucket].push(_extends({}, strippedChild, { key: i }));
          return undefined;
        });

        return children;
      }
    }, {
      key: 'render',
      value: function render() {
        var _props = this.props,
            className = _props.className,
            hasRipple = _props.ripple,
            onClick = _props.onClick,
            onMouseDown = _props.onMouseDown,
            onTouchStart = _props.onTouchStart,
            theme = _props.theme,
            to = _props.to,
            other = _objectWithoutProperties(_props, ['className', 'ripple', 'onClick', 'onMouseDown', 'onTouchStart', 'theme', 'to']);

        var children = this.groupChildren();
        var content = _react2.default.createElement(ListItemLayout, _extends({ theme: theme }, children, other));
        return _react2.default.createElement(
          'li',
          { className: theme.listItem + ' ' + className, onClick: this.handleClick, onMouseDown: onMouseDown, onTouchStart: onTouchStart },
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
  }(_react.Component);

  ListItem.propTypes = {
    children: _propTypes2.default.node,
    className: _propTypes2.default.string,
    disabled: _propTypes2.default.bool,
    hasRipple: _propTypes2.default.bool,
    onClick: _propTypes2.default.func,
    onMouseDown: _propTypes2.default.func,
    onTouchStart: _propTypes2.default.func,
    ripple: _propTypes2.default.bool,
    theme: _propTypes2.default.shape({
      listItem: _propTypes2.default.string
    }),
    to: _propTypes2.default.string
  };
  ListItem.defaultProps = {
    className: '',
    disabled: false,
    ripple: false
  };


  return ripple(ListItem);
};

var ripple = (0, _Ripple2.default)({ centered: false, listItemIgnore: true });
var ListItem = factory(ripple, _ListItemLayout2.default, _ListItemContent2.default);

exports.default = (0, _reactCssThemr.themr)(_identifiers.LIST)(ListItem);
exports.listItemFactory = factory;
exports.ListItem = ListItem;