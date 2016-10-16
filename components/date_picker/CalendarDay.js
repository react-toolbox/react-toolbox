import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import time from '../utils/time.js';

class Day extends Component {
  static propTypes = {
    day: PropTypes.number,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    selectedDate: PropTypes.object,
    sundayFirstDayOfWeek: PropTypes.bool,
    theme: PropTypes.shape({
      active: PropTypes.string,
      day: PropTypes.string,
      disabled: PropTypes.string
    }),
    viewDate: PropTypes.object
  };

  dayStyle () {
    if (this.props.day === 1) {
      const e = (this.props.sundayFirstDayOfWeek) ? 0 : 1;
      const firstDay = time.getFirstWeekDay(this.props.viewDate) - e;
      return {
        marginLeft: `${ (firstDay >= 0 ? firstDay : 6) * 100 / 7 }%`
      };
    }
  }

  isSelected () {
    const sameYear = this.props.viewDate.getFullYear() === this.props.selectedDate.getFullYear();
    const sameMonth = this.props.viewDate.getMonth() === this.props.selectedDate.getMonth();
    const sameDay = this.props.day === this.props.selectedDate.getDate();
    return sameYear && sameMonth && sameDay;
  }

  handleClick = () => {
    if (!this.props.disabled && this.props.onClick) {
      this.props.onClick(this.props.day);
    }
  };

  render () {
    const className = classnames(this.props.theme.day, {
      [this.props.theme.active]: this.isSelected(),
      [this.props.theme.disabled]: this.props.disabled
    });

    return (
      <div data-react-toolbox='day' className={className} style={this.dayStyle()}>
        <span onClick={this.handleClick}>
          {this.props.day}
        </span>
      </div>
    );
  }
}

export default Day;
