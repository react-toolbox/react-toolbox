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
      sundayFirstDayOfWeek: false
    };

    state = {
      active: this.props.active
    };

    componentWillReceiveProps (nextProps) {
      if (this.state.active !== nextProps.active) {
        this.setState({ active: nextProps.active });
      }
    }

    handleDismiss = () => {
      this.setState({active: false});
    };

    handleInputFocus = (event) => {
      events.pauseEvent(event);
      this.setState({active: true});
    };

    handleInputBlur = (event) => {
      events.pauseEvent(event);
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

    render () {
      const { active, // eslint-disable-line
        autoOk, inputClassName, inputFormat, locale, maxDate, minDate,
        onEscKeyDown, onOverlayClick, readonly, sundayFirstDayOfWeek, value,
        ...others } = this.props;
      const finalInputFormat = inputFormat || time.formatDate;
      const date = Object.prototype.toString.call(value) === '[object Date]' ? value : undefined;
      const formattedDate = date === undefined ? '' : finalInputFormat(value, locale);

      return (
        <div data-react-toolbox='date-picker'>
          <Input
            {...others}
            className={classnames(this.props.theme.input, {[inputClassName]: inputClassName })}
            disabled={readonly}
            error={this.props.error}
            icon={this.props.icon}
            label={this.props.label}
            name={this.props.name}
            onFocus={this.handleInputFocus}
            onKeyPress={this.handleInputKeyPress}
            onMouseDown={this.handleInputMouseDown}
            readOnly
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
