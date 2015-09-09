/* global React */

import { addons } from 'react/addons';
import css from './style';
import utils from '../utils';
import Day from './day';

export default React.createClass({
  mixins: [addons.PureRenderMixin],

  displayName: 'Month',

  propTypes: {
    onDayClick: React.PropTypes.func,
    selectedDate: React.PropTypes.object,
    viewDate: React.PropTypes.object
  },

  renderWeeks () {
    return utils.range(0, 7).map(i => {
      return (
        <span key={`dw${i}`}>
          { utils.time.getFullDayOfWeek(i).charAt(0) }
        </span>
      );
    });
  },

  renderDays () {
    return utils.range(1, utils.time.getDaysInMonth(this.props.viewDate) + 1).map(i => {
      return (
        <Day key={`d${i}`}
          day={i}
          onClick={this.props.onDayClick}
          selectedDate={this.props.selectedDate}
          viewDate={this.props.viewDate} />
      );
    });
  },

  render () {
    return (
      <div>
        <span className={css.title}>
          { utils.time.getFullMonth(this.props.viewDate)} {this.props.viewDate.getFullYear() }
        </span>
        <div className={css.week}>{ this.renderWeeks() }</div>
        <div className={css.days}>{ this.renderDays() }</div>
      </div>
    );
  }
});
