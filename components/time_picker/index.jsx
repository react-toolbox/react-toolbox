const React = window.React;

const Input = require('../input');
const TimeDialog = require('./dialog');
const utils = require('../utils/date-time');

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

  onTimeSelected (time) {
    this.refs.input.setValue(this.formatTime(time));
    this.setState({value: time});
  },

  openTimeDialog () {
    this.refs.dialog.show();
  },

  formatTime () {
    if (this.state.value) {
      return utils.formatTime(this.state.value, this.props.format);
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
