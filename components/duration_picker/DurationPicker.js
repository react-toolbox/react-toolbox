import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import { TIME_PICKER } from '../identifiers';
import events from '../utils/events';
import time from '../utils/time';
import InjectDialog from '../dialog/Dialog';
import InjectInput from '../input/Input';
import durationPickerDialogFactory from './DurationPickerDialog';

const factory = (DurationPickerDialog, Input) => {
  class DurationPicker extends Component {
    static propTypes = {
      active: PropTypes.bool,
      cancelLabel: PropTypes.string,
      className: PropTypes.string,
      duration: PropTypes.number,
      error: PropTypes.string,
      format: PropTypes.oneOf(['24hr', 'ampm']),
      inputClassName: PropTypes.string,
      label: PropTypes.string,
      maxDuration: PropTypes.number,
      minDuration: PropTypes.number,
      name: PropTypes.string,
      okLabel: PropTypes.string,
      onChange: PropTypes.func,
      onClick: PropTypes.func,
      onDismiss: PropTypes.func,
      onEscKeyDown: PropTypes.func,
      onKeyPress: PropTypes.func,
      onOverlayClick: PropTypes.func,
      readonly: PropTypes.bool,
      startTime: PropTypes.instanceOf(Date),
      step: PropTypes.number,
      theme: PropTypes.shape({
        container: PropTypes.string,
        input: PropTypes.string,
      }),
    };

    static defaultProps = {
      active: false,
      className: '',
      format: '24hr',
    };

    state = {
      active: this.props.active,
    };

    componentWillReceiveProps(nextProps) {
      if (nextProps.active !== this.props.active && this.state.active !== nextProps.active) {
        this.setState({ active: nextProps.active });
      }
    }

    handleDismiss = () => {
      this.setState({ active: false });
      if (this.props.onDismiss) {
        this.props.onDismiss();
      }
    };

    handleInputFocus = (event) => {
      events.pauseEvent(event);
      this.setState({ active: true });
    };

    handleInputBlur = (event) => {
      events.pauseEvent(event);
      this.setState({ active: false });
    };

    handleInputClick = (event) => {
      if (this.props.startTime) {
        events.pauseEvent(event);
        this.setState({ active: true });
        if (this.props.onClick) this.props.onClick(event);
      }
    };

    handleInputKeyPress = (event) => {
      if (event.charCode === 13) {
        events.pauseEvent(event);
        this.setState({ active: true });
      }
      if (this.props.onKeyPress) this.props.onKeyPress(event);
    };

    handleSelect = (value, event) => {
      if (this.props.onChange) this.props.onChange(value, event);
      this.setState({ active: false });
    };

    render() {
      const {
        active, onDismiss, // eslint-disable-line
        cancelLabel, format, inputClassName, okLabel, onEscKeyDown, onOverlayClick,
        readonly, startTime, step, minDuration, maxDuration, duration, ...others
      } = this.props;
      let inputDisplay = '';
      if (startTime) {
        const endTime = new Date(startTime.getTime());
        endTime.setMinutes(startTime.getMinutes() + this.props.duration || this.props.minDuration);
        if (startTime && duration) {
          inputDisplay = `${duration} min (${time.formatTime(endTime, format)})`;
        }
      }
      return (
        <div data-react-toolbox="time-picker" className={this.props.theme.container}>
          <Input
            {...others}
            className={classnames(this.props.theme.input, { [inputClassName]: inputClassName })}
            disabled={readonly}
            error={this.props.error}
            label={this.props.label}
            name={this.props.name}
            onKeyPress={this.handleInputKeyPress}
            onClick={this.handleInputClick}
            readOnly
            type="text"
            value={inputDisplay}
          />
          <DurationPickerDialog
            active={this.state.active}
            cancelLabel={cancelLabel}
            className={this.props.className}
            duration={this.props.duration || this.props.minDuration}
            format={format}
            maxDuration={this.props.maxDuration}
            minDuration={this.props.minDuration}
            name={this.props.name}
            okLabel={okLabel}
            onDismiss={this.handleDismiss}
            onEscKeyDown={onEscKeyDown}
            onOverlayClick={onOverlayClick}
            onSelect={this.handleSelect}
            theme={this.props.theme}
            startTime={this.props.startTime}
            step={this.props.step}
          />
        </div>
      );
    }
  }

  return DurationPicker;
};

const DurationPickerDialog = durationPickerDialogFactory(InjectDialog);
const DurationPicker = factory(DurationPickerDialog, InjectInput);
export default themr(TIME_PICKER)(DurationPicker);
export { factory as durationPickerFactory };
export { DurationPicker };
