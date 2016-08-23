'use strict';

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _theme = require('../theme.scss');

var _theme2 = _interopRequireDefault(_theme);

var _DatePicker = require('../DatePicker');

var _testing = require('../../utils/testing');

var _testing2 = _interopRequireDefault(_testing);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('DatePickerDialog', function () {
  describe('#on mount', function () {
    it('passes value through to calendar if no maxDate/minDate specified', function () {
      var value = new Date(2016, 1, 1);
      var wrapper = _testing2.default.shallowRenderComponent(_DatePicker.DatePickerDialog, { theme: _theme2.default, value: value });
      (0, _expect2.default)(getDatePassedToCalendar(wrapper)).toBe(value);
    });

    describe('when minDate but not maxDate specified', function () {
      var minDate = new Date(2016, 1, 2);

      it('passes through a value after minDate', function () {
        var value = new Date(2016, 1, 3);
        var wrapper = _testing2.default.shallowRenderComponent(_DatePicker.DatePickerDialog, { theme: _theme2.default, value: value, minDate: minDate });
        (0, _expect2.default)(getDatePassedToCalendar(wrapper)).toBe(value);
      });

      it('sanitises a value before minDate to minDate', function () {
        var wrapper = _testing2.default.shallowRenderComponent(_DatePicker.DatePickerDialog, {
          theme: _theme2.default, value: new Date(2016, 1, 1), minDate: minDate
        });
        (0, _expect2.default)(getDatePassedToCalendar(wrapper)).toBe(minDate);
      });
    });

    describe('when maxDate but not minDate specified', function () {
      var maxDate = new Date(2016, 1, 2);

      it('passes through a value before maxDate', function () {
        var value = new Date(2016, 1, 1);
        var wrapper = _testing2.default.shallowRenderComponent(_DatePicker.DatePickerDialog, { theme: _theme2.default, value: value, maxDate: maxDate });
        (0, _expect2.default)(getDatePassedToCalendar(wrapper)).toBe(value);
      });

      it('sanitises a value after maxDate to maxDate', function () {
        var wrapper = _testing2.default.shallowRenderComponent(_DatePicker.DatePickerDialog, {
          theme: _theme2.default, value: new Date(2016, 1, 3), maxDate: maxDate
        });
        (0, _expect2.default)(getDatePassedToCalendar(wrapper)).toBe(maxDate);
      });
    });

    describe('if both minDate and maxDate are set', function () {
      var minDate = new Date(2016, 1, 2);
      var maxDate = new Date(2016, 1, 4);

      it('sanitises value to minDate if value is before minDate', function () {
        var wrapper = _testing2.default.shallowRenderComponent(_DatePicker.DatePickerDialog, {
          theme: _theme2.default,
          value: new Date(2016, 1, 1),
          minDate: minDate,
          maxDate: maxDate
        });
        (0, _expect2.default)(getDatePassedToCalendar(wrapper)).toBe(minDate);
      });

      it('sanitises value to maxDate if value is after maxDate', function () {
        var wrapper = _testing2.default.shallowRenderComponent(_DatePicker.DatePickerDialog, {
          theme: _theme2.default,
          value: new Date(2016, 1, 5),
          minDate: minDate,
          maxDate: maxDate
        });
        (0, _expect2.default)(getDatePassedToCalendar(wrapper)).toBe(maxDate);
      });

      it('doesn\'t sanitise when value is between maxDate/minDate', function () {
        var value = new Date(2016, 1, 3);
        var wrapper = _testing2.default.shallowRenderComponent(_DatePicker.DatePickerDialog, { theme: _theme2.default, value: value, minDate: minDate, maxDate: maxDate });
        (0, _expect2.default)(getDatePassedToCalendar(wrapper)).toBe(value);
      });
    });

    function getDatePassedToCalendar(wrapper) {
      return wrapper.props.children[1].props.children.props.selectedDate;
    }
  });
});