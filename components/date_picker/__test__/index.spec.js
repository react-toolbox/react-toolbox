import React from 'react';
import { shallow } from 'enzyme';
import theme from '../theme.css';
import { DatePickerDialog, Calendar } from '../DatePicker';

describe('DatePickerDialog', () => {
  describe('#on mount', () => {
    it('passes value through to calendar if no maxDate/minDate specified', () => {
      const value = new Date(2016, 1, 1);
      const wrapper = shallow(<DatePickerDialog theme={theme} value={value} />);
      expect(wrapper.find(Calendar).props().selectedDate).toBe(value);
    });

    describe('when minDate but not maxDate specified', () => {
      const minDate = new Date(2016, 1, 2);

      it('passes through a value after minDate', () => {
        const value = new Date(2016, 1, 3);
        const wrapper = shallow(<DatePickerDialog theme={theme} minDate={minDate} value={value} />);
        expect(wrapper.find(Calendar).props().selectedDate).toBe(value);
      });

      it('sanitises a value before minDate to minDate', () => {
        const wrapper = shallow(
          <DatePickerDialog
            theme={theme}
            minDate={minDate}
            value={new Date(2016, 1, 1)}
          />,
        );
        expect(wrapper.find(Calendar).props().selectedDate).toBe(minDate);
      });
    });

    describe('when maxDate but not minDate specified', () => {
      const maxDate = new Date(2016, 1, 2);

      it('passes through a value before maxDate', () => {
        const value = new Date(2016, 1, 1);
        const wrapper = shallow(
          <DatePickerDialog
            theme={theme}
            maxDate={maxDate}
            value={value}
          />,
        );
        expect(wrapper.find(Calendar).props().selectedDate).toBe(value);
      });

      it('sanitises a value after maxDate to maxDate', () => {
        const wrapper = shallow(
          <DatePickerDialog
            theme={theme}
            maxDate={maxDate}
            value={new Date(2016, 1, 3)}
          />,
        );
        expect(wrapper.find(Calendar).props().selectedDate).toBe(maxDate);
      });
    });

    describe('if both minDate and maxDate are set', () => {
      const minDate = new Date(2016, 1, 2);
      const maxDate = new Date(2016, 1, 4);

      it('sanitises value to minDate if value is before minDate', () => {
        const wrapper = shallow(
          <DatePickerDialog
            theme={theme}
            minDate={minDate}
            maxDate={maxDate}
            value={new Date(2016, 1, 1)}
          />,
        );
        expect(wrapper.find(Calendar).props().selectedDate).toBe(minDate);
      });

      it('sanitises value to maxDate if value is after maxDate', () => {
        const wrapper = shallow(
          <DatePickerDialog
            theme={theme}
            minDate={minDate}
            maxDate={maxDate}
            value={new Date(2016, 1, 5)}
          />,
        );
        expect(wrapper.find(Calendar).props().selectedDate).toBe(maxDate);
      });

      it('doesn\'t sanitise when value is between maxDate/minDate', () => {
        const value = new Date(2016, 1, 3);
        const wrapper = shallow(
          <DatePickerDialog
            theme={theme}
            minDate={minDate}
            maxDate={maxDate}
            value={value}
          />,
        );
        expect(wrapper.find(Calendar).props().selectedDate).toBe(value);
      });
    });
  });
});
