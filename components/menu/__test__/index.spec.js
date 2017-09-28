import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Menu } from '../Menu';
import { MenuItem } from '../MenuItem';

configure({ adapter: new Adapter() });

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
