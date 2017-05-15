import * as React from 'react';
import { addMonths } from 'date-fns';
import { map, range } from 'ramda';
import { createElement, PureComponent, Component, ComponentClass } from 'react';
import getPassThrough, { PassTroughFunction } from '../../utils/getPassThrough';
import { DateChecker, DateRange, FocusedInput, PickerDate, PickerMode } from './types';
import { RangePicker } from './RangePicker';
import { Month } from './Month';

export interface DatePickerProps {
  focusedInput: FocusedInput;
  highlighted?: PickerDate;
  isDayBlocked: DateChecker;
  isDayDisabled: DateChecker;
  locale: string | object;
  mode: PickerMode;
  numberOfMonths: number;
  onChange(date: DateRange): void;
  onDayClick(day: Date, event: React.MouseEvent<any>): void;
  onDayMouseEnter(day: Date, event: React.MouseEvent<any>): void;
  onDayMouseLeave(day: Date, event: React.MouseEvent<any>): void;
  onFocusedInputChange(focus?: FocusedInput): void;
  onHighlightedChange(date: DateRange): void;
  selected: PickerDate;
  sundayFirstDayOfWeek: boolean;
  viewDate: Date;
}

export interface DatePickerState {
  viewDate: Date;
}

export interface ArrowNodeProps {
  children: string;
  onClick(event: React.MouseEvent<any>): void;
}

export type DatePickerNodes =
  'NextNode' |
  'Month' |
  'PickerWrapper' |
  'PrevNode' |
  'SinglePicker' |
  'RangePicker';

export interface DatePickerArgs {
  Month: Month;
  NextNode: ComponentClass<ArrowNodeProps>;
  PickerWrapper: ComponentClass<any>;
  PrevNode: ComponentClass<ArrowNodeProps>;
  RangePicker: RangePicker;
  SinglePicker: ComponentClass<any>;
  passthrough: PassTroughFunction<DatePickerProps, DatePickerNodes>;
}

export default function datePickerFactory({
  Month,
  NextNode,
  PickerWrapper,
  PrevNode,
  RangePicker,
  SinglePicker,
  passthrough,
}: DatePickerArgs): ComponentClass<DatePickerProps> {
  const passProps = getPassThrough(passthrough);
  return class DatePicker extends PureComponent<DatePickerProps, DatePickerState> {
    public static defaultProps = {
      mode: 'RANGE',
      numberOfMonths: 2,
    } as DatePickerProps;

    public state = {
      viewDate: this.props.viewDate,
    };

    private changeViewDate = viewDate => {
      this.setState({ viewDate });
    }

    private handleNext = () => {
      const { viewDate } = this.state;
      this.changeViewDate(addMonths(viewDate, +1));
    }

    private handlePrev = () => {
      const { viewDate } = this.state;
      this.changeViewDate(addMonths(viewDate, -1));
    }

    private renderMonth = month => {
      const {
        highlighted,
        isDayBlocked,
        isDayDisabled,
        locale,
        onDayClick,
        onDayMouseEnter,
        onDayMouseLeave,
        sundayFirstDayOfWeek,
      } = this.props;
      const { viewDate } = this.state;
      const viewFullYear = viewDate.getFullYear();
      const viewMonth = viewDate.getMonth() + month;
      return (
        <Month
          {...passProps(this.props, 'Month', this)}
          isDayBlocked={isDayBlocked}
          isDayDisabled={isDayDisabled}
          key={`${viewFullYear}${viewMonth}`}
          locale={locale}
          onDayClick={onDayClick}
          onDayMouseEnter={onDayMouseEnter}
          onDayMouseLeave={onDayMouseLeave}
          sundayFirstDayOfWeek={sundayFirstDayOfWeek}
          viewDate={new Date(viewFullYear, viewMonth, 1)}
        />
      );
    }

    private renderPicker = () => {
      const {
        focusedInput,
        highlighted,
        mode,
        numberOfMonths,
        onChange,
        onFocusedInputChange,
        onHighlightedChange,
        selected,
      } = this.props;
      const Picker = mode === 'SINGLE' ? SinglePicker : RangePicker;
      const children = map(this.renderMonth, range(0, numberOfMonths));
      const props = mode === 'SINGLE'
        ? { ...passProps(this.props, 'SinglePicker', this) }
        : { ...passProps(this.props, 'RangePicker', this), focusedInput, onFocusedInputChange };

      return createElement(Picker, {
        ...props,
        highlighted,
        onChange,
        onHighlightedChange,
        selected,
      }, children);
    }

    public render() {
      const {
        focusedInput,
        isDayBlocked,
        isDayDisabled,
        locale,
        mode,
        numberOfMonths,
        onChange,
        selected,
        sundayFirstDayOfWeek,
        viewDate,
        ...rest,
      } = this.props;

      return (
        <PickerWrapper {...rest} {...passProps(this.props, 'PickerWrapper', this)}>
          <PrevNode
            {...passProps(this.props, 'PrevNode', this)}
            onClick={this.handlePrev}
          >
            {'<'}
          </PrevNode>
          <NextNode
            {...passProps(this.props, 'NextNode', this)}
            onClick={this.handleNext}
          >
            {'>'}
          </NextNode>
          {this.renderPicker()}
        </PickerWrapper>
      );
    }
  };
}
