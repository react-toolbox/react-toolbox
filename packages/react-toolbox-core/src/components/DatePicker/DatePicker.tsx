import * as React from 'react';
import { addMonths } from 'date-fns';
import { map, range } from 'ramda';
import { createElement, Component, ComponentClass } from 'react';
import getPassThrough, { PassTroughFunction } from '../../utils/getPassThrough';
import {
  DateChecker,
  DateRange,
  FocusedInput,
  PickerDate,
  PickerMode,
} from './types';
import { RangePickerType } from './RangePicker';
import { MonthType } from './Month';

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
  resetToWhenFromChanges: boolean;
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
  | 'NextNode'
  | 'Month'
  | 'PickerWrapper'
  | 'PrevNode'
  | 'SinglePicker'
  | 'RangePicker';

export interface DatePickerArgs {
  Month: MonthType;
  NextNode: ComponentClass<ArrowNodeProps>;
  PickerWrapper: ComponentClass<any>;
  PrevNode: ComponentClass<ArrowNodeProps>;
  RangePicker: RangePickerType;
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
  return class DatePicker extends Component<DatePickerProps, DatePickerState> {
    public static defaultProps = {
      mode: 'RANGE',
      numberOfMonths: 2,
    } as DatePickerProps;

    public state = {
      viewDate: this.props.viewDate,
    };

    private changeViewDate = viewDate => {
      this.setState({ viewDate });
    };

    private handleNext = () => {
      const { viewDate } = this.state;
      this.changeViewDate(addMonths(viewDate, +1));
    };

    private handlePrev = () => {
      const { viewDate } = this.state;
      this.changeViewDate(addMonths(viewDate, -1));
    };

    private renderMonth = month => {
      const {
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
      const monthViewDate = new Date(viewFullYear, viewMonth, 1);
      return (
        <Month
          {...passProps(this.props, 'Month', this)}
          isDayBlocked={isDayBlocked}
          isDayDisabled={isDayDisabled}
          key={monthViewDate.getTime().toString()}
          locale={locale}
          onDayClick={onDayClick}
          onDayMouseEnter={onDayMouseEnter}
          onDayMouseLeave={onDayMouseLeave}
          sundayFirstDayOfWeek={sundayFirstDayOfWeek}
          viewDate={monthViewDate}
        />
      );
    };

    private renderPicker = () => {
      const {
        focusedInput,
        highlighted,
        mode,
        numberOfMonths,
        onChange,
        onFocusedInputChange,
        onHighlightedChange,
        resetToWhenFromChanges,
        selected,
      } = this.props;
      const Picker = mode === 'SINGLE' ? SinglePicker : RangePicker;
      const children = map(this.renderMonth, range(0, numberOfMonths));
      const pickerTypeName = mode === 'SINGLE' ? 'SinglePicker' : 'RangePicker';
      const rangePickerProps = {
        focusedInput,
        onFocusedInputChange,
        resetToWhenFromChanges,
      };
      const pickerTypeProps = mode === 'SINGLE' ? {} : rangePickerProps;
      const baseProps = passProps(this.props, pickerTypeName, this);

      return createElement(
        Picker,
        {
          ...baseProps,
          ...pickerTypeProps,
          highlighted,
          onChange,
          onHighlightedChange,
          selected,
        },
        children,
      );
    };

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
        <PickerWrapper
          {...rest}
          {...passProps(this.props, 'PickerWrapper', this)}
        >
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
