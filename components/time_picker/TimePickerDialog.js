import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import time from '../utils/time';
import Clock from './Clock';

const factory = (Dialog) => {
  class TimePickerDialog extends Component {
    static propTypes = {
      active: PropTypes.bool,
      cancelLabel: PropTypes.string,
      className: PropTypes.string,
      format: PropTypes.oneOf(['24hr', 'ampm']),
      name: PropTypes.string,
      okLabel: PropTypes.string,
      onDismiss: PropTypes.func,
      onEscKeyDown: PropTypes.func,
      onOverlayClick: PropTypes.func,
      onSelect: PropTypes.func,
      theme: PropTypes.shape({
        am: PropTypes.string,
        amFormat: PropTypes.string,
        ampm: PropTypes.string,
        button: PropTypes.string,
        dialog: PropTypes.string,
        header: PropTypes.string,
        hours: PropTypes.string,
        hoursDisplay: PropTypes.string,
        minutes: PropTypes.string,
        minutesDisplay: PropTypes.string,
        pm: PropTypes.string,
        pmFormat: PropTypes.string,
        separator: PropTypes.string,
      }),
      value: PropTypes.instanceOf(Date),
    };

    static defaultProps = {
      active: false,
      cancelLabel: 'Cancel',
      format: '24hr',
      okLabel: 'Ok',
      value: new Date(),
    };

    state = {
      display: 'hours',
      displayTime: new Date(this.props.value.getTime()),
    };

    actions = [{
      label: this.props.cancelLabel,
      className: this.props.theme.button,
      onClick: this.props.onDismiss,
    }, {
      label: this.props.okLabel,
      className: this.props.theme.button,
      name: this.props.name,
      onClick: this.handleSelect,
    }];

    componentWillReceiveProps(nextProps) {
      if (nextProps.value.getTime() !== this.state.displayTime.getTime()) {
        this.setState({ displayTime: new Date(nextProps.value.getTime()) });
      }
    }

    updateRefAndCalculateHandleShape = (node) => {
      this.clockNode = node;
      if (this.props.active) {
        this.clockNode.handleCalculateShape();
      }
    }

    handleClockChange = (value) => {
      this.setState({ displayTime: value });
    };

    handleSelect = (event) => {
      this.props.onSelect(this.state.displayTime, event);
    };

    toggleTimeMode = () => {
      this.setState(state => ({
        displayTime: time.toggleTimeMode(state.displayTime),
      }));
    };

    handleHandMoved = () => {
      if (this.state.display === 'hours') this.setState({ display: 'minutes' });
    };

    switchDisplay = (event) => {
      this.setState({ display: event.target.id });
    };

    formatHours() {
      if (this.props.format === 'ampm') {
        return this.state.displayTime.getHours() % 12 || 12;
      }
      return this.state.displayTime.getHours();
    }

    renderAMPMLabels() {
      const { theme } = this.props;
      if (this.props.format !== 'ampm') return undefined;
      return (
        <div className={theme.ampm}>
          <span className={theme.am} onClick={this.toggleTimeMode}>AM</span>
          <span className={theme.pm} onClick={this.toggleTimeMode}>PM</span>
        </div>
      );
    }

    render() {
      const { theme } = this.props;
      const display = `${this.state.display}Display`;
      const format = `${time.getTimeMode(this.state.displayTime)}Format`;
      const className = cn([theme.dialog, theme[display], theme[format]], this.props.className);
      return (
        <Dialog
          actions={this.actions}
          active={this.props.active}
          className={className}
          onEscKeyDown={this.props.onEscKeyDown}
          onOverlayClick={this.props.onOverlayClick}
        >
          <header className={theme.header}>
            <span id="hours" className={theme.hours} onClick={this.switchDisplay}>
              {(`0${this.formatHours()}`).slice(-2)}
            </span>
            <span className={theme.separator}>:</span>
            <span id="minutes" className={theme.minutes} onClick={this.switchDisplay}>
              {(`0${this.state.displayTime.getMinutes()}`).slice(-2)}
            </span>
            {this.renderAMPMLabels()}
          </header>
          <Clock
            ref={this.updateRefAndCalculateHandleShape}
            display={this.state.display}
            format={this.props.format}
            onChange={this.handleClockChange}
            onHandMoved={this.handleHandMoved}
            theme={this.props.theme}
            time={this.state.displayTime}
          />
        </Dialog>
      );
    }
  }

  return TimePickerDialog;
};

export default factory;
