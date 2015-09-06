const React = window.React;
const css = require('./style');
const time = require('../utils/time');

const Clock = require('../clock');
const Dialog = require('../dialog');

module.exports = React.createClass({
  displayName: 'TimePickerDialog',

  propTypes: {
    className: React.PropTypes.string,
    initialTime: React.PropTypes.object,
    format: React.PropTypes.oneOf(['24hr', 'ampm']),
    onTimeSelected: React.PropTypes.func
  },

  getDefaultProps () {
    return {
      className: '',
      initialTime: new Date(),
      format: '24hr'
    };
  },

  getInitialState () {
    return {
      display: 'hours',
      time: this.props.initialTime,
      actions: [
        { caption: 'Cancel', type: 'flat accent', onClick: this.onTimeCancel },
        { caption: 'Ok', type: 'flat accent', onClick: this.onTimeSelected }
      ]
    };
  },

  onClockChange (newTime) {
    this.setState({time: newTime});
  },

  onTimeCancel () {
    this.refs.dialog.hide();
  },

  onTimeSelected () {
    if (this.props.onTimeSelected) this.props.onTimeSelected(this.state.time);
    this.refs.dialog.hide();
  },

  displayMinutes () {
    this.setState({display: 'minutes'});
  },

  displayHours () {
    this.setState({display: 'hours'});
  },

  toggleTimeMode () {
    this.refs.clock.toggleTimeMode();
  },

  show () {
    this.refs.dialog.show();
    setTimeout(this.refs.clock.calculateShape, 500);
  },

  _formatHours () {
    if (this.props.format === 'ampm') {
      return this.state.time.getHours() % 12 || 12;
    } else {
      return this.state.time.getHours();
    }
  },

  renderAMPMLabels () {
    if (this.props.format === 'ampm') {
      return (<div className={css.ampm}>
          <span className={css.am} onClick={this.toggleTimeMode}>AM</span>
          <span className={css.pm} onClick={this.toggleTimeMode}>PM</span>
        </div>);
    }
  },

  render () {
    let className = ` display-${this.state.display}`;
    className += ` format-${time.getTimeMode(this.state.time)}`;

    return (
      <Dialog ref="dialog" className={className} type={css.dialog} actions={this.state.actions}>
        <header className={css.header}>
          <span className={css.hours} onClick={this.displayHours}>
            { ('0' + this._formatHours()).slice(-2) }
          </span>
          <span className={css.separator}>:</span>
          <span className={css.minutes} onClick={this.displayMinutes}>
            { ('0' + this.state.time.getMinutes()).slice(-2) }
          </span>
          { this.renderAMPMLabels() }
        </header>
        <Clock
          ref="clock"
          display={this.state.display}
          format={this.props.format}
          initialTime={this.props.initialTime}
          onChange={this.onClockChange} />
      </Dialog>
    );
  }
});
