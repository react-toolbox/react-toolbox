import React from 'react';
import autobind from 'autobind-decorator';
import style from './style';
import time from '../utils/time';
import events from '../utils/events';
import CalendarDialog from './dialog';
import Input from '../input';

@autobind
export default class DatePicker extends React.Component {
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

  openCalendarDialog (event) {
    events.pauseEvent(event);
    this.refs.dialog.show();
  }

  onDateSelected (value) {
    this.refs.input.setValue(this.formatDate(value));
    this.setState({value: value});
  }

  formatDate (date) {
    return `${date.getDate()} ${time.getFullMonth(date)} ${date.getFullYear()}`;
  }

  render () {
    return (
      <div data-toolbox='date-picker'>
        <Input
          ref='input'
          type='text'
          readOnly={true}
          className={style.input}
          onMouseDown={this.openCalendarDialog}
          placeholder='Pick up date'
          value={this.state.value ? this.formatDate(this.state.value) : null}
        />
        <CalendarDialog
          ref='dialog'
          initialDate={this.state.value}
          onDateSelected={this.onDateSelected}
        />
      </div>
    );
  }

  getValue () {
    return this.state.value;
  }

  setValue (value) {
    this.setState({value: value});
  }
}
