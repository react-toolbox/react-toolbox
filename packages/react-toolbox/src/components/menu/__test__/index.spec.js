/* eslint-disable import/no-named-as-default */
import React from 'react';
import { shallow } from 'enzyme';
import Menu from '../Menu';
import MenuItem from '../MenuItem';

describe('MenuItem', () => {
  describe('#onClick', () => {
    it('passes to listener the event', () => {
      const onClick = jest.fn();
      const wrapper = shallow(
        <Menu>
          <MenuItem key="1" onClick={onClick} />
        </Menu>
      );

      wrapper.find(MenuItem).first().simulate('click', { persist: () => {} });
      expect(onClick).toHaveBeenCalled();
    });
  });
});
