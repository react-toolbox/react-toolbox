import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Dial from '../dial/Dial';
import time from '../utils/time';

function calculateEndTime(startTime, duration) {
  const endTime = new Date(startTime.getTime());
  endTime.setMinutes(endTime.getMinutes() + duration);
  return endTime;
}

const factory = (Dialog) => {
  class DurationPickerDialog extends Component {
    static propTypes = {
      active: PropTypes.bool,
      cancelLabel: PropTypes.string,
      className: PropTypes.string,
      duration: PropTypes.number,
      format: PropTypes.oneOf(['24hr', 'ampm']),
      maxDuration: PropTypes.number,
      minDuration: PropTypes.number,
      name: PropTypes.string,
      okLabel: PropTypes.string,
      onDismiss: PropTypes.func,
      onEscKeyDown: PropTypes.func,
      onOverlayClick: PropTypes.func,
      onSelect: PropTypes.func,
      startTime: PropTypes.instanceOf(Date),
      step: PropTypes.number,
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
    };

    static defaultProps = {
      active: false,
      cancelLabel: 'Cancel',
      format: '24hr',
      okLabel: 'Ok',
      startTime: new Date(),
    };

    state = {
      displayTime: this.props.startTime,
      selected: 0,
    };

    componentWillReceiveProps(nextProps) {
      if (calculateEndTime(nextProps.startTime, nextProps.duration).getTime() !==
        this.state.displayTime.getTime()) {
        this.setState({
          displayTime: calculateEndTime(nextProps.startTime, nextProps.duration),
        });
      }
    }

    componentDidUpdate(prevProps) {
      if (!prevProps.active && this.props.active) {
        setTimeout(this.dialNode.handleCalculateShape, 1000);
      }
    }

    handleDialChange = (value) => {
      this.setState({
        displayTime: calculateEndTime(this.props.startTime, value),
        selected: (value / this.props.step) - 1,
      });
    };

    handleSelect = (event) => {
      this.props.onSelect((this.state.selected * this.props.step) + this.props.minDuration, event);
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
          <span className={theme.am}>AM</span>
          <span className={theme.pm}>PM</span>
        </div>
      );
    }

    render() {
      const { theme } = this.props;
      const format = `${time.getTimeMode(this.state.displayTime)}Format`;
      const className = cn([theme.dialog, theme.minutes, theme[format]], this.props.className);
      const numbers = [];
      for (let i = this.props.minDuration; i <= this.props.maxDuration; i += this.props.step) {
        numbers.push(i);
      }
      return (
        <Dialog
          actions={this.actions}
          active={this.props.active}
          className={className}
          onEscKeyDown={this.props.onEscKeyDown}
          onOverlayClick={this.props.onOverlayClick}
        >
          <header className={theme.header}>
            <span id="hours" className={theme.hours}>
              {(`0${this.formatHours()}`).slice(-2)}
            </span>
            <span className={theme.separator}>:</span>
            <span id="minutes" className={theme.minutes}>
              {(`0${this.state.displayTime.getMinutes()}`).slice(-2)}
            </span>
            {this.renderAMPMLabels()}
          </header>
          <div style={{ textAlign: 'center' }}>Duration (minutes)</div>
          <Dial
            ref={(node) => { this.dialNode = node; }}
            format={this.props.format}
            onChange={this.handleDialChange}
            theme={this.props.theme}
            time={this.state.displayTime}
            numbers={numbers}
            selected={this.state.selected}
          />
        </Dialog>
      );
    }
  }

  return DurationPickerDialog;
};

export default factory;
