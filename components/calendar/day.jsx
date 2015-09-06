const React = window.React;
const css = require('./style');
const time = require('../utils/time');

module.exports = React.createClass({
  displayName: 'Day',

  propTypes: {
    day: React.PropTypes.number,
    onClick: React.PropTypes.func,
    selectedDate: React.PropTypes.object,
    viewDate: React.PropTypes.object
  },

  _dayStyle () {
    if (this.props.day === 1) {
      return {
        marginLeft: `${time.getFirstWeekDay(this.props.viewDate) * 100 / 7}%`
      };
    }
  },

  _isSelected () {
    const sameYear = this.props.viewDate.getFullYear() === this.props.selectedDate.getFullYear();
    const sameMonth = this.props.viewDate.getMonth() === this.props.selectedDate.getMonth();
    const sameDay = this.props.day === this.props.selectedDate.getDate();
    return sameYear && sameMonth && sameDay;
  },

  render () {
    return (
      <div
        className={this._isSelected() ? `${css.day} active` : css.day}
        style={this._dayStyle()}>
          <span onClick={this.props.onClick}>{this.props.day}</span>
      </div>
    );
  }
});
