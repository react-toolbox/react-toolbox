/* eslint-disable */
import expect from 'expect';
import theme from '../theme.css';
import { DatePickerDialog } from '../DatePicker';
import utils from '../../utils/testing';

describe('DatePickerDialog', () => {
  describe('#on mount', () => {
    it('passes value through to calendar if no maxDate/minDate specified', () => {
      const value = new Date(2016, 1, 1);
      const wrapper = utils.shallowRenderComponent(DatePickerDialog, { theme, value });
      expect(getDatePassedToCalendar(wrapper)).toBe(value);
    });

    describe('when minDate but not maxDate specified', () => {
      const minDate = new Date(2016, 1, 2);

      it('passes through a value after minDate', () => {
        const value = new Date(2016, 1, 3);
        const wrapper = utils.shallowRenderComponent(DatePickerDialog, { theme, value, minDate });
        expect(getDatePassedToCalendar(wrapper)).toBe(value);
      });

      it('sanitises a value before minDate to minDate', () => {
        const wrapper = utils.shallowRenderComponent(DatePickerDialog, {
          theme, value: new Date(2016, 1, 1), minDate,
        });
        expect(getDatePassedToCalendar(wrapper)).toBe(minDate);
      });
    });

    describe('when maxDate but not minDate specified', () => {
      const maxDate = new Date(2016, 1, 2);

      it('passes through a value before maxDate', () => {
        const value = new Date(2016, 1, 1);
        const wrapper = utils.shallowRenderComponent(DatePickerDialog, { theme, value, maxDate });
        expect(getDatePassedToCalendar(wrapper)).toBe(value);
      });

      it('sanitises a value after maxDate to maxDate', () => {
        const wrapper = utils.shallowRenderComponent(DatePickerDialog, {
          theme, value: new Date(2016, 1, 3), maxDate,
        });
        expect(getDatePassedToCalendar(wrapper)).toBe(maxDate);
      });
    });

    describe('if both minDate and maxDate are set', () => {
      const minDate = new Date(2016, 1, 2);
      const maxDate = new Date(2016, 1, 4);

      it('sanitises value to minDate if value is before minDate', () => {
        const wrapper = utils.shallowRenderComponent(DatePickerDialog, {
          theme,
          value: new Date(2016, 1, 1),
          minDate,
          maxDate,
        });
        expect(getDatePassedToCalendar(wrapper)).toBe(minDate);
      });

      it('sanitises value to maxDate if value is after maxDate', () => {
        const wrapper = utils.shallowRenderComponent(DatePickerDialog, {
          theme,
          value: new Date(2016, 1, 5),
          minDate,
          maxDate,
        });
        expect(getDatePassedToCalendar(wrapper)).toBe(maxDate);
      });

      it('doesn\'t sanitise when value is between maxDate/minDate', () => {
        const value = new Date(2016, 1, 3);
        const wrapper = utils.shallowRenderComponent(DatePickerDialog, { theme, value, minDate, maxDate });
        expect(getDatePassedToCalendar(wrapper)).toBe(value);
      });
    });

    function getDatePassedToCalendar(wrapper) {
      return wrapper.props.children[1].props.children.props.selectedDate;
    }
  });
});
