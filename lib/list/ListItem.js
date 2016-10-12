'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListItem = exports.listItemFactory = undefined;

var _redboxReact2 = require('redbox-react');

var _redboxReact3 = _interopRequireDefault(_redboxReact2);

var _reactTransformCatchErrors3 = require('react-transform-catch-errors');

var _reactTransformCatchErrors4 = _interopRequireDefault(_reactTransformCatchErrors3);

var _react2 = require('react');

var _react3 = _interopRequireDefault(_react2);

var _reactTransformHmr3 = require('react-transform-hmr');

var _reactTransformHmr4 = _interopRequireDefault(_reactTransformHmr3);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactCssThemr = require('react-css-themr');

var _identifiers = require('../identifiers.js');

var _ListItemContent = require('./ListItemContent.js');

var _ListItemContent2 = _interopRequireDefault(_ListItemContent);

var _ListItemLayout = require('./ListItemLayout.js');

var _ListItemLayout2 = _interopRequireDefault(_ListItemLayout);

var _Ripple = require('../ripple/Ripple.js');

var _Ripple2 = _interopRequireDefault(_Ripple);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
  ListItem: {
    displayName: 'ListItem',
    isInFunction: true
  }
};

var _reactTransformHmr2 = (0, _reactTransformHmr4.default)({
  filename: 'components/list/ListItem.js',
  components: _components,
  locals: [module],
  imports: [_react3.default]
});

var _reactTransformCatchErrors2 = (0, _reactTransformCatchErrors4.default)({
  filename: 'components/list/ListItem.js',
  components: _components,
  locals: [],
  imports: [_react3.default, _redboxReact3.default]
});

function _wrapComponent(id) {
  return function (Component) {
    return _reactTransformHmr2(_reactTransformCatchErrors2(Component, id), id);
  };
}

var factory = function factory(ripple, ListItemLayout, ListItemContent) {
  var _class, _temp2;

  var ListItem = _wrapComponent('ListItem')((_temp2 = _class = function (_Component) {
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

        _react3.default.Children.forEach(this.props.children, function (child, i) {
          if (!_react3.default.isValidElement(child)) {
            return;
          }

          var _child$props = child.props;
          var listItemIgnore = _child$props.listItemIgnore;

          var rest = _objectWithoutProperties(_child$props, ['listItemIgnore']);

          var strippedChild = _extends({}, child, { props: rest });

          if (listItemIgnore) {
            children.ignored.push(strippedChild);
            return;
          }
          if (child.type === ListItemContent) {
            children.itemContent = strippedChild;
            return;
          }
          var bucket = children.itemContent ? 'rightActions' : 'leftActions';
          children[bucket].push(_extends({}, strippedChild, { key: i }));
        });

        return children;
      }
    }, {
      key: 'render',
      value: function render() {
        var _props = this.props;
        var className = _props.className;
        var onMouseDown = _props.onMouseDown;
        var onTouchStart = _props.onTouchStart;
        var to = _props.to;
        var onClick = _props.onClick;
        var hasRipple = _props.ripple;
        var theme = _props.theme;

        var other = _objectWithoutProperties(_props, ['className', 'onMouseDown', 'onTouchStart', 'to', 'onClick', 'ripple', 'theme']); //eslint-disable-line no-unused-vars


        var children = this.groupChildren();
        var content = _react3.default.createElement(ListItemLayout, _extends({ theme: theme }, children, other));
        return _react3.default.createElement(
          'li',
          { className: theme.listItem + ' ' + className, onClick: this.handleClick, onMouseDown: onMouseDown, onTouchStart: onTouchStart },
          to ? _react3.default.createElement(
            'a',
            { href: this.props.to },
            content
          ) : content,
          children.ignored
        );
      }
    }]);

    return ListItem;
  }(_react2.Component), _class.propTypes = {
    children: _react2.PropTypes.any,
    className: _react2.PropTypes.string,
    disabled: _react2.PropTypes.bool,
    onClick: _react2.PropTypes.func,
    ripple: _react2.PropTypes.bool,
    theme: _react2.PropTypes.shape({
      listItem: _react2.PropTypes.string
    }),
    to: _react2.PropTypes.string
  }, _class.defaultProps = {
    className: '',
    disabled: false,
    ripple: false
  }, _temp2));

  return ripple(ListItem);
};

var ripple = (0, _Ripple2.default)({ centered: false, listItemIgnore: true });
var ListItem = factory(ripple, _ListItemLayout2.default, _ListItemContent2.default);

exports.default = (0, _reactCssThemr.themr)(_identifiers.LIST)(ListItem);
exports.listItemFactory = factory;
exports.ListItem = ListItem;