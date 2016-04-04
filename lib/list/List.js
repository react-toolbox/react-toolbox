'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redboxReact2 = require('redbox-react');

var _redboxReact3 = _interopRequireDefault(_redboxReact2);

var _reactTransformCatchErrors3 = require('react-transform-catch-errors');

var _reactTransformCatchErrors4 = _interopRequireDefault(_reactTransformCatchErrors3);

var _react2 = require('react');

var _react3 = _interopRequireDefault(_react2);

var _reactTransformHmr3 = require('react-transform-hmr');

var _reactTransformHmr4 = _interopRequireDefault(_reactTransformHmr3);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _ListItem = require('./ListItem');

var _ListItem2 = _interopRequireDefault(_ListItem);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
  List: {
    displayName: 'List'
  }
};

var _reactTransformHmr2 = (0, _reactTransformHmr4.default)({
  filename: 'components/list/List.jsx',
  components: _components,
  locals: [module],
  imports: [_react3.default]
});

var _reactTransformCatchErrors2 = (0, _reactTransformCatchErrors4.default)({
  filename: 'components/list/List.jsx',
  components: _components,
  locals: [],
  imports: [_react3.default, _redboxReact3.default]
});

function _wrapComponent(id) {
  return function (Component) {
    return _reactTransformHmr2(_reactTransformCatchErrors2(Component, id), id);
  };
}

var List = _wrapComponent('List')((_temp = _class = function (_React$Component) {
  _inherits(List, _React$Component);

  function List() {
    _classCallCheck(this, List);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(List).apply(this, arguments));
  }

  _createClass(List, [{
    key: 'renderItems',
    value: function renderItems() {
      var _this2 = this;

      return _react3.default.Children.map(this.props.children, function (item) {
        if (item.type === _ListItem2.default) {
          return _react3.default.cloneElement(item, {
            ripple: _this2.props.ripple,
            selectable: _this2.props.selectable
          });
        } else {
          return _react3.default.cloneElement(item);
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var className = _style2.default.list;
      if (this.props.className) className += ' ' + this.props.className;
      return _react3.default.createElement(
        'ul',
        { 'data-react-toolbox': 'list', className: className },
        this.renderItems()
      );
    }
  }]);

  return List;
}(_react3.default.Component), _class.propTypes = {
  children: _react3.default.PropTypes.node,
  className: _react3.default.PropTypes.string,
  ripple: _react3.default.PropTypes.bool,
  selectable: _react3.default.PropTypes.bool
}, _class.defaultProps = {
  className: '',
  ripple: false,
  selectable: false
}, _temp));

exports.default = List;