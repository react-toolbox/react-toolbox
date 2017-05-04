import { identity } from 'ramda';
import React, { cloneElement, PropTypes, Children, PureComponent } from 'react';
import isBefore from 'date-fns/is_before';
import isAfter from 'date-fns/is_after';
import isComponentOfType from '../../utils/isComponentOfType';
import getPassThrough from '../../utils/getPassThrough';
import { START_DATE, END_DATE } from './constants';
import dateShape from './dateShape';

const rangePickerFactory = ({ MonthsWrapper, Month, passthrough }) => {
  const passProps = getPassThrough(passthrough);
  class RangePicker extends PureComponent {
    static propTypes = {
      children: PropTypes.node,
      focusedInput: PropTypes.oneOf([START_DATE, END_DATE]),
      highlighted: dateShape,
      onChange: PropTypes.func,
      onFocusedInputChange: PropTypes.func,
      onHighlightedChange: PropTypes.func,
      selected: dateShape,
    };

    static defaultProps = {
      highlighted: {},
      onFocusedInputChange: identity,
      onHighlightedChange: identity,
    };

    selecting = false;

    handleDayClick = clickedDate => {
      const {
        focusedInput,
        onChange,
        onFocusedInputChange,
        onHighlightedChange,
        selected,
      } = this.props;

      if (!selected.from && !selected.to) {
        if (focusedInput === END_DATE) {
          onChange({ to: clickedDate });
          onFocusedInputChange(START_DATE);
          onHighlightedChange({ to: clickedDate });
          this.selecting = true;
        } else {
          onChange({ from: clickedDate });
          onFocusedInputChange(END_DATE);
          onHighlightedChange({ from: clickedDate });
          this.selecting = true;
        }
      }

      if (selected.from && !selected.to) {
        if (
          focusedInput === START_DATE ||
          isBefore(clickedDate, selected.from)
        ) {
          onChange({ from: clickedDate });
          onFocusedInputChange(END_DATE);
          onHighlightedChange({ from: clickedDate });
          this.selecting = true;
        } else {
          onChange({ from: selected.from, to: clickedDate });
          onFocusedInputChange(null);
          onHighlightedChange({});
          this.selecting = false;
        }
      }

      if (selected.to && !selected.from) {
        if (focusedInput === END_DATE) {
          onChange({ to: clickedDate });
          onFocusedInputChange(START_DATE);
          onHighlightedChange({ to: clickedDate });
          this.selecting = true;
        } else if (isAfter(clickedDate, selected.to)) {
          onChange({ from: clickedDate });
          onFocusedInputChange(END_DATE);
          onHighlightedChange({ from: clickedDate });
          this.selecting = true;
        } else {
          onChange({ from: clickedDate, to: selected.to });
          onFocusedInputChange(null);
          onHighlightedChange({});
          this.selecting = false;
        }
      }

      if (selected.to && selected.from) {
        if (focusedInput === START_DATE) {
          const to = isBefore(clickedDate, selected.to)
            ? selected.to
            : undefined;
          onChange({ from: clickedDate, to });
          onFocusedInputChange(END_DATE);
          onHighlightedChange({ from: clickedDate });
          this.selecting = true;
        } else if (focusedInput === END_DATE) {
          if (isAfter(clickedDate, selected.from)) {
            onChange({ from: selected.from, to: clickedDate });
            onFocusedInputChange(null);
            onHighlightedChange({});
            this.selecting = false;
          } else {
            onChange({ from: clickedDate });
            onFocusedInputChange(END_DATE);
            onHighlightedChange({ from: clickedDate });
            this.selecting = true;
          }
        } else if (isBefore(clickedDate, selected.to)) {
          onChange({ from: clickedDate, to: selected.to });
          onFocusedInputChange(END_DATE);
          onHighlightedChange({ from: clickedDate });
          this.selecting = true;
        } else {
          onChange({ from: selected.from, to: clickedDate });
          onFocusedInputChange(null);
          onHighlightedChange({});
          this.selecting = false;
        }
      }
    };

    handleDayMouseEnter = dateForDay => {
      const { focusedInput, onHighlightedChange } = this.props;
      const { selected } = this.props;

      if (this.selecting) {
        if (focusedInput === END_DATE && isAfter(dateForDay, selected.from)) {
          onHighlightedChange({ from: selected.from, to: dateForDay });
        } else if (
          focusedInput === START_DATE &&
          isBefore(dateForDay, selected.to)
        ) {
          onHighlightedChange({ from: dateForDay, to: selected.to });
        }
      }
    };

    renderMonth = month =>
      cloneElement(month, {
        highlighted: this.props.highlighted,
        onDayClick: this.handleDayClick,
        onDayMouseEnter: this.handleDayMouseEnter,
        selected: this.props.selected,
      });

    render() {
      const {
        children,
        focusedInput,
        onChange,
        selected,
        ...rest
      } = this.props;
      return (
        <MonthsWrapper {...rest} {...passProps(this.props, 'MonthsWrapper')}>
          {Children.map(
            children,
            child =>
              isComponentOfType(Month, child) ? this.renderMonth(child) : child
          )}
        </MonthsWrapper>
      );
    }
  }

  return RangePicker;
};

export default rangePickerFactory;
