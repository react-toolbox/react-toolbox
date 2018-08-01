'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _testUtils = require('react-dom/test-utils');

var _testUtils2 = _interopRequireDefault(_testUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  renderComponent: function renderComponent(Component) {
    var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var state = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var component = _testUtils2.default.renderIntoDocument(_react2.default.createElement(Component, props));
    if (state !== {}) {
      component.setState(state);
    }
    return component;
  },
  shallowRenderComponent: function shallowRenderComponent(component, props) {
    var shallowRenderer = _testUtils2.default.createRenderer();

    for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      children[_key - 2] = arguments[_key];
    }

    shallowRenderer.render(_react2.default.createElement(component, props, children.length > 1 ? children : children[0]));
    return shallowRenderer.getRenderOutput();
  }
};