'use strict';

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactAddonsTestUtils = require('react-addons-test-utils');

var _reactAddonsTestUtils2 = _interopRequireDefault(_reactAddonsTestUtils);

var _Menu = require('../Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _MenuItem = require('../MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('MenuItem', function () {
  describe('#onClick', function () {
    it('passes to listener the event', function () {
      var listenerCalled = false;
      var handleClick = function handleClick(event) {
        listenerCalled = true;
        (0, _expect2.default)(event).toExist();
        (0, _expect2.default)(event.target).toExist();
      };

      var tree = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(
        _Menu2.default,
        null,
        _react2.default.createElement(_MenuItem2.default, { key: '1', onClick: handleClick })
      ));

      var menuItem = _reactAddonsTestUtils2.default.findRenderedComponentWithType(tree, _MenuItem.MenuItem);
      _reactAddonsTestUtils2.default.Simulate.click(_reactDom2.default.findDOMNode(menuItem));

      (0, _expect2.default)(listenerCalled).toBe(true);
    });
  });
});