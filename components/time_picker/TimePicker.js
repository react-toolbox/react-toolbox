import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import { TIME_PICKER } from '../identifiers.js';
import events from '../utils/events.js';
import time from '../utils/time.js';
import InjectDialog from '../dialog/Dialog.js';
import InjectInput from '../input/Input.js';
import timePickerDialogFactory from './TimePickerDialog.js';

const factory = (TimePickerDialog, Input) => {
  class TimePicker extends Component {
    static propTypes = {
      className: PropTypes.string,
      error: PropTypes.string,
      format: PropTypes.oneOf(['24hr', 'ampm']),
      inputClassName: PropTypes.string,
      label: PropTypes.string,
      name: PropTypes.string,
      onChange: PropTypes.func,
      theme: PropTypes.shape({
        input: PropTypes.string
      }),
      value: PropTypes.object
    };

    static defaultProps = {
      className: '',
      format: '24hr'
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
      const { value, format, inputClassName, theme } = this.props;
      const formattedTime = value ? time.formatTime(value, format) : '';
      return (
        <div data-react-toolbox='time-picker'>
          <Input
            className={classnames(theme.input, {[inputClassName]: inputClassName })}
            error={this.props.error}
            name={this.props.name}
            label={this.props.label}
            onMouseDown={this.handleInputMouseDown}
            readOnly
            type='text'
            value={formattedTime}
          />
          <TimePickerDialog
            active={this.state.active}
            className={this.props.className}
            name={this.props.name}
            format={format}
            onDismiss={this.handleDismiss}
            onSelect={this.handleSelect}
            theme={this.props.theme}
            value={this.props.value}
          />
        </div>
      );
    }
  }

  return TimePicker;
};

const TimePickerDialog = timePickerDialogFactory(InjectDialog);
const TimePicker = factory(TimePickerDialog, InjectInput);
export default themr(TIME_PICKER)(TimePicker);
export { factory as timePickerFactory };
export { TimePicker };
