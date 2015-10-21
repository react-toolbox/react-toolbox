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
    value: this.props.value
  };

  onTimeSelected = (newTime) => {
    this.refs.input.setValue(time.formatTime(newTime, this.props.format));
    this.setState({value: newTime});
  };

  openTimeDialog = (event) => {
    events.pauseEvent(event);
    this.refs.dialog.show();
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
          type='text'
          className={style.input}
          readOnly={true}
          onMouseDown={this.openTimeDialog}
          placeholder='Pick up time'
          value={this.formatTime()}
        />
        <TimeDialog
          ref='dialog'
          initialTime={this.state.value}
          format={this.props.format}
          onTimeSelected={this.onTimeSelected}
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

export default TimePicker;
