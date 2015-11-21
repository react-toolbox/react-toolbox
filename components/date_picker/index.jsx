import React from 'react';
import CalendarDialog from './dialog';
import events from '../utils/events';
import Input from '../input';
import style from './style';
import time from '../utils/time';

class DatePicker extends React.Component {
  static propTypes = {
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

  handleSelect = (value) => {
    if (this.props.onChange) this.props.onChange(value);
    this.setState({active: false});
  };

  render () {
    const { value } = this.props;
    const date = value ? `${value.getDate()} ${time.getFullMonth(value)} ${value.getFullYear()}` : null;

    return (
      <div data-toolbox='date-picker'>
        <Input
          className={style.input}
          onMouseDown={this.handleInputMouseDown}
          label={this.props.label}
          readOnly={true}
          type='text'
          value={date}
        />
        <CalendarDialog
          active={this.state.active}
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
