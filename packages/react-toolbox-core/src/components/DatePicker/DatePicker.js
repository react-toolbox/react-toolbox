import React, { createElement, PureComponent, PropTypes } from 'react';
import map from 'ramda/src/map';
import range from 'ramda/src/range';
import addMonths from 'date-fns/add_months';
import getPassThrough from '../../utils/getPassThrough';
import { SINGLE, RANGE, START_DATE, END_DATE } from './constants';
import dateShape from './dateShape';

const datePickerFactory = ({
  Month,
  NextNode,
  PickerWrapper,
  PrevNode,
  RangePicker,
  SinglePicker,
  passthrough,
}) => {
  const passProps = getPassThrough(passthrough);
  class DatePicker extends PureComponent {
    static propTypes = {
      focusedInput: PropTypes.oneOf([START_DATE, END_DATE]),
      isDayBlocked: PropTypes.func,
      isDayDisabled: PropTypes.func,
      locale: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
      mode: PropTypes.oneOf([SINGLE, RANGE]),
      numberOfMonths: PropTypes.number,
      onChange: PropTypes.func,
      onFocusedInputChange: PropTypes.func,
      onHighlightedChange: PropTypes.func,
      selected: dateShape,
      sundayFirstDayOfWeek: PropTypes.bool,
      viewDate: PropTypes.instanceOf(Date),
    };

    static defaultProps = {
      mode: RANGE,
      numberOfMonths: 2,
    };

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
          {...passProps(this.props, 'Month')}
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
        ? { ...passProps(this.props, 'SinglePicker') }
        : {
            ...passProps(this.props, 'RangePicker'),
            focusedInput,
            onFocusedInputChange,
          };

      return createElement(
        Picker,
        {
          ...props,
          highlighted,
          onChange,
          onHighlightedChange,
          selected,
        },
        children
      );
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
        <PickerWrapper {...rest} {...passProps(this.props, 'PickerWrapper')}>
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

  return DatePicker;
};

export default datePickerFactory;
