import React from 'react';
import { mount, shallow } from 'enzyme';
import { Input } from '../../input/Input';
import { ProgressBar } from '../../progress_bar/ProgressBar';
import { Slider } from '../Slider';
import theme from '../theme.css';

describe('Slider', () => {
  describe('#positionToValue', () => {
    it('returns min when position is less than origin', () => {
      const instance = shallow(<Slider min={-500} max={500} />).instance();
      instance.setState({ sliderStart: 500, sliderLength: 100 });
      expect(instance.positionToValue({ x: 400 })).toEqual(-500);
    });

    it('returns max when position is more and origin plus length', () => {
      const instance = shallow(<Slider min={-500} max={500} />).instance();
      instance.setState({ sliderStart: 500, sliderLength: 100 });
      expect(instance.positionToValue({ x: 900 })).toEqual(500);
    });

    it('returns the proper position when the position is inside slider', () => {
      const instance = shallow(<Slider min={-500} max={500} />).instance();
      instance.setState({ sliderStart: 500, sliderLength: 100 });
      expect(instance.positionToValue({ x: 520 })).toEqual(-300);
    });
  });

  describe('#trimValue', () => {
    it('rounds to the proper number', () => {
      const instance = shallow(<Slider min={0} max={100} step={0.1} />).instance();
      expect(instance.trimValue(57.16)).toEqual(57.2);
      expect(instance.trimValue(57.12)).toEqual(57.10);
    });

    it('returns min if number is less than min', () => {
      const instance = shallow(<Slider min={0} max={100} step={0.1} />).instance();
      expect(instance.trimValue(-57.16)).toEqual(0);
    });

    it('returns max if number is more than max', () => {
      const instance = shallow(<Slider min={0} max={100} step={0.1} />).instance();
      expect(instance.trimValue(257.16)).toEqual(100);
    });
  });

  describe('#valueForInput', () => {
    it('returns a fixed number when an integer is given', () => {
      const instance = shallow(<Slider min={0} max={100} step={0.01} />).instance();
      expect(instance.valueForInput(4)).toEqual('4.00');
    });

    it('returns a fixed number when a float is given', () => {
      const instance = shallow(<Slider min={0} max={100} step={0.01} />).instance();
      expect(instance.valueForInput(4.06)).toEqual('4.06');
    });
  });

  describe('#knobOffset', () => {
    it('returns percentage offset of knob for slider with given min/max/value props', () => {
      const slider = shallow(<Slider min={-500} max={500} value={-250} />).instance();
      expect(slider.knobOffset()).toEqual(25);
    });
  });

  describe('#handleKeyDown', () => {
    it('does not call addToValue if is disabled', () => {
      const slider = shallow(<Slider disabled />).instance();
      slider.addToValue = jest.fn();

      slider.handleKeyDown({ keyCode: 40 });

      expect(slider.addToValue).not.toHaveBeenCalled();
    });
  });

  describe('#render', () => {
    it('contains a linear progress bar with proper properties', () => {
      const wrapper = mount(<Slider min={100} max={1000} value={140} />);
      const progress = wrapper.find(ProgressBar);
      expect(progress.props().mode).toEqual('determinate');
      expect(progress.props().type).toEqual('linear');
      expect(progress.props().value).toEqual(140);
      expect(progress.props().min).toEqual(100);
      expect(progress.props().max).toEqual(1000);
    });

    it('contains an input component if its editable', () => {
      const wrapper = mount(<Slider editable value={130} />);
      const slider = wrapper.instance();
      const input = wrapper.find(Input);
      expect(parseInt(input.props().value, 10)).toEqual(slider.props.value);
    });

    it('contains the proper number of snaps when snapped', () => {
      const wrapper = mount(<Slider editable pinned theme={theme} />);
      const sliderNode = wrapper.find('div').first();
      expect(sliderNode.props().className).toContain(theme.ring);
      expect(sliderNode.props().className).toContain(theme.pinned);
    });
  });

  describe('#events', () => {
    it('sets pressed state when knob is clicked', () => {
      const onChange = jest.fn();
      const wrapper = mount(<Slider min={-500} max={500} onChange={onChange} />);
      const knob = wrapper.childAt(0).childAt(0).childAt(0);
      knob.simulate('mouseDown');
      expect(wrapper.state().pressed).toEqual(true);
    });

    it('sets pressed state when knob is touched', () => {
      const onChange = jest.fn();
      const event = { touches: [{ pageX: 200 }] };
      const wrapper = mount(<Slider min={-500} max={500} onChange={onChange} />);
      const knob = wrapper.childAt(0).childAt(0).childAt(0);
      knob.simulate('touchStart', event);
      expect(wrapper.state().pressed).toEqual(true);
    });

    it('sets a proper value when the slider is clicked', () => {
      const onChange = jest.fn();
      const event = { pageX: 200, pageY: 0 };
      const wrapper = mount(<Slider min={-500} max={500} onChange={onChange} />);
      const instance = wrapper.instance();
      instance.setState({ sliderStart: 0, sliderLength: 1000 });
      instance.handleResize = (evt, callback) => { callback(); };
      wrapper.childAt(0).childAt(0).simulate('mouseDown', event);
      expect(onChange).toHaveBeenCalledWith(-300);
    });

    it('sets a proper value when the slider is touched', () => {
      const onChange = jest.fn();
      const event = { touches: [{ pageX: 200, pageY: 0 }] };
      const wrapper = mount(<Slider min={-500} max={500} onChange={onChange} />);
      const instance = wrapper.instance();
      instance.setState({ sliderStart: 0, sliderLength: 1000 });
      instance.handleResize = (evt, callback) => { callback(); };
      wrapper.childAt(0).childAt(0).simulate('touchStart', event);
      expect(onChange).toHaveBeenCalledWith(-300);
    });

    it('changes input value when slider changes', () => {
      const onChange = jest.fn();
      const event = { pageX: 900 };
      const wrapper = mount(<Slider editable onChange={onChange} />);
      const instance = wrapper.instance();
      instance.setState({ sliderStart: 0, sliderLength: 1000 });
      instance.handleResize = (evt, callback) => { callback(); };
      wrapper.childAt(0).childAt(0).simulate('mouseDown', event);
      expect(onChange).toHaveBeenCalledWith(90);
    });

    it('changes its value when input is blurred', () => {
      const onChange = jest.fn();
      const event = { target: { value: '80' } };
      const wrapper = mount(<Slider editable value={50} onChange={onChange} />);
      wrapper.find('input').simulate('change', event);
      wrapper.find('input').simulate('blur');
      expect(onChange).toHaveBeenCalled();
      expect(onChange.mock.calls[0][0]).toEqual(80);
    });

    it('calls onChange callback when the value is changed', () => {
      const onChange = jest.fn();
      const wrapper = mount(<Slider editable value={50} onChange={onChange} />);
      wrapper.instance().setState({ sliderStart: 0, sliderLength: 1000 });
      wrapper.childAt(0).childAt(0).simulate('mouseDown', { pageX: 900, pageY: 0 });
      expect(onChange).toHaveBeenCalled();
    });
  });
});
