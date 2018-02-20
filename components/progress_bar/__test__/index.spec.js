import React from 'react';
import { mount, shallow } from 'enzyme';
import { ProgressBar } from '../ProgressBar';
import theme from '../theme.css';

describe('ProgressBar', () => {
  describe('#calculateRatio', () => {
    it('calculates the right ratio', () => {
      const wrapper = shallow(<ProgressBar min={100} max={300} theme={theme} />);
      const progressBar = wrapper.instance();
      expect(progressBar.calculateRatio(150)).toEqual(0.25);
    });

    it('gets 0 when value is less than min', () => {
      const wrapper = shallow(<ProgressBar min={100} max={300} theme={theme} />);
      const progressBar = wrapper.instance();
      expect(progressBar.calculateRatio(10)).toEqual(0);
    });

    it('gets 1 when value is more than max', () => {
      const wrapper = shallow(<ProgressBar min={100} max={300} theme={theme} />);
      const progressBar = wrapper.instance();
      expect(progressBar.calculateRatio(400)).toEqual(1);
    });
  });

  describe('#render', () => {
    it('renders the value and buffer bars when it is linear', () => {
      const wrapper = mount(<ProgressBar theme={theme} />);
      expect(wrapper.childAt(0).childAt(0).props().children.length).toEqual(2);
    });

    it('renders the value and buffer bars when it is linear', () => {
      const wrapper = mount(<ProgressBar mode="determinate" value={30} buffer={60} theme={theme} />);
      const buffer = wrapper.childAt(0).childAt(0).childAt(0);
      const value = wrapper.childAt(0).childAt(0).childAt(1);
      expect(buffer.props().style.transform).toEqual(`scaleX(${0.6})`);
      expect(value.props().style.transform).toEqual(`scaleX(${0.3})`);
    });

    it('renders the svg circle when it is circular', () => {
      const wrapper = mount(<ProgressBar type="circular" theme={theme} />);
      expect(wrapper.childAt(0).childAt(0).props().children.type).toEqual('circle');
    });

    it('renders the proper circle length style when it is circular and determinate', () => {
      const wrapper = mount(<ProgressBar type="circular" mode="determinate" value={30} theme={theme} />);
      const circle = wrapper.childAt(0).childAt(0).props().children;
      const strokeLength = 2 * Math.PI * circle.props.r * 0.3;
      expect(circle.props.style.strokeDasharray).toEqual(`${strokeLength}, 400`);
    });

    it('contains className in its className', () => {
      const wrapper = mount(<ProgressBar className="tight" mode="determinate" theme={theme} />);
      expect(wrapper.props().className).toContain('tight');
    });
  });
});
