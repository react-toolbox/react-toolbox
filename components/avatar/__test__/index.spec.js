import React from 'react';
import { mount } from 'enzyme';
import { Avatar } from '../Avatar';
import theme from '../theme.css';


describe('Avatar', () => {
  describe('#render', () => {
    it('uses no cover as default', () => {
      const wrapper = mount(<Avatar theme={theme} />);
      expect(wrapper.props().cover).toBe(false);
    });
  });
});
