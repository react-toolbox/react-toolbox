const React = window.React;
const PureRenderMixin = require('react/addons').addons.PureRenderMixin;
const time = require('../utils/time');

const CalendarDialog = require('./dialog');
const Input = require('../input');

module.exports = React.createClass({
  mixins: [PureRenderMixin],

  displayName: 'DatePicker',

  propTypes: {
    className: React.PropTypes.string,
    value: React.PropTypes.object
  },

  getDefaultProps () {
    return {
      className: ''
    };
  },

  getInitialState () {
    return {
      value: this.props.value
    };
  },

  openCalendarDialog () {
    this.refs.dialog.show();
  },

  onDateSelected (value) {
    this.refs.input.setValue(this.formatDate(value));
    this.setState({value: value});
  },

  formatDate (date) {
    return `${date.getDate()} ${time.getFullMonth(date)} ${date.getFullYear()}`;
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
            onClick={this.openCalendarDialog}
            placeholder="Pick up date"
            value={this.state.value ? this.formatDate(this.state.value) : null} />
        <CalendarDialog
            ref="dialog"
            initialDate={this.state.value}
            onDateSelected={this.onDateSelected} />
      </div>
    );
  }
});
