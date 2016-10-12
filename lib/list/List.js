'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.List = exports.listFactory = undefined;

var _redboxReact2 = require('redbox-react');

var _redboxReact3 = _interopRequireDefault(_redboxReact2);

var _reactTransformCatchErrors3 = require('react-transform-catch-errors');

var _reactTransformCatchErrors4 = _interopRequireDefault(_reactTransformCatchErrors3);

var _react2 = require('react');

var _react3 = _interopRequireDefault(_react2);

var _reactTransformHmr3 = require('react-transform-hmr');

var _reactTransformHmr4 = _interopRequireDefault(_reactTransformHmr3);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactCssThemr = require('react-css-themr');

var _identifiers = require('../identifiers.js');

var _ListItem = require('./ListItem.js');

var _ListItem2 = _interopRequireDefault(_ListItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
  List: {
    displayName: 'List',
    isInFunction: true
  }
};

var _reactTransformHmr2 = (0, _reactTransformHmr4.default)({
  filename: 'components/list/List.js',
  components: _components,
  locals: [module],
  imports: [_react3.default]
});

var _reactTransformCatchErrors2 = (0, _reactTransformCatchErrors4.default)({
  filename: 'components/list/List.js',
  components: _components,
  locals: [],
  imports: [_react3.default, _redboxReact3.default]
});

function _wrapComponent(id) {
  return function (Component) {
    return _reactTransformHmr2(_reactTransformCatchErrors2(Component, id), id);
  };
}

var factory = function factory(ListItem) {
  var _class, _temp;

  var List = _wrapComponent('List')((_temp = _class = function (_Component) {
    _inherits(List, _Component);

    function List() {
      _classCallCheck(this, List);

      return _possibleConstructorReturn(this, (List.__proto__ || Object.getPrototypeOf(List)).apply(this, arguments));
    }

    _createClass(List, [{
      key: 'renderItems',
      value: function renderItems() {
        var _this2 = this;

        return _react3.default.Children.map(this.props.children, function (item) {
          if (item.type === ListItem) {
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
        return _react3.default.createElement(
          'ul',
          { 'data-react-toolbox': 'list', className: (0, _classnames2.default)(this.props.theme.list, this.props.className) },
          this.renderItems()
        );
      }
    }]);

    return List;
  }(_react2.Component), _class.propTypes = {
    children: _react2.PropTypes.node,
    className: _react2.PropTypes.string,
    ripple: _react2.PropTypes.bool,
    selectable: _react2.PropTypes.bool,
    theme: _react2.PropTypes.shape({
      list: _react2.PropTypes.string
    })
  }, _class.defaultProps = {
    className: '',
    ripple: false,
    selectable: false
  }, _temp));

  return List;
};

var List = factory(_ListItem2.default);
exports.default = (0, _reactCssThemr.themr)(_identifiers.LIST)(List);
exports.listFactory = factory;
exports.List = List;