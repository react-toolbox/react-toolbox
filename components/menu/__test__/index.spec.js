import React from 'react';
import { mount, shallow } from 'enzyme';
import { IconMenu } from '../IconMenu';
import { Menu } from '../Menu';
import { MenuItem } from '../MenuItem';

describe('IconMenu', () => {
  describe('#on mount', () => {
    describe('when \'active\' prop is not set', () => {
      it('sets \'active\' Menu prop correctly', () => {
        const wrapper = shallow(<IconMenu />);
        expect(wrapper.find('Menu').props().active).toBe(false);
      });
    });

    describe('when \'active\' prop is set to false', () => {
      it('sets \'active\' Menu prop correctly', () => {
        const wrapper = shallow(<IconMenu active={false} />);
        expect(wrapper.find('Menu').props().active).toBe(false);
      });

      it('sets \'active\' Menu prop correctly after IconButton click', () => {
        const wrapper = mount(<IconMenu active={false} />);
        wrapper.find('IconButton').simulate('click');
        expect(wrapper.find('Menu').props().active).toBe(true);
      });

      it('sets \'active\' Menu prop correctly when prop is set after IconButton click', () => {
        const wrapper = mount(<IconMenu active={false} />);
        wrapper.find('IconButton').simulate('click');
        wrapper.setProps({ active: false });
        expect(wrapper.find('Menu').props().active).toBe(false);
      });
    });

    describe('when \'active\' prop is set to true', () => {
      it('sets \'active\' Menu prop correctly', () => {
        const wrapper = shallow(<IconMenu active />);
        expect(wrapper.find('Menu').props().active).toBe(true);
      });

      it('sets \'active\' Menu prop correctly after IconButton click', () => {
        const wrapper = mount(<IconMenu active />);
        wrapper.find('IconButton').simulate('click');
        expect(wrapper.find('Menu').props().active).toBe(false);
      });

      it('sets \'active\' Menu prop correctly when prop is set after IconButton click', () => {
        const wrapper = mount(<IconMenu active />);
        wrapper.find('IconButton').simulate('click');
        wrapper.setProps({ active: true });
        expect(wrapper.find('Menu').props().active).toBe(true);
      });
    });
  });
});

describe('MenuItem', () => {
  describe('#onClick', () => {
    it('passes to listener the event', () => {
      const onClick = jest.fn();
      const wrapper = shallow(
        <Menu>
          <MenuItem key="1" onClick={onClick} />
        </Menu>,
      );

      wrapper.find(MenuItem).first().simulate('click', { persist: () => {} });
      expect(onClick).toHaveBeenCalled();
    });
  });
});
