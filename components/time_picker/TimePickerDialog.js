import React from 'react';
import ClassNames from 'classnames';
import style from './style';
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
    { label: 'Cancel', className: style.button, onClick: this.props.onDismiss },
    { label: 'Ok', className: style.button, onClick: this.handleSelect }
  ];

  formatHours () {
    if (this.props.format === 'ampm') {
      return this.state.displayTime.getHours() % 12 || 12;
    } else {
      return this.state.displayTime.getHours();
    }
  }

  renderAMPMLabels () {
    if (this.props.format === 'ampm') {
      return (
        <div className={style.ampm}>
          <span className={style.am} onClick={this.toggleTimeMode}>AM</span>
          <span className={style.pm} onClick={this.toggleTimeMode}>PM</span>
        </div>
      );
    }
  }

  render () {
    const display = `display-${this.state.display}`;
    const format = `format-${time.getTimeMode(this.state.displayTime)}`;
    const className = ClassNames([style.dialog, style[display], style[format]], this.props.className);
    return (
      <Dialog active={this.props.active} className={className} actions={this.actions}>
        <header className={style.header}>
          <span className={style.hours} onClick={this.switchDisplay.bind(this, 'hours')}>
            {('0' + this.formatHours()).slice(-2)}
          </span>
          <span className={style.separator}>:</span>
          <span className={style.minutes} onClick={this.switchDisplay.bind(this, 'minutes')}>
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
          time={this.state.displayTime}
        />
      </Dialog>
    );
  }
}

export default TimePickerDialog;
