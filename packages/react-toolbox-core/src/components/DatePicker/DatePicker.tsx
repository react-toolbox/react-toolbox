import * as React from 'react';
import { createElement, PureComponent, PropTypes, Component, ComponentClass } from 'react';
import { map, range } from 'ramda';
import * as addMonths from 'date-fns/add_months';
import getPassThrough, { PassTroughFunction } from '../../utils/getPassThrough';
import { FocusedInput, DateRange, PickerDate, DateChecker } from './types';
import { SINGLE, RANGE, START_DATE, END_DATE } from './constants';
import { RangePicker } from './RangePicker';
import { Month } from './Month';

export interface DatePickerProps {
  focusedInput: FocusedInput,
  highlighted: PickerDate,
  isDayBlocked: DateChecker,
  isDayDisabled: DateChecker,
  locale: string | object,
  mode: 'SINGLE' | 'RANGE',
  numberOfMonths: number,
  onChange: (date: DateRange) => void,
  onFocusedInputChange: (focus?: FocusedInput) => void,
  onHighlightedChange: (date: DateRange) => void,
  selected: PickerDate,
  sundayFirstDayOfWeek: boolean,
  viewDate: Date,
};

export interface DatePickerState {
  viewDate: Date,
};

export interface ArrowNodeProps {
  children: string,
  onClick: (event: React.MouseEvent<any>) => void
};

export interface DatePickerArgs {
  Month: Month,
  NextNode: ComponentClass<ArrowNodeProps>,
  PickerWrapper: ComponentClass<any>,
  PrevNode: ComponentClass<ArrowNodeProps>,
  RangePicker: RangePicker,
  SinglePicker: ComponentClass<any>,
  passthrough: PassTroughFunction<DatePickerProps, 'SinglePicker' | 'RangePicker'>
};

export type DatePicker = ComponentClass<DatePickerProps>;

const datePickerFactory = ({ Month, NextNode, PickerWrapper, PrevNode, RangePicker, SinglePicker, passthrough }): DatePicker => {
  const passProps = getPassThrough(passthrough);
  return class DatePicker extends PureComponent<DatePickerProps, DatePickerState> {
    static defaultProps = {
      mode: 'RANGE',
      numberOfMonths: 2,
    } as DatePickerProps;

    state = {
      viewDate: this.props.viewDate,
    };

    changeViewDate = viewDate => {
      this.setState({ viewDate });
    };

    handleNext = () => {
      const { viewDate } = this.state;
      this.changeViewDate(addMonths(viewDate, +1));
    };

    handlePrev = () => {
      const { viewDate } = this.state;
      this.changeViewDate(addMonths(viewDate, -1));
    };

    renderMonth = month => {
      const {
        isDayBlocked,
        isDayDisabled,
        locale,
        sundayFirstDayOfWeek,
      } = this.props;
      const { viewDate } = this.state;
      const viewFullYear = viewDate.getFullYear();
      const viewMonth = viewDate.getMonth() + month;
      return (
        <Month
          {...passProps(this.props, 'Month', this)}
          key={`${viewFullYear}${viewMonth}`}
          isDayBlocked={isDayBlocked}
          isDayDisabled={isDayDisabled}
          locale={locale}
          sundayFirstDayOfWeek={sundayFirstDayOfWeek}
          viewDate={new Date(viewFullYear, viewMonth, 1)}
        />
      );
    };

    renderPicker = () => {
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
      const Picker = mode === SINGLE ? SinglePicker : RangePicker;
      const children = map(this.renderMonth, range(0, numberOfMonths));
      const props = mode === SINGLE
        ? { ...passProps(this.props, 'SinglePicker', this) }
        : { ...passProps(this.props, 'RangePicker', this), focusedInput, onFocusedInputChange };

      return createElement(Picker, {
        ...props,
        highlighted,
        onChange,
        onHighlightedChange,
        selected,
      }, children);
    };

    render() {
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
        ...rest
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
  }
};

export default datePickerFactory;
