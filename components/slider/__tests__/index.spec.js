/* eslint-disable */
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import sinon from 'sinon';
import expect from 'expect';
import { ProgressBar } from '../../progress_bar/ProgressBar';
import Input, { Input as RawInput } from '../../input/Input';
import Slider, { Slider as RawSlider } from '../Slider';
import utils from '../../utils/testing';
import theme from '../theme.css';

describe('Slider', () => {
  let slider,
    progress,
    input,
    onChange;

  describe('#positionToValue', () => {
    before(() => {
      const tree = TestUtils.renderIntoDocument(<Slider min={-500} max={500} />);
      slider = TestUtils.findRenderedComponentWithType(tree, RawSlider);
      slider.setState({ sliderStart: 500, sliderLength: 100 });
    });

    it('returns min when position is less than origin', () => {
      expect(slider.positionToValue({ x: 400 })).toEqual(-500);
    });

    it('returns max when position is more and origin plus length', () => {
      expect(slider.positionToValue({ x: 900 })).toEqual(500);
    });

    it('returns the proper position when the position is inside slider', () => {
      expect(slider.positionToValue({ x: 520 })).toEqual(-300);
    });
  });

  describe('#trimValue', () => {
    before(() => {
      const tree = TestUtils.renderIntoDocument(<Slider min={0} max={100} step={0.1} />);
      slider = TestUtils.findRenderedComponentWithType(tree, RawSlider);
    });

    it('rounds to the proper number', () => {
      expect(slider.trimValue(57.16)).toEqual(57.2);
      expect(slider.trimValue(57.12)).toEqual(57.10);
    });

    it('returns min if number is less than min', () => {
      expect(slider.trimValue(-57.16)).toEqual(0);
    });

    it('returns max if number is more than max', () => {
      expect(slider.trimValue(257.16)).toEqual(100);
    });
  });

  describe('#valueForInput', () => {
    before(() => {
      const tree = TestUtils.renderIntoDocument(<Slider min={0} max={100} step={0.01} />);
      slider = TestUtils.findRenderedComponentWithType(tree, RawSlider);
    });

    it('returns a fixed number when an integer is given', () => {
      expect(slider.valueForInput(4)).toEqual('4.00');
    });

    it('returns a fixed number when a float is given', () => {
      expect(slider.valueForInput(4.06)).toEqual('4.06');
    });
  });

  describe('#knobOffset', () => {
    it('returns the corresponding offset for a given value and slider length/start', () => {
      const tree = TestUtils.renderIntoDocument(<Slider min={-500} max={500} value={-250} />);
      slider = TestUtils.findRenderedComponentWithType(tree, RawSlider);
      slider.setState({ sliderStart: 500, sliderLength: 100 });
      expect(slider.knobOffset()).toEqual(25);
    });
  });

  describe('#render', () => {
    it('contains a linear progress bar with proper properties', () => {
      const tree = TestUtils.renderIntoDocument(<Slider min={100} max={1000} value={140} />);
      slider = TestUtils.findRenderedComponentWithType(tree, RawSlider);
      progress = TestUtils.findRenderedComponentWithType(slider, ProgressBar);
      expect(progress.props.mode).toEqual('determinate');
      expect(progress.props.type).toEqual('linear');
      expect(progress.props.value).toEqual(140);
      expect(progress.props.min).toEqual(100);
      expect(progress.props.max).toEqual(1000);
    });

    it('contains an input component if its editable', () => {
      const tree = TestUtils.renderIntoDocument(<Slider editable value={130} />);
      slider = TestUtils.findRenderedComponentWithType(tree, RawSlider);
      input = TestUtils.findRenderedComponentWithType(slider, Input);
      expect(parseInt(input.props.value)).toEqual(slider.props.value);
    });

    it('contains the proper number of snaps when snapped', () => {
      slider = utils.shallowRenderComponent(RawSlider, { editable: true, pinned: true, theme });
      expect(slider.props.className).toContain(theme.ring);
      expect(slider.props.className).toContain(theme.pinned);
      slider = utils.shallowRenderComponent(RawSlider, { editable: true, value: 50, theme });
      expect(slider.props.className).toNotContain(theme.ring);
    });
  });

  describe('#events', () => {
    beforeEach(() => {
      onChange = sinon.spy();
      const tree = TestUtils.renderIntoDocument(<Slider min={-500} max={500} onChange={onChange} />);
      slider = TestUtils.findRenderedComponentWithType(tree, RawSlider);
      slider.setState({ sliderStart: 0, sliderLength: 1000 });
      slider.handleResize = (event, callback) => { callback(); };
    });

    it('sets pressed state when knob is clicked', () => {
      TestUtils.Simulate.mouseDown(slider.knobNode);
      expect(slider.state.pressed).toEqual(true);
    });

    it('sets pressed state when knob is touched', () => {
      TestUtils.Simulate.touchStart(slider.knobNode, { touches: [{ pageX: 200 }] });
      expect(slider.state.pressed).toEqual(true);
    });

    it('sets a proper value when the slider is clicked', () => {
      TestUtils.Simulate.mouseDown(slider.sliderNode, { pageX: 200 });
      expect(onChange.called).toEqual(true);
      expect(onChange.getCall(0).args[0]).toEqual(-300);
    });

    it('sets a proper value when the slider is touched', () => {
      TestUtils.Simulate.touchStart(slider.sliderNode, { touches: [{ pageX: 200, pageY: 0 }] });
      expect(onChange.called).toEqual(true);
      expect(onChange.getCall(0).args[0]).toEqual(-300);
    });

    it('changes input value when slider changes', () => {
      const tree = TestUtils.renderIntoDocument(<Slider editable onChange={onChange} />);
      slider = TestUtils.findRenderedComponentWithType(tree, RawSlider);
      slider.setState({ sliderStart: 0, sliderLength: 1000 });
      slider.handleResize = (event, callback) => { callback(); };
      input = TestUtils.findRenderedComponentWithType(slider, Input);
      TestUtils.Simulate.mouseDown(slider.sliderNode, { pageX: 900 });
      expect(onChange.called).toEqual(true);
      expect(onChange.getCall(0).args[0]).toEqual(90);
    });

    it('changes its value when input is blurred', () => {
      const tree = TestUtils.renderIntoDocument(<Slider editable value={50} onChange={onChange} />);
      slider = TestUtils.findRenderedComponentWithType(tree, RawSlider);
      input = TestUtils.findRenderedComponentWithType(slider, RawInput);
      TestUtils.Simulate.change(input.inputNode, { target: { value: '80' } });
      TestUtils.Simulate.blur(input.inputNode);
      expect(onChange.called).toEqual(true);
      expect(onChange.getCall(0).args[0]).toEqual(80);
    });

    it('calls onChange callback when the value is changed', () => {
      const onChangeSpy = sinon.spy();
      const tree = TestUtils.renderIntoDocument(<Slider onChange={onChangeSpy} />);
      slider = TestUtils.findRenderedComponentWithType(tree, RawSlider);
      slider.setState({ sliderStart: 0, sliderLength: 1000 });
      TestUtils.Simulate.mouseDown(slider.sliderNode, { pageX: 900 });
      expect(onChangeSpy.called).toEqual(true);
    });
  });
});
