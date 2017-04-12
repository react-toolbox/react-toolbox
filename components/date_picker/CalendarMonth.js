import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { range } from '../utils/utils';
import time from '../utils/time';
import CalendarDay from './CalendarDay';

class Month extends Component {
  static propTypes = {
    disabledDates: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
    enabledDates: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
    locale: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
    maxDate: PropTypes.instanceOf(Date),
    minDate: PropTypes.instanceOf(Date),
    onDayClick: PropTypes.func,
    selectedDate: PropTypes.instanceOf(Date),
    sundayFirstDayOfWeek: PropTypes.bool,
    theme: PropTypes.shape({
      days: PropTypes.string,
      month: PropTypes.string,
      title: PropTypes.string,
      week: PropTypes.string,
    }),
    viewDate: PropTypes.instanceOf(Date),
  };

  static defaultProps = {
    disabledDates: [],
    enabledDates: [],
  };

  handleDayClick = (day) => {
    if (this.props.onDayClick) this.props.onDayClick(day);
  };

  isDayDisabled(date) {
    const { minDate, maxDate, enabledDates, disabledDates } = this.props;
    const compareDate = compDate => date.getTime() === compDate.getTime();
    const dateInDisabled = disabledDates.filter(compareDate).length > 0;
    const dateInEnabled = enabledDates.filter(compareDate).length > 0;
    return time.dateOutOfRange(date, minDate, maxDate)
      || (enabledDates.length > 0 && !dateInEnabled)
      || dateInDisabled;
  }

  renderWeeks() {
    const days = range(0, 7).map(d => time.getDayOfWeekLetter(d, this.props.locale));
    const source = (this.props.sundayFirstDayOfWeek) ? days : [...days.slice(1), days[0]];
    return source.map((day, i) => (<span key={i}>{day}</span>)); // eslint-disable-line
  }

  renderDays() {
    return range(1, time.getDaysInMonth(this.props.viewDate) + 1).map((i) => {
      const date = new Date(this.props.viewDate.getFullYear(), this.props.viewDate.getMonth(), i);
      return (
        <CalendarDay
          key={i}
          day={i}
          disabled={this.isDayDisabled(date)}
          onClick={this.handleDayClick}
          selectedDate={this.props.selectedDate}
          theme={this.props.theme}
          viewDate={this.props.viewDate}
          sundayFirstDayOfWeek={this.props.sundayFirstDayOfWeek}
        />
      );
    });
  }

  render() {
    const fullMonth = time.getFullMonth(this.props.viewDate, this.props.locale);
    const fullYear = this.props.viewDate.getFullYear();
    return (
      <div data-react-toolbox="month" className={this.props.theme.month}>
        <span className={this.props.theme.title}>
          {fullMonth} {fullYear}
        </span>
        <div className={this.props.theme.week}>{this.renderWeeks()}</div>
        <div className={this.props.theme.days}>{this.renderDays()}</div>
      </div>
    );
  }
}

export default Month;
