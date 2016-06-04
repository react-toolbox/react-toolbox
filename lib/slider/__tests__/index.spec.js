'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsTestUtils = require('react-addons-test-utils');

var _reactAddonsTestUtils2 = _interopRequireDefault(_reactAddonsTestUtils);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _ProgressBar = require('../../progress_bar/ProgressBar.js');

var _Input = require('../../input/Input.js');

var _Input2 = _interopRequireDefault(_Input);

var _Slider = require('../Slider.js');

var _Slider2 = _interopRequireDefault(_Slider);

var _testing = require('../../utils/testing');

var _testing2 = _interopRequireDefault(_testing);

var _theme = require('../theme.scss');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Slider', function () {
  var slider = void 0,
      progress = void 0,
      input = void 0,
      onChange = void 0;

  describe('#positionToValue', function () {
    before(function () {
      var tree = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(_Slider2.default, { min: -500, max: 500 }));
      slider = _reactAddonsTestUtils2.default.findRenderedComponentWithType(tree, _Slider.Slider);
      slider.setState({ sliderStart: 500, sliderLength: 100 });
    });

    it('returns min when position is less than origin', function () {
      (0, _expect2.default)(slider.positionToValue({ x: 400 })).toEqual(-500);
    });

    it('returns max when position is more and origin plus length', function () {
      (0, _expect2.default)(slider.positionToValue({ x: 900 })).toEqual(500);
    });

    it('returns the proper position when the position is inside slider', function () {
      (0, _expect2.default)(slider.positionToValue({ x: 520 })).toEqual(-300);
    });
  });

  describe('#trimValue', function () {
    before(function () {
      var tree = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(_Slider2.default, { min: 0, max: 100, step: 0.1 }));
      slider = _reactAddonsTestUtils2.default.findRenderedComponentWithType(tree, _Slider.Slider);
    });

    it('rounds to the proper number', function () {
      (0, _expect2.default)(slider.trimValue(57.16)).toEqual(57.2);
      (0, _expect2.default)(slider.trimValue(57.12)).toEqual(57.10);
    });

    it('returns min if number is less than min', function () {
      (0, _expect2.default)(slider.trimValue(-57.16)).toEqual(0);
    });

    it('returns max if number is more than max', function () {
      (0, _expect2.default)(slider.trimValue(257.16)).toEqual(100);
    });
  });

  describe('#valueForInput', function () {
    before(function () {
      var tree = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(_Slider2.default, { min: 0, max: 100, step: 0.01 }));
      slider = _reactAddonsTestUtils2.default.findRenderedComponentWithType(tree, _Slider.Slider);
    });

    it('returns a fixed number when an integer is given', function () {
      (0, _expect2.default)(slider.valueForInput(4)).toEqual('4.00');
    });

    it('returns a fixed number when a float is given', function () {
      (0, _expect2.default)(slider.valueForInput(4.06)).toEqual('4.06');
    });
  });

  describe('#knobOffset', function () {
    it('returns the corresponding offset for a given value and slider length/start', function () {
      var tree = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(_Slider2.default, { min: -500, max: 500, value: -250 }));
      slider = _reactAddonsTestUtils2.default.findRenderedComponentWithType(tree, _Slider.Slider);
      slider.setState({ sliderStart: 500, sliderLength: 100 });
      (0, _expect2.default)(slider.knobOffset()).toEqual(25);
    });
  });

  describe('#render', function () {
    it('contains a linear progress bar with proper properties', function () {
      var tree = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(_Slider2.default, { min: 100, max: 1000, value: 140 }));
      slider = _reactAddonsTestUtils2.default.findRenderedComponentWithType(tree, _Slider.Slider);
      progress = _reactAddonsTestUtils2.default.findRenderedComponentWithType(slider, _ProgressBar.ProgressBar);
      (0, _expect2.default)(progress.props.mode).toEqual('determinate');
      (0, _expect2.default)(progress.props.type).toEqual('linear');
      (0, _expect2.default)(progress.props.value).toEqual(140);
      (0, _expect2.default)(progress.props.min).toEqual(100);
      (0, _expect2.default)(progress.props.max).toEqual(1000);
    });

    it('contains an input component if its editable', function () {
      var tree = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(_Slider2.default, { editable: true, value: 130 }));
      slider = _reactAddonsTestUtils2.default.findRenderedComponentWithType(tree, _Slider.Slider);
      input = _reactAddonsTestUtils2.default.findRenderedComponentWithType(slider, _Input2.default);
      (0, _expect2.default)(parseInt(input.props.value)).toEqual(slider.props.value);
    });

    it('contains the proper number of snaps when snapped', function () {
      slider = _testing2.default.shallowRenderComponent(_Slider.Slider, { editable: true, pinned: true, theme: _theme2.default });
      (0, _expect2.default)(slider.props.className).toContain(_theme2.default.ring);
      (0, _expect2.default)(slider.props.className).toContain(_theme2.default.pinned);
      slider = _testing2.default.shallowRenderComponent(_Slider.Slider, { editable: true, value: 50, theme: _theme2.default });
      (0, _expect2.default)(slider.props.className).toNotContain(_theme2.default.ring);
    });
  });

  describe('#events', function () {
    beforeEach(function () {
      onChange = _sinon2.default.spy();
      var tree = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(_Slider2.default, { min: -500, max: 500, onChange: onChange }));
      slider = _reactAddonsTestUtils2.default.findRenderedComponentWithType(tree, _Slider.Slider);
      slider.setState({ sliderStart: 0, sliderLength: 1000 });
      slider.handleResize = function (event, callback) {
        callback();
      };
    });

    it('sets pressed state when knob is clicked', function () {
      _reactAddonsTestUtils2.default.Simulate.mouseDown(slider.refs.knob);
      (0, _expect2.default)(slider.state.pressed).toEqual(true);
    });

    it('sets pressed state when knob is touched', function () {
      _reactAddonsTestUtils2.default.Simulate.touchStart(slider.refs.knob, { touches: [{ pageX: 200 }] });
      (0, _expect2.default)(slider.state.pressed).toEqual(true);
    });

    it('sets a proper value when the slider is clicked', function () {
      _reactAddonsTestUtils2.default.Simulate.mouseDown(slider.refs.slider, { pageX: 200 });
      (0, _expect2.default)(onChange.called).toEqual(true);
      (0, _expect2.default)(onChange.getCall(0).args[0]).toEqual(-300);
    });

    it('sets a proper value when the slider is touched', function () {
      _reactAddonsTestUtils2.default.Simulate.touchStart(slider.refs.slider, { touches: [{ pageX: 200, pageY: 0 }] });
      (0, _expect2.default)(onChange.called).toEqual(true);
      (0, _expect2.default)(onChange.getCall(0).args[0]).toEqual(-300);
    });

    it('changes input value when slider changes', function () {
      var tree = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(_Slider2.default, { editable: true, onChange: onChange }));
      slider = _reactAddonsTestUtils2.default.findRenderedComponentWithType(tree, _Slider.Slider);
      slider.setState({ sliderStart: 0, sliderLength: 1000 });
      slider.handleResize = function (event, callback) {
        callback();
      };
      input = _reactAddonsTestUtils2.default.findRenderedComponentWithType(slider, _Input2.default);
      _reactAddonsTestUtils2.default.Simulate.mouseDown(slider.refs.slider, { pageX: 900 });
      (0, _expect2.default)(onChange.called).toEqual(true);
      (0, _expect2.default)(onChange.getCall(0).args[0]).toEqual(90);
    });

    it('changes its value when input is blurred', function () {
      var tree = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(_Slider2.default, { editable: true, value: 50, onChange: onChange }));
      slider = _reactAddonsTestUtils2.default.findRenderedComponentWithType(tree, _Slider.Slider);
      input = _reactAddonsTestUtils2.default.findRenderedComponentWithType(slider, _Input.Input);
      _reactAddonsTestUtils2.default.Simulate.change(input.refs.input, { target: { value: '80' } });
      _reactAddonsTestUtils2.default.Simulate.blur(input.refs.input);
      (0, _expect2.default)(onChange.called).toEqual(true);
      (0, _expect2.default)(onChange.getCall(0).args[0]).toEqual(80);
    });

    it('calls onChange callback when the value is changed', function () {
      var onChangeSpy = _sinon2.default.spy();
      var tree = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(_Slider2.default, { onChange: onChangeSpy }));
      slider = _reactAddonsTestUtils2.default.findRenderedComponentWithType(tree, _Slider.Slider);
      slider.setState({ sliderStart: 0, sliderLength: 1000 });
      _reactAddonsTestUtils2.default.Simulate.mouseDown(slider.refs.slider, { pageX: 900 });
      (0, _expect2.default)(onChangeSpy.called).toEqual(true);
    });
  });
});