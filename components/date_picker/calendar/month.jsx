import React from 'react';
import utils from '../../utils';
import Day from './day';
import style from './style';

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
      return <span key={i}>{ utils.time.getFullDayOfWeek(i).charAt(0) }</span>;
    });
  }

  renderDays () {
    return utils.range(1, utils.time.getDaysInMonth(this.props.viewDate) + 1).map(i => {
      let active = true;

      if (this.props.minDate || this.props.maxDate) {
        const date = new Date(this.props.viewDate.getFullYear(), this.props.viewDate.getMonth(), i);
        if (this.props.minDate && !(date >= this.props.minDate)) active = false;
        if (this.props.maxDate && !(date <= this.props.maxDate)) active = false;
        console.log('day', i, date, this.props.minDate, active);
      }

      return (
        <Day
          key={i}
          day={i}
          disabled={!active}
          onClick={active ? this.handleDayClick.bind(this, i) : null}
          selectedDate={this.props.selectedDate}
          viewDate={this.props.viewDate}
        />
      );
    });
  }

  render () {
    console.info('max/min', this.props.maxDate, this.props.minDate);
    return (
      <div className={style.month}>
        <span className={style.title}>
          { utils.time.getFullMonth(this.props.viewDate)} { this.props.viewDate.getFullYear() }
        </span>
        <div className={style.week}>{ this.renderWeeks() }</div>
        <div className={style.days}>{ this.renderDays() }</div>
      </div>
    );
  }
}

export default Month;
