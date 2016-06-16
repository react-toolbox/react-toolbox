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
      maxDate: PropTypes.object,
      minDate: PropTypes.object,
      name: PropTypes.string,
      onChange: PropTypes.func,
      theme: PropTypes.shape({
        input: PropTypes.string
      }),
      value: PropTypes.oneOfType([
        PropTypes.instanceOf(Date),
        PropTypes.string
      ])
    };

    state = {
      active: false
    };

    handleDismiss = () => {
      this.setState({active: false});
    };

    handleInputMouseDown = (event) => {
      events.pauseEvent(event);
      this.setState({active: true});
    };

    handleSelect = (value, event) => {
      if (this.props.onChange) this.props.onChange(value, event);
      this.setState({active: false});
    };

    render () {
      const { inputClassName, value } = this.props;
      const inputFormat = this.props.inputFormat || time.formatDate;
      const date = Object.prototype.toString.call(value) === '[object Date]' ? value : undefined;
      const formattedDate = date === undefined ? '' : inputFormat(value);

      return (
        <div data-react-toolbox='date-picker'>
          <Input
            className={classnames(this.props.theme.input, {[inputClassName]: inputClassName })}
            error={this.props.error}
            onMouseDown={this.handleInputMouseDown}
            name={this.props.name}
            label={this.props.label}
            readOnly
            type='text'
            icon={this.props.icon}
            value={formattedDate}
          />
          <DatePickerDialog
            autoOk={this.props.autoOk}
            active={this.state.active}
            className={this.props.className}
            name={this.props.name}
            maxDate={this.props.maxDate}
            minDate={this.props.minDate}
            onDismiss={this.handleDismiss}
            onSelect={this.handleSelect}
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
export { factory as datePickerFactory };
export { DatePicker };
