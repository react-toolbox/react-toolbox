import React from 'react';
import time from '../utils/time';
import style from './style';
import events from '../utils/events';
import Input from '../input';
import TimeDialog from './dialog';

class TimePicker extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    format: React.PropTypes.oneOf(['24hr', 'ampm']),
    onChange: React.PropTypes.func,
    value: React.PropTypes.object
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

  handleSelect = (value) => {
    if (this.props.onChange) this.props.onChange(value);
    this.setState({active: false});
  };

  render () {
    const { value, format } = this.props;
    const formattedTime = value ? time.formatTime(value, format) : null;
    return (
      <div data-react-toolbox='time-picker'>
        <Input
          className={style.input}
          onMouseDown={this.handleInputMouseDown}
          placeholder='Pick up time'
          readOnly={true}
          type='text'
          value={formattedTime}
        />
        <TimeDialog
          active={this.state.active}
          format={format}
          onDismiss={this.handleDismiss}
          onSelect={this.handleSelect}
          value={this.props.value}
        />
      </div>
    );
  }
}

export default TimePicker;
