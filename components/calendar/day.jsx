/* global React */

import { addons } from 'react/addons';
import css from './style';
import time from '../utils/time';

export default React.createClass({
  mixins: [addons.PureRenderMixin],

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
      <div className={this.isSelected() ? `${css.day} active` : css.day} style={this.dayStyle()}>
          <span onClick={this.props.onClick}>{this.props.day}</span>
      </div>
    );
  }
});
