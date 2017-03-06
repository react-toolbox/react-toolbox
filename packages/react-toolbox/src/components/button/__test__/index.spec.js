import React from 'react';
import { mount } from 'enzyme';
import { Button } from '../Button';
import theme from '../theme.css';

describe('Button', () => {
  describe('#render', () => {
    it('uses flat and neutral styles by default', () => {
      const wrapper = mount(<Button theme={theme} />);
      const { className } = wrapper.find('button').props();
      expect(className).toContain(theme.flat);
      expect(className).toContain(theme.neutral);
    });

    it('renders accent button with accent style', () => {
      const wrapper = mount(<Button accent theme={theme} />);
      const { className } = wrapper.find('button').props();
      expect(className).toContain(theme.flat);
      expect(className).toContain(theme.accent);
    });

    it('renders mini button with mini style', () => {
      const wrapper = mount(<Button floating mini theme={theme} />);
      const { className } = wrapper.find('button').props();
      expect(className).toContain(theme.floating);
      expect(className).toContain(theme.neutral);
      expect(className).toContain(theme.mini);
    });

    it('renders mini accented button with both styles', () => {
      const wrapper = mount(<Button accent mini theme={theme} />);
      const { className } = wrapper.find('button').props();
      expect(className).toContain(theme.flat);
      expect(className).toContain(theme.accent);
      expect(className).toContain(theme.mini);
    });
  });
});
