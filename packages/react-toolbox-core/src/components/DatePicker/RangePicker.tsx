import * as React from 'react';
import { isBefore, isAfter } from 'date-fns';
import {
  Children,
  cloneElement,
  ComponentClass,
  Component,
  ReactElement,
  ReactNode,
} from 'react';
import isComponentOfType from '../../utils/isComponentOfType';
import getPassThrough, { PassTroughFunction } from '../../utils/getPassThrough';
import { FocusedInput, DateRange } from './types';
import { MonthType, MonthProps } from './Month';

export interface RangePickerProps {
  children: ReactNode;
  focusedInput: FocusedInput;
  highlighted?: DateRange;
  onChange(date: DateRange): void;
  onFocusedInputChange(focus?: FocusedInput): void;
  onHighlightedChange(date: DateRange): void;
  resetToWhenFromChanges: boolean;
  selected?: DateRange;
}

export interface RangePickerArgs {
  MonthsWrapper: ComponentClass<any>;
  Month: MonthType;
  passthrough: PassTroughFunction<RangePickerProps, 'MonthsWrapper'>;
}

export type RangePickerType = ComponentClass<RangePickerProps>;

export default function rangePickerFactory({
  MonthsWrapper,
  Month,
  passthrough,
}: RangePickerArgs): RangePickerType {
  const passProps = getPassThrough(passthrough);
  return class RangePicker extends Component<RangePickerProps, {}> {
    public static defaultProps = {
      onFocusedInputChange: () => {},
      onHighlightedChange: () => {},
    };

    private selecting = false;

    private handleDayClick = (clickedDate, event) => {
      const {
        focusedInput,
        onChange,
        onFocusedInputChange,
        onHighlightedChange,
        resetToWhenFromChanges,
        selected = {},
      } = this.props;

      if (resetToWhenFromChanges && focusedInput !== 'END_DATE') {
        onChange({ from: clickedDate, to: undefined });
        onFocusedInputChange('END_DATE');
        onHighlightedChange({ from: clickedDate, to: undefined });
        this.selecting = true;
        return undefined;
      }

      if (!selected.from && !selected.to) {
        if (focusedInput === 'END_DATE') {
          onChange({ to: clickedDate });
          onFocusedInputChange('START_DATE');
          onHighlightedChange({ to: clickedDate });
          this.selecting = true;
        } else {
          onChange({ from: clickedDate });
          onFocusedInputChange('END_DATE');
          onHighlightedChange({ from: clickedDate });
          this.selecting = true;
        }
      }

      if (selected.from && !selected.to) {
        if (
          focusedInput === 'START_DATE' ||
          isBefore(clickedDate, selected.from)
        ) {
          onChange({ from: clickedDate });
          onFocusedInputChange('END_DATE');
          onHighlightedChange({ from: clickedDate });
          this.selecting = true;
        } else {
          onChange({ from: selected.from, to: clickedDate });
          onFocusedInputChange(undefined);
          onHighlightedChange({});
          this.selecting = false;
        }
      }

      if (selected.to && !selected.from) {
        if (focusedInput === 'END_DATE') {
          onChange({ to: clickedDate });
          onFocusedInputChange('START_DATE');
          onHighlightedChange({ to: clickedDate });
          this.selecting = true;
        } else if (isAfter(clickedDate, selected.to)) {
          onChange({ from: clickedDate });
          onFocusedInputChange('END_DATE');
          onHighlightedChange({ from: clickedDate });
          this.selecting = true;
        } else {
          onChange({ from: clickedDate, to: selected.to });
          onFocusedInputChange(undefined);
          onHighlightedChange({});
          this.selecting = false;
        }
      }

      if (selected.to && selected.from) {
        if (focusedInput === 'START_DATE') {
          const to = isBefore(clickedDate, selected.to)
            ? selected.to
            : undefined;
          onChange({ from: clickedDate, to });
          onFocusedInputChange('END_DATE');
          onHighlightedChange({ from: clickedDate });
          this.selecting = true;
        } else if (focusedInput === 'END_DATE') {
          if (isAfter(clickedDate, selected.from)) {
            onChange({ from: selected.from, to: clickedDate });
            onFocusedInputChange(undefined);
            onHighlightedChange({});
            this.selecting = false;
          } else {
            onChange({ from: clickedDate });
            onFocusedInputChange('END_DATE');
            onHighlightedChange({ from: clickedDate });
            this.selecting = true;
          }
        } else if (isBefore(clickedDate, selected.to)) {
          onChange({ from: clickedDate, to: selected.to });
          onFocusedInputChange('END_DATE');
          onHighlightedChange({ from: clickedDate });
          this.selecting = true;
        } else {
          onChange({ from: selected.from, to: clickedDate });
          onFocusedInputChange(undefined);
          onHighlightedChange({});
          this.selecting = false;
        }
      }
    };

    private handleDayMouseEnter = (dateForDay, event) => {
      const { focusedInput, onHighlightedChange } = this.props;
      const { selected = {} } = this.props;

      if (this.selecting) {
        if (
          focusedInput === 'END_DATE' &&
          selected.from &&
          isAfter(dateForDay, selected.from)
        ) {
          onHighlightedChange({ from: selected.from, to: dateForDay });
        } else if (
          focusedInput === 'START_DATE' &&
          selected.to &&
          isBefore(dateForDay, selected.to)
        ) {
          onHighlightedChange({ from: dateForDay, to: selected.to });
        }
      }
    };

    private handleDayMouseLeave = (dateForDay, event) => {
      const { focusedInput, onHighlightedChange } = this.props;
      const { selected = {} } = this.props;

      if (this.selecting) {
        if (
          focusedInput === 'END_DATE' &&
          selected.from &&
          isAfter(dateForDay, selected.from)
        ) {
          onHighlightedChange({ from: selected.from, to: undefined });
        } else if (
          focusedInput === 'START_DATE' &&
          selected.to &&
          isBefore(dateForDay, selected.to)
        ) {
          onHighlightedChange({ from: undefined, to: selected.to });
        }
      }
    };

    private renderMonth = month =>
      cloneElement(month, {
        highlighted: this.props.highlighted,
        onDayClick: this.handleDayClick,
        onDayMouseEnter: this.handleDayMouseEnter,
        onDayMouseLeave: this.handleDayMouseLeave,
        selected: this.props.selected,
      });

    public render(): JSX.Element {
      const {
        children,
        focusedInput,
        onChange,
        selected,
        ...rest,
      } = this.props;

      return (
        <MonthsWrapper
          {...rest}
          {...passProps(this.props, 'MonthsWrapper', this)}
        >
          {Children.map(
            children,
            child =>
              isComponentOfType(Month, child)
                ? this.renderMonth(child as ReactElement<MonthProps>)
                : child,
          )}
        </MonthsWrapper>
      );
    }
  };
}
