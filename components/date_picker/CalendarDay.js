import React from 'react';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import time from '../utils/time';

class Day extends React.Component {
  static propTypes = {
    day: React.PropTypes.number,
    disabled: React.PropTypes.bool,
    onClick: React.PropTypes.func,
    selectedDate: React.PropTypes.object,
    theme: React.PropTypes.shape({
      active: React.PropTypes.string.isRequired,
      day: React.PropTypes.string.isRequired,
      disabled: React.PropTypes.string.isRequired
    }),
    viewDate: React.PropTypes.object
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

export default themr('ToolboxDatePicker')(Day);
