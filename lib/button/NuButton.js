'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['\n  align-content: center;\n  align-items: center;\n  border: 0;\n  cursor: pointer;\n  display: inline-block;\n  flex-direction: row;\n  font-size: ', ';\n  font-weight: 500;\n  height: ', ';\n  justify-content: center;\n  letter-spacing: 0;\n  line-height: ', ';\n  outline: none;\n  position: relative;\n  text-align: center;\n  text-decoration: none;\n  text-transform: uppercase;\n  transition:\n    box-shadow 0.2s ', ',\n    background-color 0.2s ', ',\n    color 0.2s ', ';\n  white-space: nowrap;\n  &::-moz-focus-inner {\n    border: 0;\n  }\n  &:visited {\n    color: inherit;\n  }\n  & > svg {\n    display: inline-block;\n    fill: currentColor;\n    font-size: 120%;\n    height: ', ';\n    vertical-align: top;\n    width: 1em;\n  }\n  & > i {\n    font-size: 120%;\n    display: inline-block;\n    line-height: ', ';\n    vertical-align: top;\n  }\n'], ['\n  align-content: center;\n  align-items: center;\n  border: 0;\n  cursor: pointer;\n  display: inline-block;\n  flex-direction: row;\n  font-size: ', ';\n  font-weight: 500;\n  height: ', ';\n  justify-content: center;\n  letter-spacing: 0;\n  line-height: ', ';\n  outline: none;\n  position: relative;\n  text-align: center;\n  text-decoration: none;\n  text-transform: uppercase;\n  transition:\n    box-shadow 0.2s ', ',\n    background-color 0.2s ', ',\n    color 0.2s ', ';\n  white-space: nowrap;\n  &::-moz-focus-inner {\n    border: 0;\n  }\n  &:visited {\n    color: inherit;\n  }\n  & > svg {\n    display: inline-block;\n    fill: currentColor;\n    font-size: 120%;\n    height: ', ';\n    vertical-align: top;\n    width: 1em;\n  }\n  & > i {\n    font-size: 120%;\n    display: inline-block;\n    line-height: ', ';\n    vertical-align: top;\n  }\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n    background: ', ' ;\n    border-radius: 2px;\n    box-shadow: ', ';\n    color: ', ' ;\n    min-width: 90px;\n    padding: 0 12px;\n    &:hover {\n      background: ', ';\n    }\n    &:focus:not(:active) {\n      box-shadow:\n        0 0 8px rgba(0, 0, 0, 0.18),\n        0 8px 16px rgba(0, 0, 0, 0.36);\n    }\n    & > i,\n    & > svg {\n      margin-right: 5px;\n    }\n  '], ['\n    background: ', ' ;\n    border-radius: 2px;\n    box-shadow: ', ';\n    color: ', ' ;\n    min-width: 90px;\n    padding: 0 12px;\n    &:hover {\n      background: ', ';\n    }\n    &:focus:not(:active) {\n      box-shadow:\n        0 0 8px rgba(0, 0, 0, 0.18),\n        0 8px 16px rgba(0, 0, 0, 0.36);\n    }\n    & > i,\n    & > svg {\n      margin-right: 5px;\n    }\n  ']),
    _templateObject3 = _taggedTemplateLiteral(['\n    background: transparent;\n    border-radius: 2px;\n    color: ', ';\n    min-width: 90px;\n    padding: 0 12px;\n    &:focus:not(:active) {\n      background: ', ';\n    }\n    &:hover {\n      background: ', ';\n    }\n  '], ['\n    background: transparent;\n    border-radius: 2px;\n    color: ', ';\n    min-width: 90px;\n    padding: 0 12px;\n    &:focus:not(:active) {\n      background: ', ';\n    }\n    &:hover {\n      background: ', ';\n    }\n  ']),
    _templateObject4 = _taggedTemplateLiteral(['\n    background: ', ' ;\n    border-radius: 50%;\n    box-shadow:\n      0 1px 1.5px 0 rgba(0, 0, 0, 0.12),\n      0 1px 1px 0 rgba(0, 0, 0, 0.24);\n    color: ', ';\n    font-size: 24px;\n    height: 56px;\n    width: 56px;\n    &:focus:not(:active) {\n      box-shadow:\n        0 0 8px rgba(0, 0, 0, 0.18),\n        0 8px 16px rgba(0, 0, 0, 0.36);\n    }\n  '], ['\n    background: ', ' ;\n    border-radius: 50%;\n    box-shadow:\n      0 1px 1.5px 0 rgba(0, 0, 0, 0.12),\n      0 1px 1px 0 rgba(0, 0, 0, 0.24);\n    color: ', ';\n    font-size: 24px;\n    height: 56px;\n    width: 56px;\n    &:focus:not(:active) {\n      box-shadow:\n        0 0 8px rgba(0, 0, 0, 0.18),\n        0 8px 16px rgba(0, 0, 0, 0.36);\n    }\n  ']),
    _templateObject5 = _taggedTemplateLiteral(['\n  background: transparent;\n  border-radius: 50%;\n  color: ', ';\n  width: ', ';\n  &:focus:not(:active) {\n    background: ', ';\n  }\n'], ['\n  background: transparent;\n  border-radius: 50%;\n  color: ', ';\n  width: ', ';\n  &:focus:not(:active) {\n    background: ', ';\n  }\n']),
    _templateObject6 = _taggedTemplateLiteral(['\n      background-color: ', ';\n      color: ', ';\n      &:hover {\n        background: ', ';\n      }\n    '], ['\n      background-color: ', ';\n      color: ', ';\n      &:hover {\n        background: ', ';\n      }\n    ']),
    _templateObject7 = _taggedTemplateLiteral(['\n      color: ', ';\n      &:focus:not(:active) {\n        background: ', ';\n      }\n      &:hover {\n        background: ', ';\n      }\n    '], ['\n      color: ', ';\n      &:focus:not(:active) {\n        background: ', ';\n      }\n      &:hover {\n        background: ', ';\n      }\n    ']),
    _templateObject8 = _taggedTemplateLiteral(['\n      color: ', ';\n      &:focus:not(:active) {\n        background: ', ';\n      }\n    '], ['\n      color: ', ';\n      &:focus:not(:active) {\n        background: ', ';\n      }\n    ']),
    _templateObject9 = _taggedTemplateLiteral(['\n    ', '\n    ', '\n    ', '\n    ', '\n    ', '\n    ', '\n    ', '\n  '], ['\n    ', '\n    ', '\n    ', '\n    ', '\n    ', '\n    ', '\n    ', '\n  ']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _font_icon = require('../font_icon');

var _font_icon2 = _interopRequireDefault(_font_icon);

var _ThemeProvider = require('../ThemeProvider');

var _styleUtils = require('../styleUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var button = (0, _styledComponents.css)(_templateObject, (0, _styleUtils.unit)(1.4), (0, _styleUtils.unit)(3.6), (0, _styleUtils.unit)(3.6), (0, _ThemeProvider.getProperty)('animationCurveDefault'), (0, _ThemeProvider.getProperty)('animationCurveDefault'), (0, _ThemeProvider.getProperty)('animationCurveDefault'), (0, _styleUtils.unit)(3.6), (0, _styleUtils.unit)(3.6));

var raised = function raised(props) {
  var color = props.inverse ? 'rgba(255, 255, 255, 1)' : 'rgba(33, 33, 33, 1)';
  var background = props.inverse ? 'rgba(33, 33, 33, 1)' : 'rgba(255, 255, 255, 1)';
  return (0, _styledComponents.css)(_templateObject2, background, (0, _ThemeProvider.getProperty)('shadow2p'), color, (0, _styleUtils.alpha)(background, 0.8));
};

var flat = function flat(props) {
  var color = props.inverse ? 'rgba(255, 255, 255, 1)' : 'rgba(33, 33, 33, 1)';
  return (0, _styledComponents.css)(_templateObject3, color, (0, _styleUtils.alpha)('rgba(33, 33, 33, 1)', 0.2), (0, _styleUtils.alpha)('rgba(33, 33, 33, 1)', 0.2));
};

var floating = function floating(props) {
  var color = props.inverse ? 'rgba(255, 255, 255, 1)' : 'rgba(33, 33, 33, 1)';
  var background = props.inverse ? 'rgba(33, 33, 33, 1)' : 'rgba(255, 255, 255, 1)';
  return (0, _styledComponents.css)(_templateObject4, background, color);
};

var toggle = (0, _styledComponents.css)(_templateObject5, 'rgba(33, 33, 33, 1)', (0, _styleUtils.unit)(3.6), (0, _styleUtils.alpha)('rgba(33, 33, 33, 1)', 0.2));

var colored = function colored(props, normal, contrast) {
  if (props.raised || props.floating) {
    return (0, _styledComponents.css)(_templateObject6, normal, contrast, (0, _styleUtils.alpha)(normal, 0.8));
  } else if (props.flat) {
    return (0, _styledComponents.css)(_templateObject7, normal, (0, _styleUtils.alpha)(normal, 0.2), (0, _styleUtils.alpha)(normal, 0.2));
  } else if (props.toggle) {
    return (0, _styledComponents.css)(_templateObject8, normal, (0, _styleUtils.alpha)(normal, 0.2));
  }
};

var primary = function primary(props) {
  return colored(props, (0, _ThemeProvider.getProperty)('primaryColor'), (0, _ThemeProvider.getProperty)('primaryColorContrast'));
};

var accent = function accent(props) {
  return colored(props, (0, _ThemeProvider.getProperty)('accentColor'), (0, _ThemeProvider.getProperty)('accentColorContrast'));
};

var getButtonElement = function getButtonElement(tagName) {
  return (0, _styledComponents2.default)(tagName)(_templateObject9, button, function (props) {
    return props.flat && flat;
  }, function (props) {
    return props.floating && floating;
  }, function (props) {
    return props.raised && raised;
  }, function (props) {
    return props.toggle && toggle;
  }, function (props) {
    return props.primary && primary(props);
  }, function (props) {
    return props.accent && accent(props);
  });
};

var factory = function factory(_ref) {
  var FontIcon = _ref.FontIcon;

  var InnerLink = getButtonElement('a');
  var InnerButton = getButtonElement('button');

  var Button = function (_Component) {
    _inherits(Button, _Component);

    function Button() {
      var _ref2;

      var _temp, _this, _ret;

      _classCallCheck(this, Button);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = Button.__proto__ || Object.getPrototypeOf(Button)).call.apply(_ref2, [this].concat(args))), _this), _this.handleMouseUp = function (event) {
        _this.rootNode.refs.button.blur();
        if (_this.props.onMouseUp) {
          _this.props.onMouseUp(event);
        }
      }, _this.handleMouseLeave = function (event) {
        _this.rootNode.refs.button.blur();
        if (_this.props.onMouseLeave) {
          _this.props.onMouseLeave(event);
        }
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Button, [{
      key: 'render',
      value: function render() {
        var _this2 = this;

        var ButtonElement = this.props.href ? InnerLink : InnerButton;

        var _props = this.props,
            children = _props.children,
            icon = _props.icon,
            label = _props.label,
            others = _objectWithoutProperties(_props, ['children', 'icon', 'label']);

        return _react2.default.createElement(
          ButtonElement,
          _extends({}, others, {
            onMouseUp: this.handleMouseUp,
            onMouseLeave: this.handleMouseLeave,
            innerRef: 'button',
            ref: function ref(node) {
              _this2.rootNode = node;
            }
          }),
          icon && _react2.default.createElement(FontIcon, { value: icon }),
          label,
          children
        );
      }
    }]);

    return Button;
  }(_react.Component);

  Button.propTypes = {
    children: _react.PropTypes.node,
    href: _react.PropTypes.string,
    icon: _react.PropTypes.string,
    label: _react.PropTypes.string,
    onMouseLeave: _react.PropTypes.func,
    onMouseUp: _react.PropTypes.func
  };


  return Button;
};

var Button = factory({ FontIcon: _font_icon2.default });
exports.default = Button;