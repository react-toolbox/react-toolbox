/* global React */

import { addons } from 'react/addons';
import css from './style';
import time from '../utils/time';
import Calendar from '../calendar';
import Dialog from '../dialog';

export default React.createClass({
  mixins: [addons.PureRenderMixin],

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
        { label: 'Cancel', type: 'flat accent', onClick: this.onDateCancel },
        { label: 'Ok', type: 'flat accent', onClick: this.onDateSelected }
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
