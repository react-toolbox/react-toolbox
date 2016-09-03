import React, { Component, PropTypes } from 'react';
import CssTransitionGroup from 'react-addons-css-transition-group';
import { SlideLeft, SlideRight } from '../animations';
import time from '../utils/time.js';
import utils from '../utils/utils.js';
import CalendarMonth from './CalendarMonth.js';

const DIRECTION_STEPS = { left: -1, right: 1 };

const factory = (IconButton) => {
  class Calendar extends Component {
    static propTypes = {
      display: PropTypes.oneOf(['months', 'years']),
      handleSelect: PropTypes.func,
      locale: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.object
      ]),
      maxDate: PropTypes.object,
      minDate: PropTypes.object,
      onChange: PropTypes.func,
      selectedDate: PropTypes.object,
      sundayFirstDayOfWeek: React.PropTypes.bool,
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

    componentWillMount () {
      document.body.addEventListener('keydown', this.handleKeys);
    }

    componentDidUpdate () {
      if (this.refs.activeYear) {
        this.scrollToActive();
      }
    }

    componentWillUnmount () {
      document.body.removeEventListener('keydown', this.handleKeys);
    }

    scrollToActive () {
      this.refs.years.scrollTop = this.refs.activeYear.offsetTop
      - this.refs.years.offsetHeight / 2
      + this.refs.activeYear.offsetHeight / 2;
    }

    handleDayClick = (day) => {
      this.props.onChange(time.setDay(this.state.viewDate, day), true);
    };

    handleYearClick = (event) => {
      const year = parseInt(event.currentTarget.id);
      const viewDate = time.setYear(this.props.selectedDate, year);
      this.setState({viewDate});
      this.props.onChange(viewDate, false);
    };

    handleKeys = (e) => {
      const { selectedDate } = this.props;

      if (e.which === 37 || e.which === 38 || e.which === 39 || e.which === 40 || e.which === 13) e.preventDefault();

      switch (e.which) {
        case 13: this.props.handleSelect(); break; // enter
        case 37: this.handleDayArrowKey(time.addDays(selectedDate, -1)); break; // left
        case 38: this.handleDayArrowKey(time.addDays(selectedDate, -7)); break; // up
        case 39: this.handleDayArrowKey(time.addDays(selectedDate, 1)); break; // right
        case 40: this.handleDayArrowKey(time.addDays(selectedDate, 7)); break; // down
        default: break;
      }
    }

    handleDayArrowKey = (date) => {
      this.setState({ viewDate: date });
      this.props.onChange(date, false);
    }

    changeViewMonth = (event) => {
      const direction = event.currentTarget.id;
      this.setState({
        direction,
        viewDate: time.addMonths(this.state.viewDate, DIRECTION_STEPS[direction])
      });
    };

    renderYears () {
      return (
        <ul data-react-toolbox='years' ref="years" className={this.props.theme.years}>
          {utils.range(1900, 2100).map(year => (
            <li
              children={year}
              className={year === this.state.viewDate.getFullYear() ? this.props.theme.active : ''}
              id={year}
              key={year}
              onClick={this.handleYearClick}
              ref={year === this.state.viewDate.getFullYear() ? 'activeYear' : undefined}
            />
          ))}
        </ul>
      );
    }

    renderMonths () {
      const { theme } = this.props;
      const animation = this.state.direction === 'left' ? SlideLeft : SlideRight;
      return (
        <div data-react-toolbox='calendar'>
          <IconButton id='left' className={theme.prev} icon='chevron_left' onClick={this.changeViewMonth} />
          <IconButton id='right' className={theme.next} icon='chevron_right' onClick={this.changeViewMonth} />
          <CssTransitionGroup transitionName={animation} transitionEnterTimeout={350} transitionLeaveTimeout={350}>
            <CalendarMonth
              key={this.state.viewDate.getMonth()}
              locale={this.props.locale}
              maxDate={this.props.maxDate}
              minDate={this.props.minDate}
              onDayClick={this.handleDayClick}
              selectedDate={this.props.selectedDate}
              sundayFirstDayOfWeek={this.props.sundayFirstDayOfWeek}
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
