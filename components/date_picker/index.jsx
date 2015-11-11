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
          placeholder='Pick up date'
          readOnly={true}
          type='text'
          value={date}
        />
        <CalendarDialog
          active={this.state.active}
          onDismiss={this.handleDismiss}
          onSelect={this.handleSelect}
          value={this.props.value}
        />
      </div>
    );
  }
}

export default DatePicker;
