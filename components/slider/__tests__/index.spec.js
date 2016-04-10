import expect from 'expect';
import sinon from 'sinon';
import utils from '../../utils/testing';
import style from '../../slider/style';
import ProgressBar from '../../progress_bar';
import Input from '../../input';
import Slider from '../index';
import TestUtils from 'react-addons-test-utils';

describe('Slider', function () {
  let props, state, slider, progress, input, onChange;

  describe('#positionToValue', function () {
    before(function () {
      props = { min: -500, max: 500 };
      state = { sliderStart: 500, sliderLength: 100 };
      slider = utils.renderComponent(Slider, props, state);
    });

    it('returns min when position is less than origin', function () {
      expect(slider.positionToValue({x: 400})).toEqual(-500);
    });

    it('returns max when position is more and origin plus length', function () {
      expect(slider.positionToValue({x: 900})).toEqual(500);
    });

    it('returns the proper position when the position is inside slider', function () {
      expect(slider.positionToValue({x: 520})).toEqual(-300);
    });
  });

  describe('#trimValue', function () {
    before(function () {
      props = { min: 0, max: 100, step: 0.1 };
      slider = utils.renderComponent(Slider, props);
    });

    it('rounds to the proper number', function () {
      expect(slider.trimValue(57.16)).toEqual(57.2);
      expect(slider.trimValue(57.12)).toEqual(57.10);
    });

    it('returns min if number is less than min', function () {
      expect(slider.trimValue(-57.16)).toEqual(0);
    });

    it('returns max if number is more than max', function () {
      expect(slider.trimValue(257.16)).toEqual(100);
    });
  });

  describe('#valueForInput', function () {
    before(function () {
      props = { min: 0, max: 100, step: 0.01 };
      slider = utils.renderComponent(Slider, props);
    });

    it('returns a fixed number when an integer is given', function () {
      expect(slider.valueForInput(4)).toEqual('4.00');
    });

    it('returns a fixed number when a float is given', function () {
      expect(slider.valueForInput(4.06)).toEqual('4.06');
    });
  });

  describe('#knobOffset', function () {
    it('returns the corresponding offset for a given value and slider length/start', function () {
      props = { min: -500, max: 500, value: -250 };
      state = { sliderStart: 500, sliderLength: 100 };
      slider = utils.renderComponent(Slider, props, state);
      expect(slider.knobOffset()).toEqual(25);
    });
  });

  describe('#render', function () {
    it('contains a linear progress bar with proper properties', function () {
      slider = utils.renderComponent(Slider, {min: 100, max: 1000, value: 140});
      progress = TestUtils.findRenderedComponentWithType(slider, ProgressBar);
      expect(progress.props.mode).toEqual('determinate');
      expect(progress.props.type).toEqual('linear');
      expect(progress.props.value).toEqual(140);
      expect(progress.props.min).toEqual(100);
      expect(progress.props.max).toEqual(1000);
    });

    it('contains an input component if its editable', function () {
      slider = utils.renderComponent(Slider, {editable: true, value: 130});
      input = TestUtils.findRenderedComponentWithType(slider, Input);
      expect(parseInt(input.props.value)).toEqual(slider.props.value);
    });

    it('contains the proper number of snaps when snapped', function () {
      slider = utils.shallowRenderComponent(Slider, {editable: true, pinned: true});
      expect(slider.props.className).toContain(style.ring);
      expect(slider.props.className).toContain(style.pinned);
      slider = utils.shallowRenderComponent(Slider, {editable: true, value: 50});
      expect(slider.props.className).toNotContain(style.ring);
    });
  });

  describe('#events', function () {
    beforeEach(function () {
      onChange = sinon.spy();
      props = { min: -500, max: 500, onChange };
      state = { sliderStart: 0, sliderLength: 1000 };
      slider = utils.renderComponent(Slider, props, state);
      slider.handleResize = (event, callback) => { callback(); };
    });

    it('sets pressed state when knob is clicked', function () {
      TestUtils.Simulate.mouseDown(slider.refs.knob);
      expect(slider.state.pressed).toEqual(true);
    });

    it('sets pressed state when knob is touched', function () {
      TestUtils.Simulate.touchStart(slider.refs.knob, {touches: [{pageX: 200}]});
      expect(slider.state.pressed).toEqual(true);
    });

    it('sets a proper value when the slider is clicked', function () {
      TestUtils.Simulate.mouseDown(slider.refs.slider, { pageX: 200 });
      expect(onChange.called).toEqual(true);
      expect(onChange.getCall(0).args[0]).toEqual(-300);
    });

    it('sets a proper value when the slider is touched', function () {
      TestUtils.Simulate.touchStart(slider.refs.slider, {touches: [{pageX: 200, pageY: 0}]});
      expect(onChange.called).toEqual(true);
      expect(onChange.getCall(0).args[0]).toEqual(-300);
    });

    it('changes input value when slider changes', function () {
      slider = utils.renderComponent(Slider, {editable: true, onChange}, {sliderStart: 0, sliderLength: 1000});
      slider.handleResize = (event, callback) => { callback(); };
      input = TestUtils.findRenderedComponentWithType(slider, Input);
      TestUtils.Simulate.mouseDown(slider.refs.slider, { pageX: 900 });
      expect(onChange.called).toEqual(true);
      expect(onChange.getCall(0).args[0]).toEqual(90);
    });

    it('changes its value when input is blurred', function () {
      slider = utils.renderComponent(Slider, {editable: true, value: 50, onChange});
      input = TestUtils.findRenderedComponentWithType(slider, Input);
      TestUtils.Simulate.change(input.refs.input, {target: {value: '80'}});
      TestUtils.Simulate.blur(input.refs.input);
      expect(onChange.called).toEqual(true);
      expect(onChange.getCall(0).args[0]).toEqual(80);
    });

    it('calls onChange callback when the value is changed', function () {
      const onChangeSpy = sinon.spy();
      slider = utils.renderComponent(Slider, {onChange: onChangeSpy}, {sliderStart: 0, sliderLength: 1000});
      TestUtils.Simulate.mouseDown(slider.refs.slider, { pageX: 900 });
      expect(onChangeSpy.called).toEqual(true);
    });
  });
});
