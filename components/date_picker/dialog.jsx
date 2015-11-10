import React from 'react';
import style from './style';
import time from '../utils/time';
import Calendar from './calendar';
import Dialog from '../dialog';

class CalendarDialog extends React.Component {
  static propTypes = {
    active: React.PropTypes.bool,
    initialDate: React.PropTypes.object,
    onCancel: React.PropTypes.func,
    onChange: React.PropTypes.func,
    onSelect: React.PropTypes.func
  };

  static defaultProps = {
    active: false,
    initialDate: new Date()
  };

  state = {
    date: this.props.initialDate,
    display: 'months',
    actions: [
      { label: 'Cancel', className: style.button, onClick: this.handleCancel.bind(this) },
      { label: 'Ok', className: style.button, onClick: this.handleSelect.bind(this) }
    ]
  };

  handleCalendarChange = (date) => {
    this.setState({date, display: 'months'});
    if (this.props.onChange) this.props.onChange(date);
  };

  displayMonths = () => {
    this.setState({display: 'months'});
  };

  displayYears = () => {
    this.setState({display: 'years'});
  };

  handleCancel () {
    if (this.props.onCancel) this.props.onCancel(this.state.date);
  }

  handleSelect () {
    if (this.props.onSelect) this.props.onSelect(this.state.date);
  }

  render () {
    const display = `display-${this.state.display}`;
    const headerClassName = `${style.header} ${style[display]}`;

    return (
      <Dialog active={this.props.active} type="custom" className={style.dialog} actions={this.state.actions}>
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
              ref='calendar'
              display={this.state.display}
              onChange={this.handleCalendarChange}
              selectedDate={this.state.date} />
          </div>
      </Dialog>
    );
  }
}

export default CalendarDialog;
