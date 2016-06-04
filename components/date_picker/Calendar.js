import React, { Component, PropTypes } from 'react';
import CssTransitionGroup from 'react-addons-css-transition-group';
import { SlideLeft, SlideRight } from '../animations';
import time from '../utils/time.js';
import utils from '../utils/utils.js';
import CalendarMonth from './CalendarMonth.js';

const factory = (IconButton) => {
  class Calendar extends Component {
    static propTypes = {
      display: PropTypes.oneOf(['months', 'years']),
      maxDate: PropTypes.object,
      minDate: PropTypes.object,
      onChange: PropTypes.func,
      selectedDate: PropTypes.object,
      theme: PropTypes.shape({
        active: PropTypes.string,
        calendar: PropTypes.string,
        next: PropTypes.string,
        prev: PropTypes.string,
        years: PropTypes.string
      }),
      viewDate: PropTypes.object
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
        className: year === this.state.viewDate.getFullYear() ? this.props.theme.active : '',
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
        <ul data-react-toolbox='years' ref="years" className={this.props.theme.years}>
          {utils.range(1900, 2100).map((i) => { return this.renderYear(i); })}
        </ul>
      );
    }

    renderMonths () {
      const { theme } = this.props;
      const animation = this.state.direction === 'left' ? SlideLeft : SlideRight;
      return (
        <div data-react-toolbox='calendar'>
          <IconButton className={theme.prev} icon='chevron_left' onClick={this.changeViewMonth.bind(this, 'left', -1)} />
          <IconButton className={theme.next} icon='chevron_right' onClick={this.changeViewMonth.bind(this, 'right', 1)} />
          <CssTransitionGroup transitionName={animation} transitionEnterTimeout={350} transitionLeaveTimeout={350}>
            <CalendarMonth
              key={this.state.viewDate.getMonth()}
              maxDate={this.props.maxDate}
              minDate={this.props.minDate}
              onDayClick={this.handleDayClick}
              selectedDate={this.props.selectedDate}
              theme={this.props.theme}
              viewDate={this.state.viewDate}
              />
          </CssTransitionGroup>
        </div>
      );
    }

    render () {
      return (
        <div className={this.props.theme.calendar}>
          {this.props.display === 'months' ? this.renderMonths() : this.renderYears()}
        </div>
      );
    }
  }

  return Calendar;
};

export default factory;
