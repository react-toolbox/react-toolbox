import React from 'react';
import time from '../utils/time';
import style from './style';
import events from '../utils/events';
import Input from '../input';
import TimeDialog from './dialog';

class TimePicker extends React.Component {
  static propTypes = {
    format: React.PropTypes.oneOf(['24hr', 'ampm']),
    value: React.PropTypes.object
  };

  static defaultProps = {
    format: '24hr'
  };

  state = {
    value: this.props.value,
    dialog: false
  };

  handleTimeCancel = () => {
    this.setState({dialog: false});
  };

  handleTimeChange = (value) => {
    this.setState({dialog: false, value: value});
    if (this.props.onChange) this.props.onChange(value);
  };

  handleMouseDown = (event) => {
    events.pauseEvent(event);
    this.setState({dialog: true});
  };

  formatTime () {
    if (this.state.value) {
      return time.formatTime(this.state.value, this.props.format);
    }
  }

  render () {
    return (
      <div data-react-toolbox='time-picker'>
        <Input
          ref='input'
          className={style.input}
          onMouseDown={this.handleMouseDown}
          placeholder='Pick up time'
          readOnly={true}
          type='text'
          value={this.formatTime()}
        />
        <TimeDialog
          ref='dialog'
          active={this.state.dialog}
          format={this.props.format}
          initialTime={this.state.value}
          onCancel={this.handleTimeCancel}
          onSelect={this.handleTimeChange}
        />
      </div>
    );
  }
}

export default TimePicker;
