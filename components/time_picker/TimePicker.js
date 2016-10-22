import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import { TIME_PICKER } from '../identifiers.js';
import events from '../utils/events.js';
import time from '../utils/time.js';
import InjectDialog from '../dialog/Dialog.js';
import InjectInput from '../input/Input.js';
import timePickerDialogFactory from './TimePickerDialog.js';

const factory = (TimePickerDialog, Input) => {
  class TimePicker extends Component {
    static propTypes = {
      active: PropTypes.bool,
      cancelLabel: PropTypes.string,
      className: PropTypes.string,
      error: PropTypes.string,
      format: PropTypes.oneOf(['24hr', 'ampm']),
      inputClassName: PropTypes.string,
      label: PropTypes.string,
      name: PropTypes.string,
      okLabel: PropTypes.string,
      onChange: PropTypes.func,
      onClick: PropTypes.func,
      onDismiss: PropTypes.func,
      onEscKeyDown: PropTypes.func,
      onKeyPress: PropTypes.func,
      onOverlayClick: PropTypes.func,
      readonly: PropTypes.bool,
      theme: PropTypes.shape({
        input: PropTypes.string
      }),
      value: PropTypes.object
    };

    static defaultProps = {
      active: false,
      className: '',
      format: '24hr'
    };

    state = {
      active: this.props.active
    };

    componentWillReceiveProps (nextProps) {
      if (this.state.active !== nextProps.active) {
        this.setState({ active: nextProps.active });
      }
    }

    handleDismiss = () => {
      this.setState({active: false});
      if (this.props.onDismiss) {
        this.props.onDismiss();
      }
    };

    handleInputFocus = (event) => {
      events.pauseEvent(event);
      this.setState({active: true});
    };

    handleInputBlur = (event) => {
      events.pauseEvent(event);
      this.setState({active: false});
    };

    handleInputClick = (event) => {
      events.pauseEvent(event);
      this.setState({active: true});
      if (this.props.onClick) this.props.onClick(event);
    };

    handleInputKeyPress = (event) => {
      if (event.charCode === 13) {
        events.pauseEvent(event);
        this.setState({active: true});
      }
      if (this.props.onKeyPress) this.props.onKeyPress(event);
    };

    handleSelect = (value, event) => {
      if (this.props.onChange) this.props.onChange(value, event);
      this.setState({active: false});
    };

    render () {
      const {
        active, onDismiss, // eslint-disable-line
        cancelLabel, format, inputClassName, okLabel, onEscKeyDown, onOverlayClick,
        readonly, value, ...others
      } = this.props;
      const formattedTime = value ? time.formatTime(value, format) : '';
      return (
        <div data-react-toolbox='time-picker'>
          <Input
            {...others}
            className={classnames(this.props.theme.input, {[inputClassName]: inputClassName })}
            disabled={readonly}
            error={this.props.error}
            label={this.props.label}
            name={this.props.name}
            onKeyPress={this.handleInputKeyPress}
            onClick={this.handleInputClick}
            readOnly
            type='text'
            value={formattedTime}
          />
          <TimePickerDialog
            active={this.state.active}
            cancelLabel={cancelLabel}
            className={this.props.className}
            format={format}
            name={this.props.name}
            okLabel={okLabel}
            onDismiss={this.handleDismiss}
            onEscKeyDown={onEscKeyDown}
            onOverlayClick={onOverlayClick}
            onSelect={this.handleSelect}
            theme={this.props.theme}
            value={this.props.value}
          />
        </div>
      );
    }
  }

  return TimePicker;
};

const TimePickerDialog = timePickerDialogFactory(InjectDialog);
const TimePicker = factory(TimePickerDialog, InjectInput);
export default themr(TIME_PICKER)(TimePicker);
export { factory as timePickerFactory };
export { TimePicker };
