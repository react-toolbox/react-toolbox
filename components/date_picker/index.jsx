import React from 'react';
import CalendarDialog from './dialog';
import Input from '../input';
import events from '../utils/events';
import time from '../utils/time';
import style from './style';

class DatePicker extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    onChange: React.PropTypes.func,
    value: React.PropTypes.object
  };

  static defaultProps = {
    className: ''
  };

  state = {
    value: this.props.value,
    dialog: false
  };

  handleCalendarCancel = () => {
    this.setState({dialog: false});
  };

  handleCalendarChange = (value) => {
    this.setState({dialog: false, value: value});
    if (this.props.onChange) this.props.onChange(value);
  };

  handleMouseDown = (event) => {
    events.pauseEvent(event);
    this.setState({dialog: true});
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
          active={this.state.dialog}
          initialDate={this.state.value}
          onCancel={this.handleCalendarCancel}
          onChange={this.handleCalendarChange}
          onSelect={this.handleCalendarChange}
        />
      </div>
    );
  }
}

export default DatePicker;
