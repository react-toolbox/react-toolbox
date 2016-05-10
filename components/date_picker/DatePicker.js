import React from 'react';
import classnames from 'classnames';
import DatePickerDialog from './DatePickerDialog';
import events from '../utils/events';
import Input from '../input';
import style from './style';
import time from '../utils/time';

class DatePicker extends React.Component {
  static propTypes = {
    autoOk: React.PropTypes.bool,
    className: React.PropTypes.string,
    error: React.PropTypes.string,
    icon: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.element
    ]),
    inputClassName: React.PropTypes.string,
    inputFormat: React.PropTypes.func,
    label: React.PropTypes.string,
    maxDate: React.PropTypes.object,
    minDate: React.PropTypes.object,
    onChange: React.PropTypes.func,
    value: React.PropTypes.oneOfType([
      React.PropTypes.instanceOf(Date),
      React.PropTypes.string
    ])
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
    const { inputClassName, value } = this.props;
    const inputFormat = this.props.inputFormat || time.formatDate;
    const date = Object.prototype.toString.call(value) === '[object Date]' ? value : undefined;
    const formattedDate = date === undefined ? '' : inputFormat(value);

    return (
      <div data-react-toolbox='date-picker'>
        <Input
          className={classnames(style.input, {[inputClassName]: inputClassName })}
          error={this.props.error}
          onMouseDown={this.handleInputMouseDown}
          label={this.props.label}
          readOnly
          type='text'
          icon={this.props.icon}
          value={formattedDate}
        />
        <DatePickerDialog
          autoOk={this.props.autoOk}
          active={this.state.active}
          className={this.props.className}
          maxDate={this.props.maxDate}
          minDate={this.props.minDate}
          onDismiss={this.handleDismiss}
          onSelect={this.handleSelect}
          value={date}
        />
      </div>
    );
  }
}

export default DatePicker;
