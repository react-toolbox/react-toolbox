'use strict';

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _testing = require('../../utils/testing');

var _testing2 = _interopRequireDefault(_testing);

var _style = require('../../slider/style');

var _style2 = _interopRequireDefault(_style);

var _progress_bar = require('../../progress_bar');

var _progress_bar2 = _interopRequireDefault(_progress_bar);

var _input = require('../../input');

var _input2 = _interopRequireDefault(_input);

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

var _reactAddonsTestUtils = require('react-addons-test-utils');

var _reactAddonsTestUtils2 = _interopRequireDefault(_reactAddonsTestUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Slider', function () {
  var props = void 0,
      state = void 0,
      slider = void 0,
      progress = void 0,
      input = void 0,
      onChange = void 0;

  describe('#positionToValue', function () {
    before(function () {
      props = { min: -500, max: 500 };
      state = { sliderStart: 500, sliderLength: 100 };
      slider = _testing2.default.renderComponent(_index2.default, props, state);
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
      props = { min: 0, max: 100, step: 0.1 };
      slider = _testing2.default.renderComponent(_index2.default, props);
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
      props = { min: 0, max: 100, step: 0.01 };
      slider = _testing2.default.renderComponent(_index2.default, props);
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
      props = { min: -500, max: 500, value: -250 };
      state = { sliderStart: 500, sliderLength: 100 };
      slider = _testing2.default.renderComponent(_index2.default, props, state);
      (0, _expect2.default)(slider.knobOffset()).toEqual(25);
    });
  });

  describe('#render', function () {
    it('contains a linear progress bar with proper properties', function () {
      slider = _testing2.default.renderComponent(_index2.default, { min: 100, max: 1000, value: 140 });
      progress = _reactAddonsTestUtils2.default.findRenderedComponentWithType(slider, _progress_bar2.default);
      (0, _expect2.default)(progress.props.mode).toEqual('determinate');
      (0, _expect2.default)(progress.props.type).toEqual('linear');
      (0, _expect2.default)(progress.props.value).toEqual(140);
      (0, _expect2.default)(progress.props.min).toEqual(100);
      (0, _expect2.default)(progress.props.max).toEqual(1000);
    });

    it('contains an input component if its editable', function () {
      slider = _testing2.default.renderComponent(_index2.default, { editable: true, value: 130 });
      input = _reactAddonsTestUtils2.default.findRenderedComponentWithType(slider, _input2.default);
      (0, _expect2.default)(parseInt(input.props.value)).toEqual(slider.props.value);
    });

    it('contains the proper number of snaps when snapped', function () {
      slider = _testing2.default.shallowRenderComponent(_index2.default, { editable: true, pinned: true });
      (0, _expect2.default)(slider.props.className).toContain(_style2.default.ring);
      (0, _expect2.default)(slider.props.className).toContain(_style2.default.pinned);
      slider = _testing2.default.shallowRenderComponent(_index2.default, { editable: true, value: 50 });
      (0, _expect2.default)(slider.props.className).toNotContain(_style2.default.ring);
    });
  });

  describe('#events', function () {
    beforeEach(function () {
      onChange = _sinon2.default.spy();
      props = { min: -500, max: 500, onChange: onChange };
      state = { sliderStart: 0, sliderLength: 1000 };
      slider = _testing2.default.renderComponent(_index2.default, props, state);
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
      slider = _testing2.default.renderComponent(_index2.default, { editable: true, onChange: onChange }, { sliderStart: 0, sliderLength: 1000 });
      slider.handleResize = function (event, callback) {
        callback();
      };
      input = _reactAddonsTestUtils2.default.findRenderedComponentWithType(slider, _input2.default);
      _reactAddonsTestUtils2.default.Simulate.mouseDown(slider.refs.slider, { pageX: 900 });
      (0, _expect2.default)(onChange.called).toEqual(true);
      (0, _expect2.default)(onChange.getCall(0).args[0]).toEqual(90);
    });

    it('changes its value when input is blurred', function () {
      slider = _testing2.default.renderComponent(_index2.default, { editable: true, value: 50, onChange: onChange });
      input = _reactAddonsTestUtils2.default.findRenderedComponentWithType(slider, _input2.default);
      _reactAddonsTestUtils2.default.Simulate.change(input.refs.input, { target: { value: '80' } });
      _reactAddonsTestUtils2.default.Simulate.blur(input.refs.input);
      (0, _expect2.default)(onChange.called).toEqual(true);
      (0, _expect2.default)(onChange.getCall(0).args[0]).toEqual(80);
    });

    it('calls onChange callback when the value is changed', function () {
      var onChangeSpy = _sinon2.default.spy();
      slider = _testing2.default.renderComponent(_index2.default, { onChange: onChangeSpy }, { sliderStart: 0, sliderLength: 1000 });
      _reactAddonsTestUtils2.default.Simulate.mouseDown(slider.refs.slider, { pageX: 900 });
      (0, _expect2.default)(onChangeSpy.called).toEqual(true);
    });
  });
});