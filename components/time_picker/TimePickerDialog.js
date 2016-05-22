import React from 'react';
import classnames from 'classnames';
import time from '../utils/time';
import Clock from './Clock';
import Dialog from '../dialog';

class TimePickerDialog extends React.Component {
  static propTypes = {
    active: React.PropTypes.bool,
    className: React.PropTypes.string,
    format: React.PropTypes.oneOf(['24hr', 'ampm']),
    onDismiss: React.PropTypes.func,
    onSelect: React.PropTypes.func,
    theme: React.PropTypes.shape({
      am: React.PropTypes.string.isRequired,
      amFormat: React.PropTypes.string.isRequired,
      ampm: React.PropTypes.string.isRequired,
      button: React.PropTypes.string.isRequired,
      dialog: React.PropTypes.string.isRequired,
      header: React.PropTypes.string.isRequired,
      hours: React.PropTypes.string.isRequired,
      hoursDisplay: React.PropTypes.string.isRequired,
      minutes: React.PropTypes.string.isRequired,
      minutesDisplay: React.PropTypes.string.isRequired,
      pm: React.PropTypes.string.isRequired,
      pmFormat: React.PropTypes.string.isRequired,
      separator: React.PropTypes.string.isRequired
    }),
    value: React.PropTypes.object
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
    { label: 'Ok', className: this.props.theme.button, onClick: this.handleSelect }
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

export default TimePickerDialog;
