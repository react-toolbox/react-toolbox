'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _ListItemText = require('./ListItemText');

var _ListItemText2 = _interopRequireDefault(_ListItemText);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var types = ['auto', 'normal', 'large'];

var ListItemContent = function (_React$Component) {
  _inherits(ListItemContent, _React$Component);

  function ListItemContent() {
    _classCallCheck(this, ListItemContent);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ListItemContent).apply(this, arguments));
  }

  _createClass(ListItemContent, [{
    key: 'getType',
    value: function getType() {
      var _props = this.props;
      var type = _props.type;
      var children = _props.children;
      var caption = _props.caption;
      var legend = _props.legend;


      var count = _react2.default.Children.count(children);
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

      var className = (0, _classnames3.default)(_style2.default.itemContentRoot, _defineProperty({}, _style2.default[this.getType()], _style2.default[this.getType()]));

      return _react2.default.createElement(
        'span',
        { className: className },
        caption && _react2.default.createElement(
          _ListItemText2.default,
          { primary: true },
          caption
        ),
        legend && _react2.default.createElement(
          _ListItemText2.default,
          null,
          legend
        ),
        children
      );
    }
  }]);

  return ListItemContent;
}(_react2.default.Component);

ListItemContent.propTypes = {
  caption: _react2.default.PropTypes.string,
  children: _react2.default.PropTypes.any,
  legend: _react2.default.PropTypes.string,
  type: _react2.default.PropTypes.oneOf(types)
};
exports.default = ListItemContent;