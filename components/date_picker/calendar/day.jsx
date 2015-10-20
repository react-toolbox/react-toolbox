import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import time from '../../utils/time';
import style from './style';

export default React.createClass({
  mixins: [PureRenderMixin],

  displayName: 'Day',

  propTypes: {
    day: React.PropTypes.number,
    onClick: React.PropTypes.func,
    selectedDate: React.PropTypes.object,
    viewDate: React.PropTypes.object
  },

  dayStyle () {
    if (this.props.day === 1) {
      return {
        marginLeft: `${time.getFirstWeekDay(this.props.viewDate) * 100 / 7}%`
      };
    }
  },

  isSelected () {
    const sameYear = this.props.viewDate.getFullYear() === this.props.selectedDate.getFullYear();
    const sameMonth = this.props.viewDate.getMonth() === this.props.selectedDate.getMonth();
    const sameDay = this.props.day === this.props.selectedDate.getDate();
    return sameYear && sameMonth && sameDay;
  },

  render () {
    return (
      <div className={this.isSelected() ? `${style.day} ${style.active}` : style.day} style={this.dayStyle()}>
          <span onClick={this.props.onClick}>{this.props.day}</span>
      </div>
    );
  }
});
