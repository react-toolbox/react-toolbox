const React = window.React;
const css = require('./style');
const time = require('../utils/time');

const Calendar = require('../calendar');
const Dialog = require('../dialog');

module.exports = React.createClass({
  displayName: 'CalendarDialog',

  propTypes: {
    initialDate: React.PropTypes.object,
    onDateSelected: React.PropTypes.func
  },

  getDefaultProps () {
    return {
      initialDate: new Date()
    };
  },

  getInitialState () {
    return {
      date: this.props.initialDate,
      display: 'months',
      actions: [
        { caption: 'Cancel', type: 'flat accent', onClick: this.onDateCancel },
        { caption: 'Ok', type: 'flat accent', onClick: this.onDateSelected }
      ]
    };
  },

  onCalendarChange (date) {
    this.setState({date: date, display: 'months'});
  },

  onDateCancel () {
    this.refs.dialog.hide();
  },

  onDateSelected () {
    if (this.props.onDateSelected) this.props.onDateSelected(this.state.date);
    this.refs.dialog.hide();
  },

  show () {
    this.refs.dialog.show();
  },

  displayMonths () {
    this.setState({display: 'months'});
  },

  displayYears () {
    this.setState({display: 'years'});
  },

  render () {
    const className = `display-${this.state.display}`;
    return (
      <Dialog ref="dialog" className={className} type={css.dialog} actions={this.state.actions}>
          <header className={css.header}>
            <span className={css.headerWeekday}>
              {time.getFullDayOfWeek(this.state.date.getDay())}
            </span>
            <div onClick={this.displayMonths}>
              <span className={css.headerMonth}>{time.getShortMonth(this.state.date)}</span>
              <span className={css.headerDay}>{this.state.date.getDate()}</span>
            </div>
            <span className={css.headerYear} onClick={this.displayYears}>
              {this.state.date.getFullYear()}
            </span>
          </header>

          <div className={css.calendarWrapper}>
            <Calendar
              ref="calendar"
              display={this.state.display}
              onChange={this.onCalendarChange}
              selectedDate={this.props.date} />
          </div>
      </Dialog>
    );
  }
});
