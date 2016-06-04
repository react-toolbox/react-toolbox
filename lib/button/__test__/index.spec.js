'use strict';

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactAddonsTestUtils = require('react-addons-test-utils');

var _reactAddonsTestUtils2 = _interopRequireDefault(_reactAddonsTestUtils);

var _theme = require('../theme.scss');

var _theme2 = _interopRequireDefault(_theme);

var _Button = require('../Button');

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getRenderedClassName = function getRenderedClassName(tree, Component) {
  var rendered = _reactAddonsTestUtils2.default.findRenderedComponentWithType(tree, Component);
  return _reactDom2.default.findDOMNode(rendered).getAttribute('class');
};

describe('Button', function () {
  describe('#render', function () {
    it('uses flat and neutral styles by default', function () {
      var tree = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(_Button2.default, { theme: _theme2.default }));
      var className = getRenderedClassName(tree, _Button.Button);
      (0, _expect2.default)(className).toContain(_theme2.default.flat);
      (0, _expect2.default)(className).toContain(_theme2.default.neutral);
    });

    it('renders accent button with accent style', function () {
      var tree = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(_Button2.default, { accent: true, theme: _theme2.default }));
      var className = getRenderedClassName(tree, _Button.Button);
      (0, _expect2.default)(className).toContain(_theme2.default.flat);
      (0, _expect2.default)(className).toContain(_theme2.default.accent);
    });

    it('renders mini button with mini style', function () {
      var tree = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(_Button2.default, { floating: true, mini: true, theme: _theme2.default }));
      var className = getRenderedClassName(tree, _Button.Button);
      (0, _expect2.default)(className).toContain(_theme2.default.floating);
      (0, _expect2.default)(className).toContain(_theme2.default.neutral);
      (0, _expect2.default)(className).toContain(_theme2.default.mini);
    });

    it('renders mini accented button with both styles', function () {
      var tree = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(_Button2.default, { accent: true, mini: true, theme: _theme2.default }));
      var className = getRenderedClassName(tree, _Button.Button);
      (0, _expect2.default)(className).toContain(_theme2.default.flat);
      (0, _expect2.default)(className).toContain(_theme2.default.accent);
      (0, _expect2.default)(className).toContain(_theme2.default.mini);
    });
  });
});