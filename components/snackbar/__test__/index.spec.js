import React from 'react';
import { mount } from 'enzyme';
import { Snackbar } from '../Snackbar';

describe('Snackbar', () => {
  describe('#on mount', () => {
    describe('when `active` prop is set to `false`', () => {
      it('sets `active` Snackbar prop correctly', () => {
        const wrapper = mount(<Snackbar active={false} />);
        expect(wrapper.props().active).toBe(false);
      });
    });
  });
});
