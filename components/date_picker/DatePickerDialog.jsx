import React from 'react';
import ClassNames from 'classnames';
import Calendar from './Calendar';
import Dialog from '../dialog';
import style from './style';
import time from '../utils/time';

class CalendarDialog extends React.Component {
  static propTypes = {
    active: React.PropTypes.bool,
    autoOk: React.PropTypes.bool,
    className: React.PropTypes.string,
    maxDate: React.PropTypes.object,
    minDate: React.PropTypes.object,
    onDismiss: React.PropTypes.func,
    onSelect: React.PropTypes.func,
    value: React.PropTypes.object
  };

  static defaultProps = {
    active: false,
    className: '',
    value: new Date()
  };

  state = {
    date: this.props.value,
    display: 'months'
  };

  handleCalendarChange = (value, dayClick) => {
    const state = {display: 'months', date: value};
    if (time.dateOutOfRange(value, this.props.minDate, this.props.maxDate)) {
      state.date = this.props.maxDate || this.props.minDate;
    }
    this.setState(state);
    if (dayClick && this.props.autoOk && this.props.onSelect) {
      this.props.onSelect(value);
    }
  };

  handleSelect = (event) => {
    if (this.props.onSelect) this.props.onSelect(this.state.date, event);
  };

  handleSwitchDisplay = (display) => {
    this.setState({ display });
  };

  actions = [
    { label: 'Cancel', className: style.button, onClick: this.props.onDismiss },
    { label: 'Ok', className: style.button, onClick: this.handleSelect }
  ];

  render () {
    const display = `display-${this.state.display}`;
    const className = ClassNames(style.dialog, this.props.className);
    const headerClassName = ClassNames(style.header, style[display]);

    return (
      <Dialog active={this.props.active} type="custom" className={className} actions={this.actions}>
          <header className={headerClassName}>
            <span className={style.year} onClick={this.handleSwitchDisplay.bind(this, 'years')}>
              {this.state.date.getFullYear()}
            </span>
            <h3 className={style.date} onClick={this.handleSwitchDisplay.bind(this, 'months')}>
              {time.getShortDayOfWeek(this.state.date.getDay())}, {time.getShortMonth(this.state.date)} {this.state.date.getDate()}
            </h3>
          </header>

          <div className={style.wrapper}>
            <Calendar
              display={this.state.display}
              maxDate={this.props.maxDate}
              minDate={this.props.minDate}
              onChange={this.handleCalendarChange}
              selectedDate={this.state.date} />
          </div>
      </Dialog>
    );
  }
}

export default CalendarDialog;
