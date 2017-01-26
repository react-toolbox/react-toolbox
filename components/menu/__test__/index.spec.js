/* eslint-disable */
import expect from 'expect';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import Menu from '../Menu';
import MenuItem, { MenuItem as RawMenuItem } from '../MenuItem';

describe('MenuItem', () => {
  describe('#onClick', () => {
    it('passes to listener the event', () => {
      let listenerCalled = false;
      const handleClick = function (event) {
        listenerCalled = true;
        expect(event).toExist();
        expect(event.target).toExist();
      };

      const tree = ReactTestUtils.renderIntoDocument(
        <Menu>
          <MenuItem key="1" onClick={handleClick} />
        </Menu>);

      const menuItem = ReactTestUtils.findRenderedComponentWithType(tree, RawMenuItem);
      ReactTestUtils.Simulate.click(ReactDOM.findDOMNode(menuItem));

      expect(listenerCalled).toBe(true);
    });
  });
});
