import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import utils from '../../utils';
import Day from './day';
import style from './style';

export default React.createClass({
  mixins: [PureRenderMixin],

  displayName: 'Month',

  propTypes: {
    onDayClick: React.PropTypes.func,
    selectedDate: React.PropTypes.object,
    viewDate: React.PropTypes.object
  },

  handleDayClick (day) {
    if (this.props.onDayClick) this.props.onDayClick(day);
  },

  renderWeeks () {
    return utils.range(0, 7).map(i => {
      return <span key={i}>{ utils.time.getFullDayOfWeek(i).charAt(0) }</span>;
    });
  },

  renderDays () {
    return utils.range(1, utils.time.getDaysInMonth(this.props.viewDate) + 1).map(i => {
      return (
        <Day
          key={i}
          day={i}
          onClick={this.handleDayClick.bind(this, i)}
          selectedDate={this.props.selectedDate}
          viewDate={this.props.viewDate}
        />
      );
    });
  },

  render () {
    return (
      <div className={style.month}>
        <span className={style.title}>
          { utils.time.getFullMonth(this.props.viewDate)} {this.props.viewDate.getFullYear() }
        </span>
        <div className={style.week}>{ this.renderWeeks() }</div>
        <div className={style.days}>{ this.renderDays() }</div>
      </div>
    );
  }
});
