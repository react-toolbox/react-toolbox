import PropTypes from 'prop-types';
import React, { Component } from 'react';
import time from '../utils/time.js';
import utils from '../utils/utils.js';
import CalendarDay from './CalendarDay.js';

class Month extends Component {
  static propTypes = {
    disabledDates: PropTypes.array,
    enabledDates: PropTypes.array,
    locale: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),
    maxDate: PropTypes.object,
    minDate: PropTypes.object,
    onDayClick: PropTypes.func,
    selectedDate: PropTypes.object,
    sundayFirstDayOfWeek: PropTypes.bool,
    theme: PropTypes.shape({
      days: PropTypes.string,
      month: PropTypes.string,
      title: PropTypes.string,
      week: PropTypes.string
    }),
    viewDate: PropTypes.object
  };

  static defaultProps = {
    disabledDates: [],
    enabledDates: []
  };

  handleDayClick = (day) => {
    if (this.props.onDayClick) this.props.onDayClick(day);
  };

  isDayDisabled (date) {
    const {minDate, maxDate, enabledDates, disabledDates} = this.props;
    const compareDate = compDate => date.getTime() === compDate.getTime();
    const dateInDisabled = disabledDates.filter(compareDate).length > 0;
    const dateInEnabled = enabledDates.filter(compareDate).length > 0;
    return time.dateOutOfRange(date, minDate, maxDate)
      || (enabledDates.length > 0 && !dateInEnabled)
      || dateInDisabled;
  }

  renderWeeks () {
    const days = utils.range(0, 7).map(d => time.getDayOfWeekLetter(d, this.props.locale));
    const source = (this.props.sundayFirstDayOfWeek) ? days : [...days.slice(1), days[0]];
    return source.map((d, i) => (<span key={i}>{d}</span>));
  }

  renderDays () {
    return utils.range(1, time.getDaysInMonth(this.props.viewDate) + 1).map(i => {
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

  render () {
    return (
      <div data-react-toolbox='month' className={this.props.theme.month}>
        <span className={this.props.theme.title}>
          {time.getFullMonth(this.props.viewDate, this.props.locale)} {this.props.viewDate.getFullYear()}
        </span>
        <div className={this.props.theme.week}>{this.renderWeeks()}</div>
        <div className={this.props.theme.days}>{this.renderDays()}</div>
      </div>
    );
  }
}

export default Month;
