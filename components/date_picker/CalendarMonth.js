import React, { Component, PropTypes } from 'react';
import time from '../utils/time.js';
import utils from '../utils/utils.js';
import CalendarDay from './CalendarDay.js';

class Month extends Component {
  static propTypes = {
    maxDate: PropTypes.object,
    minDate: PropTypes.object,
    onDayClick: PropTypes.func,
    selectedDate: PropTypes.object,
    theme: PropTypes.shape({
      days: PropTypes.string,
      month: PropTypes.string,
      title: PropTypes.string,
      week: PropTypes.string
    }),
    viewDate: PropTypes.object
  };

  handleDayClick = (day) => {
    if (this.props.onDayClick) this.props.onDayClick(day);
  };

  renderWeeks () {
    return utils.range(0, 7).map(i => {
      return <span key={i}>{time.getFullDayOfWeek(i).charAt(0)}</span>;
    });
  }

  renderDays () {
    return utils.range(1, time.getDaysInMonth(this.props.viewDate) + 1).map(i => {
      const date = new Date(this.props.viewDate.getFullYear(), this.props.viewDate.getMonth(), i);
      const disabled = time.dateOutOfRange(date, this.props.minDate, this.props.maxDate);

      return (
        <CalendarDay
          key={i}
          day={i}
          disabled={disabled}
          onClick={!disabled ? this.handleDayClick.bind(this, i) : null}
          selectedDate={this.props.selectedDate}
          theme={this.props.theme}
          viewDate={this.props.viewDate}
        />
      );
    });
  }

  render () {
    return (
      <div data-react-toolbox='month' className={this.props.theme.month}>
        <span className={this.props.theme.title}>
          {time.getFullMonth(this.props.viewDate)} {this.props.viewDate.getFullYear()}
        </span>
        <div className={this.props.theme.week}>{this.renderWeeks()}</div>
        <div className={this.props.theme.days}>{this.renderDays()}</div>
      </div>
    );
  }
}

export default Month;
