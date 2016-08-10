import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import { DATE_PICKER } from '../identifiers.js';
import events from '../utils/events.js';
import time from '../utils/time.js';

import InjectIconButton from '../button/IconButton.js';
import InjectInput from '../input/Input.js';
import InjectDialog from '../dialog/Dialog.js';
import calendarFactory from './Calendar.js';
import datePickerDialogFactory from './DatePickerDialog.js';

const factory = (Input, DatePickerDialog) => {
  class DatePicker extends Component {
    static propTypes = {
      active: PropTypes.bool,
      autoOk: PropTypes.bool,
      className: PropTypes.string,
      error: PropTypes.string,
      icon: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
      ]),
      inputClassName: PropTypes.string,
      inputFormat: PropTypes.func,
      label: PropTypes.string,
      locale: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.object
      ]),
      maxDate: PropTypes.object,
      minDate: PropTypes.object,
      monthFirst: PropTypes.bool,
      name: PropTypes.string,
      onChange: PropTypes.func,
      onEscKeyDown: PropTypes.func,
      onKeyPress: PropTypes.func,
      onOverlayClick: PropTypes.func,
      readonly: PropTypes.bool,
      sundayFirstDayOfWeek: React.PropTypes.bool,
      theme: PropTypes.shape({
        input: PropTypes.string
      }),
      value: PropTypes.oneOfType([
        PropTypes.instanceOf(Date),
        PropTypes.string
      ])
    };

    static defaultProps = {
      active: false,
      locale: 'en',
      sundayFirstDayOfWeek: false,
      readonly: false
    };

    state = {
      active: this.props.active,
      value: Object.prototype.toString.call(this.props.value) === '[object Date]' ? this.props.value : ''
    };

    componentWillReceiveProps (nextProps) {
      if (this.state.active !== nextProps.active) {
        this.setState({ active: nextProps.active });
      }

      if (this.props.value !== nextProps.value) {
        this.setState({
          value: Object.prototype.toString.call(nextProps.value) === '[object Date]' ? nextProps.value : ''
        });
      }
    }

    handleDismiss = () => {
      this.setState({active: false});
    };

    handleInputMouseDown = (event) => {
      events.pauseEvent(event);
      this.setState({active: true});
    };

    handleInputKeyPress = (event) => {
      if (event.charCode === 13) {
        events.pauseEvent(event);
        this.setState({active: true});
      }
      if (this.props.onKeyPress) this.props.onKeyPress(event);
    };

    handleSelect = (value, event) => {
      if (this.props.onChange) this.props.onChange(value, event);
      this.setState({active: false});
    };

    handleInputChange = (value) => {
      this.setState({
        value
      });
    }

    formatInputText = (value, monthFirst) => {
      const _value = monthFirst ? this.formatMonthFirstDate(value) : value;

      if (this.isValidDate(_value)) {
        const seperator = this.getSeparator(_value);
        const dateSplit = _value.split(seperator);

        return new Date(dateSplit[2], parseInt(dateSplit[1], 10) - 1, dateSplit[0]);
      }

      return value;
    }

    isValidDate = (dateString) => {
      // checks for format DD/MM/YY or DD-MM-YYYY or DD.MM.YYYY
      const regexDate = /(^(((0[1-9]|1[0-9]|2[0-8])(\/|-|\.)(0[1-9]|1[012]))|((29|30|31)(\/|-|\.)(0[13578]|1[02]))|((29|30)(\/|-|\.)(0[4,6,9]|11)))(\/|-|\.)(19|[2-9][0-9])\d\d$)|(^29(\/|-|\.)02(\/|-|\.)(19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$)/;
      return regexDate.test(dateString);
    }

    formatMonthFirstDate = (dateString) => {
      // Changes MM/DD/YYYY to DD/MM/YYYY
      const seperator = this.getSeparator(dateString);
      const dateSplit = dateString.split(seperator);
      return dateSplit[1] + seperator + dateSplit[0] + seperator + dateSplit[2];
    }

    getSeparator = (string) => {
      if (string.indexOf('/') !== -1) return '/';
      if (string.indexOf('-') !== -1) return '-';
      if (string.indexOf('.') !== -1) return '.';
      return '';
    }

    getErrorMessage = (date, monthFirst) => {
      if (!date || Object.prototype.toString.call(date) === '[object Date]') return '';
      const s = this.getSeparator(date) || '/';
      if (monthFirst) {
        return `Please enter date in MM${s}DD${s}YYYY format`;
      }
      return `Please enter date in DD${s}MM${s}YYYY format`;
    }

    render () {
      const { active, // eslint-disable-line
        autoOk, inputClassName, inputFormat, locale, maxDate, minDate, monthFirst,
        onEscKeyDown, onOverlayClick, readonly, sundayFirstDayOfWeek, value,
        ...others } = this.props;

      const finalInputFormat = inputFormat || time.formatDate;
      const date = Object.prototype.toString.call(value) === '[object Date]' ? value : undefined;
      const inputDate = Object.prototype.toString.call(this.state.value) === '[object Date]' ? this.state.value : this.formatInputText(this.state.value, monthFirst);
      const formattedDate = Object.prototype.toString.call(inputDate) === '[object Date]' ? finalInputFormat(inputDate, locale) : this.state.value;
      const errorMessage = this.getErrorMessage(inputDate, monthFirst);

      return (
        <div data-react-toolbox='date-picker'>
          <Input
            {...others}
            className={classnames(this.props.theme.input, {[inputClassName]: inputClassName })}
            disabled={readonly}
            error={this.props.error || errorMessage}
            icon={this.props.icon}
            label={this.props.label}
            name={this.props.name}
            onKeyPress={this.handleInputKeyPress}
            onMouseDown={this.handleInputMouseDown}
            onChange={this.handleInputChange}
            type='text'
            value={formattedDate}
          />
          <DatePickerDialog
            active={this.state.active}
            autoOk={autoOk}
            className={this.props.className}
            locale={locale}
            maxDate={maxDate}
            minDate={minDate}
            name={this.props.name}
            onDismiss={this.handleDismiss}
            onEscKeyDown={onEscKeyDown || this.handleDismiss}
            onOverlayClick={onOverlayClick || this.handleDismiss}
            onSelect={this.handleSelect}
            sundayFirstDayOfWeek={sundayFirstDayOfWeek}
            theme={this.props.theme}
            value={date}
          />
        </div>
      );
    }
  }

  return DatePicker;
};

const Calendar = calendarFactory(InjectIconButton);
const DatePickerDialog = datePickerDialogFactory(InjectDialog, Calendar);
const DatePicker = factory(InjectInput, DatePickerDialog);

export default themr(DATE_PICKER)(DatePicker);
export {
  DatePickerDialog as DatePickerDialog,
  factory as datePickerFactory
};
export { DatePicker };
