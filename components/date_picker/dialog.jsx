import React from 'react';
import style from './style';
import time from '../utils/time';
import Calendar from './calendar';
import Dialog from '../dialog';

class CalendarDialog extends React.Component {
  static propTypes = {
    initialDate: React.PropTypes.object,
    onDateSelected: React.PropTypes.func
  };

  static defaultProps = {
    initialDate: new Date()
  };

  state = {
    date: this.props.initialDate,
    display: 'months',
    actions: [
      { label: 'Cancel', className: style.button, onClick: this.onDateCancel.bind(this) },
      { label: 'Ok', className: style.button, onClick: this.onDateSelected.bind(this) }
    ]
  };

  handleCalendarChange = (date) => {
    this.setState({date, display: 'months'});
  };

  displayMonths = () => {
    this.setState({display: 'months'});
  };

  displayYears = () => {
    this.setState({display: 'years'});
  };

  onDateCancel () {
    this.refs.dialog.hide();
  }

  onDateSelected () {
    if (this.props.onDateSelected) this.props.onDateSelected(this.state.date);
    this.refs.dialog.hide();
  }

  show () {
    this.refs.dialog.show();
  }

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
              onChange={this.handleCalendarChange}
              selectedDate={this.state.date} />
          </div>
      </Dialog>
    );
  }
}

export default CalendarDialog;
