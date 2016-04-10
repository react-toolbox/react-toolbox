import React from 'react';
import CssTransitionGroup from 'react-addons-css-transition-group';
import { SlideLeft, SlideRight } from '../animations';
import { IconButton } from '../button';
import CalendarMonth from './CalendarMonth';
import time from '../utils/time';
import utils from '../utils/utils';
import style from './style.calendar';

class Calendar extends React.Component {
  static propTypes = {
    display: React.PropTypes.oneOf(['months', 'years']),
    maxDate: React.PropTypes.object,
    minDate: React.PropTypes.object,
    onChange: React.PropTypes.func,
    selectedDate: React.PropTypes.object,
    viewDate: React.PropTypes.object
  };

  static defaultProps = {
    display: 'months',
    selectedDate: new Date()
  };

  state = {
    viewDate: this.props.selectedDate
  };

  componentDidUpdate () {
    if (this.refs.activeYear) {
      this.scrollToActive();
    }
  }

  scrollToActive () {
    this.refs.years.scrollTop = this.refs.activeYear.offsetTop
      - this.refs.years.offsetHeight / 2
      + this.refs.activeYear.offsetHeight / 2;
  }

  handleDayClick = (day) => {
    this.props.onChange(time.setDay(this.state.viewDate, day), true);
  };

  handleYearClick = (year) => {
    const viewDate = time.setYear(this.props.selectedDate, year);
    this.setState({viewDate});
    this.props.onChange(viewDate, false);
  };

  changeViewMonth = (direction, step) => {
    this.setState({
      direction,
      viewDate: time.addMonths(this.state.viewDate, step)
    });
  };

  renderYear (year) {
    const props = {
      className: year === this.state.viewDate.getFullYear() ? style.active : '',
      key: year,
      onClick: this.handleYearClick.bind(this, year)
    };

    if (year === this.state.viewDate.getFullYear()) {
      props.ref = 'activeYear';
    }

    return <li {...props}>{year}</li>;
  }

  renderYears () {
    return (
      <ul data-react-toolbox='years' ref="years" className={style.years}>
        {utils.range(1900, 2100).map((i) => { return this.renderYear(i); })}
      </ul>
    );
  }

  renderMonths () {
    const animation = this.state.direction === 'left' ? SlideLeft : SlideRight;
    return (
      <div data-react-toolbox='calendar'>
        <IconButton className={style.prev} icon='chevron_left' onClick={this.changeViewMonth.bind(this, 'left', -1)} />
        <IconButton className={style.next} icon='chevron_right' onClick={this.changeViewMonth.bind(this, 'right', 1)} />
        <CssTransitionGroup transitionName={animation} transitionEnterTimeout={350} transitionLeaveTimeout={350}>
          <CalendarMonth
            key={this.state.viewDate.getMonth()}
            maxDate={this.props.maxDate}
            minDate={this.props.minDate}
            viewDate={this.state.viewDate}
            selectedDate={this.props.selectedDate}
            onDayClick={this.handleDayClick}
          />
        </CssTransitionGroup>
      </div>
    );
  }

  render () {
    return (
      <div className={style.root}>
        {this.props.display === 'months' ? this.renderMonths() : this.renderYears()}
      </div>
    );
  }
}

export default Calendar;
