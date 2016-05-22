import React from 'react';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import events from '../utils/events';
import time from '../utils/time';
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
    theme: React.PropTypes.shape({
      input: React.PropTypes.string.isRequired
    }),
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
    const { value, format, inputClassName, theme } = this.props;
    const formattedTime = value ? time.formatTime(value, format) : '';
    return (
      <div data-react-toolbox='time-picker'>
        <Input
          className={classnames(theme.input, {[inputClassName]: inputClassName })}
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
          theme={this.props.theme}
          value={this.props.value}
        />
      </div>
    );
  }
}

export default themr('ToolboxTimePicker')(TimePicker);
