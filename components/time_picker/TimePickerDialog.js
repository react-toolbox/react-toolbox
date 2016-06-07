import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import time from '../utils/time.js';
import Clock from './Clock.js';

const factory = (Dialog) => {
  class TimePickerDialog extends Component {
    static propTypes = {
      active: PropTypes.bool,
      className: PropTypes.string,
      format: PropTypes.oneOf(['24hr', 'ampm']),
      name: PropTypes.string,
      onDismiss: PropTypes.func,
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
        separator: PropTypes.string
      }),
      value: PropTypes.object
    };

    static defaultProps = {
      active: false,
      format: '24hr',
      value: new Date()
    };

    state = {
      display: 'hours',
      displayTime: this.props.value
    };

    componentDidUpdate (prevProps) {
      if (!prevProps.active && this.props.active) {
        setTimeout(this.refs.clock.handleCalculateShape, 1000);
      }
    }

    handleClockChange = (value) => {
      this.setState({displayTime: value});
    };

    handleSelect = (event) => {
      this.props.onSelect(this.state.displayTime, event);
    };

    toggleTimeMode = () => {
      this.setState({displayTime: time.toggleTimeMode(this.state.displayTime)});
    };

    handleHandMoved = () => {
      if (this.state.display === 'hours') this.setState({display: 'minutes'});
    };

    switchDisplay = (display) => {
      this.setState({display});
    };

    actions = [
      { label: 'Cancel', className: this.props.theme.button, onClick: this.props.onDismiss },
      { label: 'Ok', className: this.props.theme.button, name: this.props.name, onClick: this.handleSelect }
    ];

    formatHours () {
      if (this.props.format === 'ampm') {
        return this.state.displayTime.getHours() % 12 || 12;
      } else {
        return this.state.displayTime.getHours();
      }
    }

    renderAMPMLabels () {
      const { theme } = this.props;
      if (this.props.format === 'ampm') {
        return (
          <div className={theme.ampm}>
            <span className={theme.am} onClick={this.toggleTimeMode}>AM</span>
            <span className={theme.pm} onClick={this.toggleTimeMode}>PM</span>
          </div>
        );
      }
    }

    render () {
      const { theme } = this.props;
      const display = `${this.state.display}Display`;
      const format = `${time.getTimeMode(this.state.displayTime)}Format`;
      const className = classnames([theme.dialog, theme[display], theme[format]], this.props.className);
      return (
        <Dialog active={this.props.active} className={className} actions={this.actions}>
          <header className={theme.header}>
            <span className={theme.hours} onClick={this.switchDisplay.bind(this, 'hours')}>
              {('0' + this.formatHours()).slice(-2)}
            </span>
            <span className={theme.separator}>:</span>
            <span className={theme.minutes} onClick={this.switchDisplay.bind(this, 'minutes')}>
              {('0' + this.state.displayTime.getMinutes()).slice(-2)}
            </span>
            {this.renderAMPMLabels()}
          </header>
          <Clock
            ref='clock'
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
