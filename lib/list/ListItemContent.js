'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListItemContent = exports.listItemContentFactory = undefined;

var _redboxReact2 = require('redbox-react');

var _redboxReact3 = _interopRequireDefault(_redboxReact2);

var _reactTransformCatchErrors3 = require('react-transform-catch-errors');

var _reactTransformCatchErrors4 = _interopRequireDefault(_reactTransformCatchErrors3);

var _react2 = require('react');

var _react3 = _interopRequireDefault(_react2);

var _reactTransformHmr3 = require('react-transform-hmr');

var _reactTransformHmr4 = _interopRequireDefault(_reactTransformHmr3);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _reactCssThemr = require('react-css-themr');

var _identifiers = require('../identifiers.js');

var _ListItemText = require('./ListItemText.js');

var _ListItemText2 = _interopRequireDefault(_ListItemText);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
  ListItemContent: {
    displayName: 'ListItemContent',
    isInFunction: true
  }
};

var _reactTransformHmr2 = (0, _reactTransformHmr4.default)({
  filename: 'components/list/ListItemContent.js',
  components: _components,
  locals: [module],
  imports: [_react3.default]
});

var _reactTransformCatchErrors2 = (0, _reactTransformCatchErrors4.default)({
  filename: 'components/list/ListItemContent.js',
  components: _components,
  locals: [],
  imports: [_react3.default, _redboxReact3.default]
});

function _wrapComponent(id) {
  return function (Component) {
    return _reactTransformHmr2(_reactTransformCatchErrors2(Component, id), id);
  };
}

var types = ['auto', 'normal', 'large'];

var factory = function factory(ListItemText) {
  var _class, _temp;

  var ListItemContent = _wrapComponent('ListItemContent')((_temp = _class = function (_Component) {
    _inherits(ListItemContent, _Component);

    function ListItemContent() {
      _classCallCheck(this, ListItemContent);

      return _possibleConstructorReturn(this, (ListItemContent.__proto__ || Object.getPrototypeOf(ListItemContent)).apply(this, arguments));
    }

    _createClass(ListItemContent, [{
      key: 'getType',
      value: function getType() {
        var _props = this.props;
        var type = _props.type;
        var children = _props.children;
        var caption = _props.caption;
        var legend = _props.legend;


        var count = _react3.default.Children.count(children);
        [caption, legend].forEach(function (s) {
          count += s ? 1 : 0;
        });
        var typeIndex = Math.min(count, types.length);

        return type || types[typeIndex];
      }
    }, {
      key: 'render',
      value: function render() {
        var _props2 = this.props;
        var children = _props2.children;
        var caption = _props2.caption;
        var legend = _props2.legend;
        var theme = _props2.theme;

        var className = (0, _classnames3.default)(theme.itemContentRoot, _defineProperty({}, theme[this.getType()], theme[this.getType()]));

        return _react3.default.createElement(
          'span',
          { className: className },
          caption && _react3.default.createElement(
            ListItemText,
            { theme: theme, primary: true },
            caption
          ),
          legend && _react3.default.createElement(
            ListItemText,
            { theme: theme },
            legend
          ),
          children
        );
      }
    }]);

    return ListItemContent;
  }(_react2.Component), _class.propTypes = {
    caption: _react2.PropTypes.string,
    children: _react2.PropTypes.any,
    legend: _react2.PropTypes.string,
    theme: _react2.PropTypes.shape({
      itemContentRoot: _react2.PropTypes.string,
      large: _react2.PropTypes.string
    }),
    type: _react2.PropTypes.oneOf(types)
  }, _temp));

  return ListItemContent;
};

var ListItemContent = factory(_ListItemText2.default);
exports.default = (0, _reactCssThemr.themr)(_identifiers.LIST)(ListItemContent);
exports.listItemContentFactory = factory;
exports.ListItemContent = ListItemContent;