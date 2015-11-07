import React from 'react';
import CalendarDialog from './dialog';
import Input from '../input';
import events from '../utils/events';
import time from '../utils/time';
import style from './style';

class DatePicker extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    value: React.PropTypes.object
  };

  static defaultProps = {
    className: ''
  };

  state = {
    value: this.props.value
  };

  handleDateSelected = (value) => {
    this.refs.input.setValue(this.formatDate(value));
    this.setState({value});
  };

  handleMouseDown = (event) => {
    events.pauseEvent(event);
    this.refs.dialog.show();
  };

  formatDate (date) {
    return `${date.getDate()} ${time.getFullMonth(date)} ${date.getFullYear()}`;
  }

  render () {
    return (
      <div data-toolbox='date-picker'>
        <Input
          ref='input'
          className={style.input}
          onMouseDown={this.handleMouseDown}
          placeholder='Pick up date'
          readOnly={true}
          type='text'
          value={this.state.value ? this.formatDate(this.state.value) : null}
        />
        <CalendarDialog
          ref='dialog'
          initialDate={this.state.value}
          onDateSelected={this.handleDateSelected}
        />
      </div>
    );
  }

  getValue () {
    return this.state.value;
  }

  setValue (value) {
    this.setState({value});
  }
}

export default DatePicker;
