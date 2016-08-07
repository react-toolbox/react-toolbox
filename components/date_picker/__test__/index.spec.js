import expect from 'expect';
import theme from '../theme.scss';
import { DatePickerDialog } from '../DatePicker';
import utils from '../../utils/testing';

describe('DatePickerDialog', function () {
  describe('#on mount', function () {
    it('passes value through to calendar if no maxDate/minDate specified', function () {
      const value = new Date(2016, 1, 1);
      const wrapper = utils.shallowRenderComponent(DatePickerDialog, {theme, value});
      expect(getDatePassedToCalendar(wrapper)).toBe(value);
    });

    describe('when minDate but not maxDate specified', function () {
      const minDate = new Date(2016, 1, 2);

      it('passes through a value after minDate', function () {
        const value = new Date(2016, 1, 3);
        const wrapper = utils.shallowRenderComponent(DatePickerDialog, {theme, value, minDate});
        expect(getDatePassedToCalendar(wrapper)).toBe(value);
      });

      it('sanitises a value before minDate to minDate', function () {
        const wrapper = utils.shallowRenderComponent(DatePickerDialog, {
          theme, value: new Date(2016, 1, 1), minDate
        });
        expect(getDatePassedToCalendar(wrapper)).toBe(minDate);
      });
    });

    describe('when maxDate but not minDate specified', function () {
      const maxDate = new Date(2016, 1, 2);

      it('passes through a value before maxDate', function () {
        const value = new Date(2016, 1, 1);
        const wrapper = utils.shallowRenderComponent(DatePickerDialog, {theme, value, maxDate});
        expect(getDatePassedToCalendar(wrapper)).toBe(value);
      });

      it('sanitises a value after maxDate to maxDate', function () {
        const wrapper = utils.shallowRenderComponent(DatePickerDialog, {
          theme, value: new Date(2016, 1, 3), maxDate
        });
        expect(getDatePassedToCalendar(wrapper)).toBe(maxDate);
      });
    });

    describe('if both minDate and maxDate are set', function () {
      const minDate = new Date(2016, 1, 2);
      const maxDate = new Date(2016, 1, 4);

      it('sanitises value to minDate if value is before minDate', function () {
        const wrapper = utils.shallowRenderComponent(DatePickerDialog, {
          theme,
          value: new Date(2016, 1, 1),
          minDate,
          maxDate
        });
        expect(getDatePassedToCalendar(wrapper)).toBe(minDate);
      });

      it('sanitises value to maxDate if value is after maxDate', function () {
        const wrapper = utils.shallowRenderComponent(DatePickerDialog, {
          theme,
          value: new Date(2016, 1, 5),
          minDate,
          maxDate
        });
        expect(getDatePassedToCalendar(wrapper)).toBe(maxDate);
      });

      it('doesn\'t sanitise when value is between maxDate/minDate', function () {
        const value = new Date(2016, 1, 3);
        const wrapper = utils.shallowRenderComponent(DatePickerDialog, {theme, value, minDate, maxDate});
        expect(getDatePassedToCalendar(wrapper)).toBe(value);
      });
    });

    function getDatePassedToCalendar (wrapper) {
      return wrapper.props.children[1].props.children.props.selectedDate;
    }
  });
});
