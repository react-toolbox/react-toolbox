import React from 'react';
import { themr } from 'react-css-themr';
import CalendarDay from './CalendarDay';
import time from '../utils/time';
import utils from '../utils/utils';

class Month extends React.Component {
  static propTypes = {
    maxDate: React.PropTypes.object,
    minDate: React.PropTypes.object,
    onDayClick: React.PropTypes.func,
    selectedDate: React.PropTypes.object,
    theme: React.PropTypes.shape({
      days: React.PropTypes.string.isRequired,
      month: React.PropTypes.string.isRequired,
      title: React.PropTypes.string.isRequired,
      week: React.PropTypes.string.isRequired
    }),
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

export default themr('ToolboxDatePicker')(Month);
