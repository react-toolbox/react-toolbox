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

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
  CardMedia: {
    displayName: 'CardMedia'
  }
};

var _reactTransformHmr2 = (0, _reactTransformHmr4.default)({
  filename: 'components/card/CardMedia.jsx',
  components: _components,
  locals: [module],
  imports: [_react3.default]
});

var _reactTransformCatchErrors2 = (0, _reactTransformCatchErrors4.default)({
  filename: 'components/card/CardMedia.jsx',
  components: _components,
  locals: [],
  imports: [_react3.default, _redboxReact3.default]
});

function _wrapComponent(id) {
  return function (Component) {
    return _reactTransformHmr2(_reactTransformCatchErrors2(Component, id), id);
  };
}

var CardMedia = _wrapComponent('CardMedia')((_temp = _class = function (_Component) {
  _inherits(CardMedia, _Component);

  function CardMedia() {
    _classCallCheck(this, CardMedia);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(CardMedia).apply(this, arguments));
  }

  _createClass(CardMedia, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var aspectRatio = _props.aspectRatio;
      var children = _props.children;
      var className = _props.className;
      var color = _props.color;
      var contentOverlay = _props.contentOverlay;
      var image = _props.image;

      var other = _objectWithoutProperties(_props, ['aspectRatio', 'children', 'className', 'color', 'contentOverlay', 'image']);

      var classes = (0, _classnames2.default)(_style2.default.cardMedia, _defineProperty({}, _style2.default[aspectRatio], aspectRatio), className);

      var innerClasses = (0, _classnames2.default)(_style2.default.content, _defineProperty({}, _style2.default.contentOverlay, contentOverlay));

      var bgStyle = {
        backgroundColor: color ? color : undefined,
        backgroundImage: typeof image === 'string' ? 'url(\'' + image + '\')' : undefined
      };

      return _react3.default.createElement(
        'div',
        _extends({ style: bgStyle, className: classes }, other),
        _react3.default.createElement(
          'div',
          { className: innerClasses },
          children
        )
      );
    }
  }]);

  return CardMedia;
}(_react2.Component), _class.propTypes = {
  aspectRatio: _react2.PropTypes.oneOf(['wide', 'square']),
  children: _react2.PropTypes.any,
  className: _react2.PropTypes.string,
  color: _react2.PropTypes.string,
  contentOverlay: _react2.PropTypes.bool,
  image: _react2.PropTypes.oneOfType([_react2.PropTypes.string, _react2.PropTypes.element])
}, _temp));

exports.default = CardMedia;