/* global React */

import { addons } from 'react/addons';
import time from '../utils/time';
import CalendarDialog from './dialog';
import Input from '../input';

export default React.createClass({
  mixins: [addons.PureRenderMixin],

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
