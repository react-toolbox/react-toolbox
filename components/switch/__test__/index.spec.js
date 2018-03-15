import React from 'react';
import { mount } from 'enzyme';
import { Switch } from '../Switch';
import { SwitchTest } from './__mocks__/SwitchTest';
import theme from '../theme.css';

describe('Switch', () => {
  describe('#on mount', () => {
    it('is not disabled by default', () => {
      const wrapper = mount(<Switch theme={theme} />);
      expect(wrapper.props().disabled).toBe(false);
    });
    it('is not checked by default', () => {
      const wrapper = mount(<Switch theme={theme} />);
      expect(wrapper.props().checked).toBe(false);
    });

    it('has no className by default', () => {
      const wrapper = mount(<Switch theme={theme} />);
      expect(wrapper.props().className).toBe('');
    });
  });
});

describe('Switch', () => {
  it('renders the checked value in the parent components state', () => {
    const wrapper = mount(<SwitchTest />);
    expect(wrapper.find(Switch).first().props().checked).toEqual(true);
  });

  it('disables a specified switch', () => {
    const wrapper = mount(<SwitchTest />);
    expect(wrapper.find(Switch).first().props().disabled).toEqual(false);
    expect(wrapper.find(Switch).last().props().disabled).toEqual(true);
  });

  it('only selects a single value', () => {
    const wrapper = mount(<SwitchTest />);
    expect(wrapper.find(Switch).first().props().checked).toEqual(true);
    console.log('WRAPPER BEFORE:', wrapper.find(Switch).first().props());
    wrapper.find(Switch).first().find('input').simulate('click');
    console.log('WRAPPER AFTER:', wrapper.find(Switch).first().props());
    expect(wrapper.find(Switch).first().props().checked).toEqual(false);
  });
});
