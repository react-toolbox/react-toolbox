import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import style from './style';
import time from '../utils/time';
import Calendar from './calendar';
import Dialog from '../dialog';

export default React.createClass({
  mixins: [PureRenderMixin],

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
        { label: 'Cancel', className: style.button, onClick: this.onDateCancel },
        { label: 'Ok', className: style.button, onClick: this.onDateSelected }
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
    const display = `display-${this.state.display}`;
    const headerClassName = `${style.header} ${style[display]}`;

    return (
      <Dialog ref="dialog" type="custom" className={style.dialog} actions={this.state.actions}>
          <header className={headerClassName}>
            <span className={style.weekday}>
              {time.getFullDayOfWeek(this.state.date.getDay())}
            </span>
            <div onClick={this.displayMonths}>
              <span className={style.month}>{time.getShortMonth(this.state.date)}</span>
              <span className={style.day}>{this.state.date.getDate()}</span>
            </div>
            <span className={style.year} onClick={this.displayYears}>
              {this.state.date.getFullYear()}
            </span>
          </header>

          <div className={style.wrapper}>
            <Calendar
              ref="calendar"
              display={this.state.display}
              onChange={this.onCalendarChange}
              selectedDate={this.state.date} />
          </div>
      </Dialog>
    );
  }
});
