import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import time from '../utils/time.js';

class Day extends Component {
  static propTypes = {
    day: PropTypes.number,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    selectedDate: PropTypes.object,
    theme: PropTypes.shape({
      active: PropTypes.string,
      day: PropTypes.string,
      disabled: PropTypes.string
    }),
    viewDate: PropTypes.object
  };

  dayStyle () {
    if (this.props.day === 1) {
      return {
        marginLeft: `${time.getFirstWeekDay(this.props.viewDate) * 100 / 7}%`
      };
    }
  }

  isSelected () {
    const sameYear = this.props.viewDate.getFullYear() === this.props.selectedDate.getFullYear();
    const sameMonth = this.props.viewDate.getMonth() === this.props.selectedDate.getMonth();
    const sameDay = this.props.day === this.props.selectedDate.getDate();
    return sameYear && sameMonth && sameDay;
  }

  render () {
    const className = classnames(this.props.theme.day, {
      [this.props.theme.active]: this.isSelected(),
      [this.props.theme.disabled]: this.props.disabled
    });

    return (
      <div data-react-toolbox='day' className={className} style={this.dayStyle()}>
        <span onClick={this.props.onClick}>
          {this.props.day}
        </span>
      </div>
    );
  }
}

export default Day;
