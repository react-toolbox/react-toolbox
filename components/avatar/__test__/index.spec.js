import React from 'react';
import { mount, shallow } from 'enzyme';
import { Avatar } from '../Avatar';
import theme from '../theme.css';


describe('Avatar', () => {
  describe('#render', () => {
    it('uses no cover as default', () => {
      const wrapper = mount(<Avatar theme={theme} />);
      expect(wrapper.props().cover).toBe(false);
    });

    it('uses no alternative as default', () => {
      const wrapper = mount(<Avatar theme={theme} />);
      expect(wrapper.props().alt).toBe('');
    });

    it('uses no theme as default', () => {
      const wrapper = mount(<Avatar theme={theme} />);
      expect(wrapper.props().theme).toMatchObject({});
    });

    it('has className `avatar`', () => {
      const wrapper = shallow(<Avatar theme={theme} />);
      expect(wrapper.props().className).toBe('avatar');
    });

    it('should show first letter of name if title is given', () => {
      const wrapper = mount(<Avatar theme={theme} title="Ben" />);
      const { className, children } = wrapper.find('span').props();
      expect(className).toContain(theme.letter);
      expect(children).toContain('B');
    });
  });
});
