import React from 'react';
import style from './style';
import time from '../utils/time';
import Clock from './clock';
import Dialog from '../dialog';

class TimePickerDialog extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    initialTime: React.PropTypes.object,
    format: React.PropTypes.oneOf(['24hr', 'ampm']),
    onTimeSelected: React.PropTypes.func
  };

  static defaultProps = {
    className: '',
    initialTime: new Date(),
    format: '24hr'
  };

  state = {
    active: false,
    display: 'hours',
    time: this.props.initialTime,
    actions: [
      { label: 'Cancel', className: style.button, onClick: this.onTimeCancel.bind(this) },
      { label: 'Ok', className: style.button, onClick: this.onTimeSelected.bind(this) }
    ]
  };

  handleClockChange = (newTime) => {
    this.setState({time: newTime});
  };

  displayMinutes = () => {
    this.setState({display: 'minutes'});
  };

  displayHours = () => {
    this.setState({display: 'hours'});
  };

  toggleTimeMode = () => {
    this.refs.clock.toggleTimeMode();
  };

  onTimeCancel () {
    this.setState({active: false});
  }

  onTimeSelected () {
    if (this.props.onTimeSelected) this.props.onTimeSelected(this.state.time);
    this.setState({active: false});
  }

  show () {
    this.setState({active: true});
    setTimeout(this.refs.clock.handleCalculateShape, 1000);
  }

  formatHours () {
    if (this.props.format === 'ampm') {
      return this.state.time.getHours() % 12 || 12;
    } else {
      return this.state.time.getHours();
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
    const format = `format-${time.getTimeMode(this.state.time)}`;
    const className = `${style.dialog} ${style[display]} ${style[format]}`;

    return (
      <Dialog className={className} active={this.state.active} type="custom" actions={this.state.actions}>
        <header className={style.header}>
          <span className={style.hours} onClick={this.displayHours}>
            { ('0' + this.formatHours()).slice(-2) }
          </span>
          <span className={style.separator}>:</span>
          <span className={style.minutes} onClick={this.displayMinutes}>
            { ('0' + this.state.time.getMinutes()).slice(-2) }
          </span>
          { this.renderAMPMLabels() }
        </header>
        <Clock
          ref='clock'
          display={this.state.display}
          format={this.props.format}
          initialTime={this.props.initialTime}
          onChange={this.handleClockChange}
        />
      </Dialog>
    );
  }
}

export default TimePickerDialog;
