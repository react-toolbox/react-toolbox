import React from 'react';
import classnames from 'classnames';
import events from '../utils/events';
import time from '../utils/time';
import style from './style';
import Input from '../input';
import TimePickerDialog from './TimePickerDialog';

class TimePicker extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    error: React.PropTypes.string,
    format: React.PropTypes.oneOf(['24hr', 'ampm']),
    inputClassName: React.PropTypes.string,
    label: React.PropTypes.string,
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

  handleSelect = (value, event) => {
    if (this.props.onChange) this.props.onChange(value, event);
    this.setState({active: false});
  };

  render () {
    const { value, format, inputClassName } = this.props;
    const formattedTime = value ? time.formatTime(value, format) : null;
    return (
      <div data-react-toolbox='time-picker'>
        <Input
          className={classnames(style.input, {[inputClassName]: inputClassName })}
          error={this.props.error}
          label={this.props.label}
          onMouseDown={this.handleInputMouseDown}
          readOnly
          type='text'
          value={formattedTime}
        />
        <TimePickerDialog
          active={this.state.active}
          className={this.props.className}
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
