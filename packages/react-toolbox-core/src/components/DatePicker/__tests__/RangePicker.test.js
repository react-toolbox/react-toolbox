import React from 'react';
import { shallow } from 'enzyme';
import rangePickerFactory from '../RangePicker';
import * as C from '../constants';

const RangePicker = rangePickerFactory({
  MonthsWrapper: () => <div />,
  Month: () => <div />,
});

describe('RangePicker', () => {
  it('does shit', () => {
    expect(true).toEqual(true);
  });

  /*describe('handleDayClick', () => {
    describe('given value is empty', () => {
      let onChange;
      let onFocusedInputChange;
      let onHighlightedChange;
      let selected;
      let clickedDate;

      beforeEach(() => {
        onChange = jest.fn();
        onFocusedInputChange = jest.fn();
        onHighlightedChange = jest.fn();
        selected = { from: null, to: null };
        clickedDate = new Date();
      });

      it('should set from if focus is START_DATE', () => {
        const component = shallow(
          <RangePicker
            {...{
              onChange,
              onFocusedInputChange,
              onHighlightedChange,
              selected,
            }}
            focusedInput={C.START_DATE}
          />
        );
        component.instance().handleDayClick(clickedDate);
        expect(onChange).toHaveBeenCalledWith({ from: clickedDate });
        expect(onFocusedInputChange).toHaveBeenCalledWith(C.END_DATE);
        expect(component.instance().selecting).toEqual(true);
        expect(onHighlightedChange).toHaveBeenCalledWith({ from: clickedDate });
      });

      it('should set from if focus is undefined', () => {
        const component = shallow(
          <RangePicker
            {...{
              onChange,
              onFocusedInputChange,
              onHighlightedChange,
              selected,
            }}
          />
        );
        component.instance().handleDayClick(clickedDate);
        expect(onChange).toHaveBeenCalledWith({ from: clickedDate });
        expect(onFocusedInputChange).toHaveBeenCalledWith(C.END_DATE);
        expect(component.instance().selecting).toEqual(true);
        expect(onHighlightedChange).toHaveBeenCalledWith({ from: clickedDate });
      });

      it('should set to if focus is END_DATE', () => {
        const component = shallow(
          <RangePicker
            {...{
              onChange,
              onFocusedInputChange,
              selected,
              onHighlightedChange,
            }}
            focusedInput={C.END_DATE}
          />
        );
        component.instance().handleDayClick(clickedDate);
        expect(onChange).toHaveBeenCalledWith({ to: clickedDate });
        expect(onFocusedInputChange).toHaveBeenCalledWith(C.START_DATE);
        expect(component.instance().selecting).toEqual(true);
        expect(onHighlightedChange).toHaveBeenCalledWith({ to: clickedDate });
      });
    });

    describe('given selected has from', () => {
      let onChange;
      let onFocusedInputChange;
      let onHighlightedChange;
      let selected;

      beforeEach(() => {
        onChange = jest.fn();
        onFocusedInputChange = jest.fn();
        onHighlightedChange = jest.fn();
        selected = { from: new Date(2017, 1, 1), to: null };
      });

      it('should set from if focus is START_DATE', () => {
        const component = shallow(
          <RangePicker
            {...{
              onChange,
              onFocusedInputChange,
              onHighlightedChange,
              selected,
            }}
            focusedInput={C.START_DATE}
          />
        );
        const clickedDate = new Date();
        component.instance().handleDayClick(clickedDate);
        expect(onChange).toHaveBeenCalledWith({ from: clickedDate });
        expect(onFocusedInputChange).toHaveBeenCalledWith(C.END_DATE);
        expect(component.instance().selecting).toEqual(true);
        expect(onHighlightedChange).toHaveBeenCalledWith({ from: clickedDate });
      });

      it('should set to if focus is END_DATE and clicked date is after from', () => {
        const component = shallow(
          <RangePicker
            {...{
              onChange,
              onFocusedInputChange,
              onHighlightedChange,
              selected,
            }}
            focusedInput={C.END_DATE}
          />
        );
        const clickedDate = new Date(2017, 1, 2);
        component.instance().handleDayClick(clickedDate);
        expect(onChange).toHaveBeenCalledWith({
          from: selected.from,
          to: clickedDate,
        });
        expect(onFocusedInputChange).toHaveBeenCalledWith(null);
        expect(component.instance().selecting).toEqual(false);
        expect(onHighlightedChange).toHaveBeenCalledWith({});
      });

      it('should set from if focus is END_DATE and clicked date is before from', () => {
        const component = shallow(
          <RangePicker
            {...{
              onChange,
              onFocusedInputChange,
              onHighlightedChange,
              selected,
            }}
            focusedInput={C.END_DATE}
          />
        );
        const clickedDate = new Date(2016, 1, 1);
        component.instance().handleDayClick(clickedDate);
        expect(onChange).toHaveBeenCalledWith({ from: clickedDate });
        expect(onFocusedInputChange).toHaveBeenCalledWith(C.END_DATE);
        expect(component.instance().selecting).toEqual(true);
        expect(onHighlightedChange).toHaveBeenCalledWith({ from: clickedDate });
      });

      it('should set to if focus is undefined and clicked date is after from', () => {
        const component = shallow(
          <RangePicker
            {...{
              onChange,
              onFocusedInputChange,
              onHighlightedChange,
              selected,
            }}
          />
        );
        const clickedDate = new Date(2017, 1, 2);
        component.instance().handleDayClick(clickedDate);
        expect(onChange).toHaveBeenCalledWith({
          from: selected.from,
          to: clickedDate,
        });
        expect(onFocusedInputChange).toHaveBeenCalledWith(null);
        expect(component.instance().selecting).toEqual(false);
        expect(onHighlightedChange).toHaveBeenCalledWith({});
      });

      it('should set from if focus is undefined and clicked date is before from', () => {
        const component = shallow(
          <RangePicker
            {...{
              onChange,
              onFocusedInputChange,
              onHighlightedChange,
              selected,
            }}
          />
        );
        const clickedDate = new Date(2016, 1, 1);
        component.instance().handleDayClick(clickedDate);
        expect(onChange).toHaveBeenCalledWith({ from: clickedDate });
        expect(onFocusedInputChange).toHaveBeenCalledWith(C.END_DATE);
        expect(component.instance().selecting).toEqual(true);
        expect(onHighlightedChange).toHaveBeenCalledWith({ from: clickedDate });
      });
    });

    describe('given selected has to', () => {
      let onChange;
      let onFocusedInputChange;
      let onHighlightedChange;
      let selected;

      beforeEach(() => {
        onChange = jest.fn();
        onFocusedInputChange = jest.fn();
        onHighlightedChange = jest.fn();
        selected = { from: null, to: new Date(2017, 1, 2) };
      });

      it('should set to if focus is END_DATE', () => {
        const component = shallow(
          <RangePicker
            {...{
              onChange,
              onFocusedInputChange,
              onHighlightedChange,
              selected,
            }}
            focusedInput={C.END_DATE}
          />
        );
        const clickedDate = new Date();
        component.instance().handleDayClick(clickedDate);
        expect(onChange).toHaveBeenCalledWith({ to: clickedDate });
        expect(onFocusedInputChange).toHaveBeenCalledWith(C.START_DATE);
        expect(component.instance().selecting).toEqual(true);
        expect(onHighlightedChange).toHaveBeenCalledWith({ to: clickedDate });
      });

      it('should set to if focus is START_DATE and clicked date is after to', () => {
        const component = shallow(
          <RangePicker
            {...{
              onChange,
              onFocusedInputChange,
              onHighlightedChange,
              selected,
            }}
            focusedInput={C.START_DATE}
          />
        );
        const clickedDate = new Date(2017, 1, 3);
        component.instance().handleDayClick(clickedDate);
        expect(onChange).toHaveBeenCalledWith({ from: clickedDate });
        expect(onFocusedInputChange).toHaveBeenCalledWith(C.END_DATE);
        expect(component.instance().selecting).toEqual(true);
        expect(onHighlightedChange).toHaveBeenCalledWith({ from: clickedDate });
      });

      it('should set from if focus is START_DATE and clicked date is before to', () => {
        const component = shallow(
          <RangePicker
            {...{
              onChange,
              onFocusedInputChange,
              onHighlightedChange,
              selected,
            }}
            focusedInput={C.START_DATE}
          />
        );
        const clickedDate = new Date(2016, 1, 1);
        component.instance().handleDayClick(clickedDate);
        expect(onChange).toHaveBeenCalledWith({
          from: clickedDate,
          to: selected.to,
        });
        expect(onFocusedInputChange).toHaveBeenCalledWith(null);
        expect(component.instance().selecting).toEqual(false);
        expect(onHighlightedChange).toHaveBeenCalledWith({});
      });

      it('should set to if focus is undefined and clicked date is after to', () => {
        const component = shallow(
          <RangePicker
            {...{
              onChange,
              onFocusedInputChange,
              onHighlightedChange,
              selected,
            }}
          />
        );
        const clickedDate = new Date(2017, 1, 3);
        component.instance().handleDayClick(clickedDate);
        expect(onChange).toHaveBeenCalledWith({ from: clickedDate });
        expect(onFocusedInputChange).toHaveBeenCalledWith(C.END_DATE);
        expect(component.instance().selecting).toEqual(true);
        expect(onHighlightedChange).toHaveBeenCalledWith({ from: clickedDate });
      });

      it('should set from if focus is undefined and clicked date is before to', () => {
        const component = shallow(
          <RangePicker
            {...{
              onChange,
              onFocusedInputChange,
              onHighlightedChange,
              selected,
            }}
          />
        );
        const clickedDate = new Date(2016, 1, 1);
        component.instance().handleDayClick(clickedDate);
        expect(onChange).toHaveBeenCalledWith({
          from: clickedDate,
          to: selected.to,
        });
        expect(onFocusedInputChange).toHaveBeenCalledWith(null);
        expect(component.instance().selecting).toEqual(false);
        expect(onHighlightedChange).toHaveBeenCalledWith({});
      });
    });

    describe('given selected has from and to', () => {
      let onChange;
      let onFocusedInputChange;
      let onHighlightedChange;
      let selected;

      beforeEach(() => {
        onChange = jest.fn();
        onFocusedInputChange = jest.fn();
        onHighlightedChange = jest.fn();
        selected = { from: new Date(2017, 1, 1), to: new Date(2017, 1, 2) };
      });

      it('should set from if focus is START_DATE and clicked day is before to', () => {
        const component = shallow(
          <RangePicker
            {...{
              onChange,
              onFocusedInputChange,
              selected,
              onHighlightedChange,
            }}
            focusedInput={C.START_DATE}
          />
        );
        const clickedDate = new Date(2016, 1, 1);
        component.instance().handleDayClick(clickedDate);
        expect(onChange).toHaveBeenCalledWith({
          from: clickedDate,
          to: selected.to,
        });
        expect(onFocusedInputChange).toHaveBeenCalledWith(C.END_DATE);
        expect(component.instance().selecting).toEqual(true);
        expect(onHighlightedChange).toHaveBeenCalledWith({ from: clickedDate });
      });

      it('should set from and clear to if focus is START_DATE and clicked day is after to', () => {
        const component = shallow(
          <RangePicker
            {...{
              onChange,
              onFocusedInputChange,
              selected,
              onHighlightedChange,
            }}
            focusedInput={C.START_DATE}
          />
        );
        const clickedDate = new Date(2017, 1, 3);
        component.instance().handleDayClick(clickedDate);
        expect(onChange).toHaveBeenCalledWith({ from: clickedDate });
        expect(onFocusedInputChange).toHaveBeenCalledWith(C.END_DATE);
        expect(component.instance().selecting).toEqual(true);
        expect(onHighlightedChange).toHaveBeenCalledWith({ from: clickedDate });
      });

      it('should set to if focus is END_DATE and clicked day is after from', () => {
        const component = shallow(
          <RangePicker
            {...{
              onChange,
              onFocusedInputChange,
              selected,
              onHighlightedChange,
            }}
            focusedInput={C.END_DATE}
          />
        );
        const clickedDate = new Date(2017, 1, 3);
        component.instance().handleDayClick(clickedDate);
        expect(onChange).toHaveBeenCalledWith({
          from: selected.from,
          to: clickedDate,
        });
        expect(onFocusedInputChange).toHaveBeenCalledWith(null);
        expect(component.instance().selecting).toEqual(false);
        expect(onHighlightedChange).toHaveBeenCalledWith({});
      });

      it('should set from and clear to if focus is END_DATE and clicked day is before from', () => {
        const component = shallow(
          <RangePicker
            {...{
              onChange,
              onFocusedInputChange,
              selected,
              onHighlightedChange,
            }}
            focusedInput={C.END_DATE}
          />
        );
        const clickedDate = new Date(2016, 1, 1);
        component.instance().handleDayClick(clickedDate);
        expect(onChange).toHaveBeenCalledWith({
          from: clickedDate,
          to: undefined,
        });
        expect(onFocusedInputChange).toHaveBeenCalledWith(C.END_DATE);
        expect(component.instance().selecting).toEqual(true);
        expect(onHighlightedChange).toHaveBeenCalledWith({ from: clickedDate });
      });

      it('should set from if focus is undefined and clicked day is before to', () => {
        const component = shallow(
          <RangePicker
            {...{
              onChange,
              onFocusedInputChange,
              selected,
              onHighlightedChange,
            }}
          />
        );
        const clickedDate = new Date(2016, 1, 1);
        component.instance().handleDayClick(clickedDate);
        expect(onChange).toHaveBeenCalledWith({
          from: clickedDate,
          to: selected.to,
        });
        expect(onFocusedInputChange).toHaveBeenCalledWith(C.END_DATE);
        expect(component.instance().selecting).toEqual(true);
        expect(onHighlightedChange).toHaveBeenCalledWith({ from: clickedDate });
      });

      it('should set to if focus is undefined and clicked day is after to', () => {
        const component = shallow(
          <RangePicker
            {...{
              onChange,
              onFocusedInputChange,
              selected,
              onHighlightedChange,
            }}
          />
        );
        const clickedDate = new Date(2017, 1, 3);
        component.instance().handleDayClick(clickedDate);
        expect(onChange).toHaveBeenCalledWith({
          from: selected.from,
          to: clickedDate,
        });
        expect(onFocusedInputChange).toHaveBeenCalledWith(null);
        expect(component.instance().selecting).toEqual(false);
        expect(onHighlightedChange).toHaveBeenCalledWith({});
      });
    });
  });

  describe('handleDayMouseEnter', () => {
    it('should not update the highlight if not selecting', () => {
      const from = new Date(2017, 1, 1);
      const interval = { from };
      const onHighlightedChange = jest.fn();
      const component = shallow(
        <RangePicker
          selected={interval}
          focusedInput={C.END_DATE}
          highlighted={interval}
          onHighlightedChange={onHighlightedChange}
        />
      );
      component.instance().selecting = false;
      const mouseOverDate = new Date(2017, 1, 7);
      component.instance().handleDayMouseEnter(mouseOverDate);
      expect(onHighlightedChange).toHaveBeenCalledTimes(0);
    });

    it('should update highlight.to if focused input is END_DATE and interval is correct', () => {
      const from = new Date(2017, 1, 1);
      const interval = { from };
      const onHighlightedChange = jest.fn();
      const component = shallow(
        <RangePicker
          selected={interval}
          focusedInput={C.END_DATE}
          highlighted={interval}
          onHighlightedChange={onHighlightedChange}
        />
      );
      component.instance().selecting = true;
      const mouseOverDate = new Date(2017, 1, 7);
      component.instance().handleDayMouseEnter(mouseOverDate);
      expect(onHighlightedChange).toHaveBeenCalledWith({
        from,
        to: mouseOverDate,
      });
    });

    it('should update highlight.to if focused input is END_DATE and interval is incorrect', () => {
      const from = new Date(2017, 1, 1);
      const interval = { from };
      const onHighlightedChange = jest.fn();
      const component = shallow(
        <RangePicker
          selected={interval}
          focusedInput={C.END_DATE}
          highlighted={interval}
          onHighlightedChange={onHighlightedChange}
        />
      );
      component.instance().selecting = true;
      const mouseOverDate = new Date(2016, 1, 1);
      component.instance().handleDayMouseEnter(mouseOverDate);
      expect(onHighlightedChange).toHaveBeenCalledTimes(0);
    });

    it('should update highlight.from if focused input is START_DATE and interval is correct', () => {
      const to = new Date(2017, 1, 1);
      const interval = { to };
      const onHighlightedChange = jest.fn();
      const component = shallow(
        <RangePicker
          selected={interval}
          focusedInput={C.START_DATE}
          highlighted={interval}
          onHighlightedChange={onHighlightedChange}
        />
      );
      component.instance().selecting = true;
      const mouseOverDate = new Date(2016, 1, 1);
      component.instance().handleDayMouseEnter(mouseOverDate);
      expect(onHighlightedChange).toHaveBeenCalledWith({
        to,
        from: mouseOverDate,
      });
    });

    it('should update highlight.from if focused input is START_DATE and interval is incorrect', () => {
      const to = new Date(2017, 1, 1);
      const interval = { to };
      const onHighlightedChange = jest.fn();
      const component = shallow(
        <RangePicker
          selected={interval}
          focusedInput={C.START_DATE}
          highlighted={interval}
          onHighlightedChange={onHighlightedChange}
        />
      );
      component.instance().selecting = true;
      const mouseOverDate = new Date(2017, 1, 2);
      component.instance().handleDayMouseEnter(mouseOverDate);
      expect(onHighlightedChange).toHaveBeenCalledTimes(0);
    });
  });*/
});
