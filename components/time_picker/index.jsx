const React = window.React;
const time = require('../utils/time');

const Input = require('../input');
const TimeDialog = require('./dialog');

module.exports = React.createClass({
  displayName: 'TimePicker',

  propTypes: {
    format: React.PropTypes.oneOf(['24hr', 'ampm']),
    value: React.PropTypes.object
  },

  getDefaultProps () {
    return {
      format: '24hr'
    };
  },

  getInitialState () {
    return {
      value: this.props.value
    };
  },

  onTimeSelected (newTime) {
    this.refs.input.setValue(time.formatTime(newTime, this.props.format));
    this.setState({value: newTime});
  },

  openTimeDialog () {
    this.refs.dialog.show();
  },

  formatTime () {
    if (this.state.value) {
      return time.formatTime(this.state.value, this.props.format);
    }
  },

  getValue () {
    return this.state.value;
  },

  render () {
    return (
      <div>
        <Input
            ref="input"
            type="text"
            disabled={true}
            onClick={this.openTimeDialog}
            placeholder="Pick up time"
            value={this.formatTime()} />
        <TimeDialog
            ref="dialog"
            initialTime={this.state.value}
            format={this.props.format}
            onTimeSelected={this.onTimeSelected} />
      </div>
    );
  }
});
