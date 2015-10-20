import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import { SlideLeft, SlideRight } from '../../animations';
import FontIcon from '../../font_icon';
import Ripple from '../../ripple';
import utils from '../../utils';
import Month from './month';
import style from './style';

export default React.createClass({
  mixins: [PureRenderMixin],

  displayName: 'Calendar',

  propTypes: {
    display: React.PropTypes.oneOf(['months', 'years']),
    onChange: React.PropTypes.func,
    selectedDate: React.PropTypes.object,
    viewDate: React.PropTypes.object
  },

  getDefaultProps () {
    return {
      display: 'months',
      selectedDate: new Date()
    };
  },

  getInitialState () {
    return {
      selectedDate: this.props.selectedDate,
      viewDate: this.props.selectedDate
    };
  },

  componentDidUpdate () {
    if (this.refs.activeYear) {
      this.scrollToActive();
    }
  },

  onDayClick (day) {
    let newDate = utils.time.setDay(this.state.viewDate, day);
    this.setState({selectedDate: newDate});
    if (this.props.onChange) this.props.onChange(newDate);
  },

  onYearClick (year) {
    let newDate = utils.time.setYear(this.state.selectedDate, year);
    this.setState({selectedDate: newDate, viewDate: newDate});
    if (this.props.onChange) this.props.onChange(newDate);
  },

  scrollToActive () {
    this.refs.years.scrollTop =
      this.refs.activeYear.offsetTop -
      this.refs.years.offsetHeight / 2 +
      this.refs.activeYear.offsetHeight / 2;
  },

  incrementViewMonth () {
    this.refs.rippleRight.start(event);
    this.setState({
      direction: 'right',
      viewDate: utils.time.addMonths(this.state.viewDate, 1)
    });
  },

  decrementViewMonth () {
    this.refs.rippleLeft.start(event);
    this.setState({
      direction: 'left',
      viewDate: utils.time.addMonths(this.state.viewDate, -1)
    });
  },

  renderYear (year) {
    let props = {
      className: year === this.state.viewDate.getFullYear() ? style.active : '',
      key: year,
      onClick: this.onYearClick.bind(this, year)
    };

    if (year === this.state.viewDate.getFullYear()) {
      props.ref = 'activeYear';
    }

    return (<li {...props}>{ year }</li>);
  },

  renderYears () {
    return (
      <ul ref="years" className={style.years}>
        { utils.range(1900, 2100).map(i => { return this.renderYear(i); })}
      </ul>
    );
  },

  renderMonths () {
    let animation = this.state.direction === 'left' ? SlideLeft : SlideRight;
    return (
      <div data-react-toolbox='calendar'>
        <FontIcon className={style.prev} value='chevron-left' onMouseDown={this.decrementViewMonth}>
          <Ripple ref='rippleLeft' className={style.ripple} spread={1.2} centered />
        </FontIcon>
        <FontIcon className={style.next} value='chevron-right' onMouseDown={this.incrementViewMonth}>
          <Ripple ref='rippleRight' className={style.ripple} spread={1.2} centered />
        </FontIcon>
        <CSSTransitionGroup transitionName={animation} transitionEnterTimeout={350} transitionLeaveTimeout={350}>
          <Month
            key={this.state.viewDate.getMonth()}
            viewDate={this.state.viewDate}
            selectedDate={this.state.selectedDate}
            onDayClick={this.onDayClick} />
        </CSSTransitionGroup>
      </div>
    );
  },

  render () {
    return (
      <div className={style.root}>
        { this.props.display === 'months' ? this.renderMonths() : this.renderYears() }
      </div>
    );
  }
});
