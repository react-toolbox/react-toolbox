import React from 'react';
import CalendarDay from './CalendarDay';
import time from '../utils/time';
import utils from '../utils/utils';
import style from './style.calendar';

class Month extends React.Component {
  static propTypes = {
    maxDate: React.PropTypes.object,
    minDate: React.PropTypes.object,
    onDayClick: React.PropTypes.func,
    selectedDate: React.PropTypes.object,
    viewDate: React.PropTypes.object
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
          viewDate={this.props.viewDate}
        />
      );
    });
  }

  render () {
    return (
      <div data-react-toolbox='month' className={style.month}>
        <span className={style.title}>
          {time.getFullMonth(this.props.viewDate)} {this.props.viewDate.getFullYear()}
        </span>
        <div className={style.week}>{this.renderWeeks()}</div>
        <div className={style.days}>{this.renderDays()}</div>
      </div>
    );
  }
}

export default Month;
