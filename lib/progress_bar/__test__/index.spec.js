'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _reactAddonsTestUtils = require('react-addons-test-utils');

var _reactAddonsTestUtils2 = _interopRequireDefault(_reactAddonsTestUtils);

var _ProgressBar = require('../ProgressBar');

var _ProgressBar2 = _interopRequireDefault(_ProgressBar);

var _theme = require('../theme.scss');

var _theme2 = _interopRequireDefault(_theme);

var _testing = require('../../utils/testing');

var _testing2 = _interopRequireDefault(_testing);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('ProgressBar', function () {
  var progressBar = void 0;

  describe('#calculateRatio', function () {
    before(function () {
      var tree = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(_ProgressBar2.default, { min: 100, max: 300, theme: _theme2.default }));
      progressBar = _reactAddonsTestUtils2.default.findRenderedComponentWithType(tree, _ProgressBar.ProgressBar);
    });

    it('calculates the right ratio', function () {
      (0, _expect2.default)(progressBar.calculateRatio(150)).toEqual(0.25);
    });

    it('gets 0 when value is less than min', function () {
      (0, _expect2.default)(progressBar.calculateRatio(10)).toEqual(0);
    });

    it('gets 1 when value is more than max', function () {
      (0, _expect2.default)(progressBar.calculateRatio(400)).toEqual(1);
    });
  });

  describe('#render', function () {
    var buffer = void 0,
        value = void 0,
        wrapper = void 0,
        circle = void 0,
        strokeLength = void 0;

    it('renders the value and buffer bars when it is linear', function () {
      wrapper = _testing2.default.shallowRenderComponent(_ProgressBar.ProgressBar, { theme: _theme2.default }).props.children;
      (0, _expect2.default)(wrapper.props.children.length).toEqual(2);
      (0, _expect2.default)(wrapper.props.children[0].ref).toEqual('buffer');
      (0, _expect2.default)(wrapper.props.children[1].ref).toEqual('value');
    });

    it('renders the value and buffer bars when it is linear', function () {
      progressBar = _testing2.default.shallowRenderComponent(_ProgressBar.ProgressBar, { mode: 'determinate', value: 30, buffer: 60, theme: _theme2.default });
      buffer = progressBar.props.children.props.children[0];
      value = progressBar.props.children.props.children[1];
      (0, _expect2.default)(buffer.props.style.transform).toEqual('scaleX(' + 0.6 + ')');
      (0, _expect2.default)(value.props.style.transform).toEqual('scaleX(' + 0.3 + ')');
    });

    it('renders the svg circle when it is circular', function () {
      progressBar = _testing2.default.shallowRenderComponent(_ProgressBar.ProgressBar, { type: 'circular', theme: _theme2.default });
      (0, _expect2.default)(progressBar.props.children.type).toEqual('svg');
      (0, _expect2.default)(progressBar.props.children.props.children.type).toEqual('circle');
    });

    it('renders the proper circle length style when it is circular and determinate', function () {
      progressBar = _testing2.default.shallowRenderComponent(_ProgressBar.ProgressBar, { type: 'circular', mode: 'determinate', value: 30, theme: _theme2.default });
      circle = progressBar.props.children.props.children;
      strokeLength = 2 * Math.PI * circle.props.r * 0.3;
      (0, _expect2.default)(circle.props.style.strokeDasharray).toEqual(strokeLength + ', 400');
    });

    it('contains mode and className in its className', function () {
      progressBar = _testing2.default.shallowRenderComponent(_ProgressBar.ProgressBar, { mode: 'determinate', className: 'tight', theme: _theme2.default });
      (0, _expect2.default)(progressBar.props.className).toContain(_theme2.default.determinate);
      (0, _expect2.default)(progressBar.props.className).toContain(_theme2.default.tight);
    });
  });
});