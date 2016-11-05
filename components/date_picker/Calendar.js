import React, { Component, PropTypes } from 'react';
import CssTransitionGroup from 'react-addons-css-transition-group';
import { SlideLeft, SlideRight } from '../animations';
import time from '../utils/time';
import utils from '../utils/utils';
import CalendarMonth from './CalendarMonth';

const DIRECTION_STEPS = { left: -1, right: 1 };

const factory = (IconButton) => {
  class Calendar extends Component {
    static propTypes = {
      display: PropTypes.oneOf(['months', 'years']),
      handleSelect: PropTypes.func,
      locale: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
      ]),
      maxDate: PropTypes.instanceOf(Date),
      minDate: PropTypes.instanceOf(Date),
      onChange: PropTypes.func,
      selectedDate: PropTypes.instanceOf(Date),
      sundayFirstDayOfWeek: PropTypes.bool,
      theme: PropTypes.shape({
        active: PropTypes.string,
        calendar: PropTypes.string,
        next: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
        prev: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
        years: PropTypes.string,
      }),
      viewDate: PropTypes.instanceOf(Date), // eslint-disable-line react/no-unused-prop-types
    };

    static defaultProps = {
      display: 'months',
      selectedDate: new Date(),
    };

    state = {
      viewDate: this.props.selectedDate,
    };

    componentWillMount() {
      document.body.addEventListener('keydown', this.handleKeys);
    }

    componentDidUpdate() {
      if (this.activeYearNode) {
        this.scrollToActive();
      }
    }

    componentWillUnmount() {
      document.body.removeEventListener('keydown', this.handleKeys);
    }

    scrollToActive() {
      this.yearsNode.scrollTop = (((this.activeYearNode.offsetTop
      - this.yearsNode.offsetHeight) / 2)
      + this.activeYearNode.offsetHeight) / 2;
    }

    handleDayClick = (day) => {
      this.props.onChange(time.setDay(this.state.viewDate, day), true);
    };

    handleYearClick = (event) => {
      const year = parseInt(event.currentTarget.id);
      const viewDate = time.setYear(this.props.selectedDate, year);
      this.setState({ viewDate });
      this.props.onChange(viewDate, false);
    };

    handleKeys = (e) => {
      const { selectedDate } = this.props;
      const keys = [37, 38, 39, 40, 13];
      if (keys.includes(e.which)) e.preventDefault();

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
        viewDate: time.addMonths(this.state.viewDate, DIRECTION_STEPS[direction]),
      });
    };

    renderYears() {
      return (
        <ul data-react-toolbox="years" ref={(node) => { this.yearsNode = node; }} className={this.props.theme.years}>
          {utils.range(1900, 2100).map((year) => {
            const fullYear = year === this.state.viewDate.getFullYear();
            return (
              <li
                className={fullYear ? this.props.theme.active : ''}
                id={year}
                key={year}
                onClick={this.handleYearClick}
                ref={fullYear ? (node) => { this.activeYearNode = node; } : undefined}
              >
                {year}
              </li>
            );
          })}
        </ul>
      );
    }

    renderMonths() {
      const { theme } = this.props;
      const animation = this.state.direction === 'left' ? SlideLeft : SlideRight;
      return (
        <div data-react-toolbox="calendar">
          <IconButton
            id="left"
            className={theme.prev}
            icon="chevron_left"
            onClick={this.changeViewMonth}
          />
          <IconButton
            id="right"
            className={theme.next}
            icon="chevron_right"
            onClick={this.changeViewMonth}
          />
          <CssTransitionGroup
            transitionName={animation}
            transitionEnterTimeout={350}
            transitionLeaveTimeout={350}
          >
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

    render() {
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
