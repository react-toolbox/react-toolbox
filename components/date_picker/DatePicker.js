import React from 'react';
import classnames from 'classnames';
import DatePickerDialog from './DatePickerDialog';
import events from '../utils/events';
import Input from '../input';
import style from './style';
import time from '../utils/time';

class DatePicker extends React.Component {
  static propTypes = {
    autoOk: React.PropTypes.bool,
    className: React.PropTypes.string,
    error: React.PropTypes.string,
    inputClassName: React.PropTypes.string,
    inputFormat: React.PropTypes.func,
    label: React.PropTypes.string,
    maxDate: React.PropTypes.object,
    minDate: React.PropTypes.object,
    onChange: React.PropTypes.func,
    value: React.PropTypes.object
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
    const date = value ? inputFormat(value) : null;

    return (
      <div data-react-toolbox='date-picker'>
        <Input
          className={classnames(style.input, {[inputClassName]: inputClassName })}
          error={this.props.error}
          onMouseDown={this.handleInputMouseDown}
          label={this.props.label}
          readOnly
          type='text'
          value={date}
        />
        <DatePickerDialog
          autoOk={this.props.autoOk}
          active={this.state.active}
          className={this.props.className}
          maxDate={this.props.maxDate}
          minDate={this.props.minDate}
          onDismiss={this.handleDismiss}
          onSelect={this.handleSelect}
          value={this.props.value}
        />
      </div>
    );
  }
}

export default DatePicker;
