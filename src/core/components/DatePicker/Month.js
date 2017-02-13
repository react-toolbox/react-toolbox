import React, { Component, PropTypes } from 'react';
import range from 'ramda/src/range';
import getPassThrough from '../../utils/getPassThrough';
import dateShape from './dateShape';
import fromDateWithDay from './dateUtils/fromDateWithDay';
import getDaysInMonth from './dateUtils/getDaysInMonth';
import getFirstWeekDay from './dateUtils/getFirstWeekDay';
import getFullDayOfWeek from './dateLocale/getFullDayOfWeek';
import getFullMonth from './dateLocale/getFullMonth';
import isDateRange from './dateUtils/isDateRange';
import isInclusivelyInRange from './dateUtils/isInclusivelyInRange';
import isSameDay from './dateUtils/isSameDay';

const monthFactory = ({
  Day,
  DaysWrapper,
  MonthTitle,
  MonthWrapper,
  Weekday,
  WeekdaysWrapper,
  passthrough,
}) => {
  const passProps = getPassThrough(passthrough);
  class Month extends Component {
    static propTypes = {
      highlighted: dateShape,
      isDayBlocked: PropTypes.func,
      isDayDisabled: PropTypes.func,
      locale: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
      ]),
      onDayClick: PropTypes.func,
      onDayMouseEnter: PropTypes.func,
      selected: dateShape,
      sundayFirstDayOfWeek: PropTypes.bool,
      viewDate: PropTypes.instanceOf(Date),
    };

    handleDayClick = (day) => {
      const { onDayClick, viewDate } = this.props;
      if (onDayClick) {
        onDayClick(fromDateWithDay(viewDate, day));
      }
    };

    handleDayMouseEnter = (day) => {
      const { onDayMouseEnter, viewDate } = this.props;
      if (onDayMouseEnter) {
        onDayMouseEnter(fromDateWithDay(viewDate, day));
      }
    };

    isDayHighlighted = (dateForDay) => {
      const { highlighted } = this.props;
      if (highlighted instanceof Date) {
        return isSameDay(dateForDay, highlighted);
      }

      if (isDateRange(highlighted)) {
        const { from, to } = highlighted;
        return from && to
          ? isInclusivelyInRange(dateForDay, from, to)
          : isSameDay(dateForDay, from || to);
      }

      return false;
    }

    isDaySelected = (dateForDay) => {
      const { selected } = this.props;
      if (selected instanceof Date) {
        return isSameDay(dateForDay, selected);
      }

      if (isDateRange(selected)) {
        const { from, to } = selected;
        return (from && isSameDay(dateForDay, from))
          || (to && isSameDay(dateForDay, to));
      }

      return false;
    }

    isDayInRange = (dateForDay) => {
      const { selected } = this.props;
      if (isDateRange(selected)) {
        const { from, to } = selected;
        if (from && to) {
          return isInclusivelyInRange(dateForDay, from, to);
        }
      }
      return false;
    }

    renderDays = () => {
      const { viewDate } = this.props;
      const dateForDay = fromDateWithDay(viewDate, 1);
      return range(1, getDaysInMonth(viewDate)).map((day) => {
        dateForDay.setDate(day);
        return this.renderDay(dateForDay);
      });
    };

    renderDay = (dateForDay) => {
      const day = dateForDay.getDate();
      const { isDayBlocked, isDayDisabled, sundayFirstDayOfWeek, viewDate } = this.props;
      const firstDay = getFirstWeekDay(viewDate) - (sundayFirstDayOfWeek ? 0 : 1);
      const marginLeft = day === 1 && `${(firstDay >= 0 ? firstDay : 6) * (100 / 7)}%`;
      return (
        <Day
          {...passProps(this.props, 'Day')}
          key={day}
          day={day}
          blocked={isDayBlocked && isDayBlocked(dateForDay)}
          disabled={isDayDisabled && isDayDisabled(dateForDay)}
          highlighted={this.isDayHighlighted(dateForDay)}
          inRange={this.isDayInRange(dateForDay)}
          onClick={this.handleDayClick}
          onMouseEnter={this.handleDayMouseEnter}
          selected={this.isDaySelected(dateForDay)}
          style={{ marginLeft }}
          today={isSameDay(dateForDay, new Date())}
          viewDate={viewDate}
        />
      );
    }

    renderWeekDays = () => {
      const { locale, sundayFirstDayOfWeek } = this.props;
      const days = range(0, 7).map(weekDay => getFullDayOfWeek(weekDay, locale));
      const sortedDays = sundayFirstDayOfWeek ? days : [...days.slice(1), days[0]];
      return sortedDays.map(weekDay => (
        <Weekday key={weekDay} {...passProps(this.props, 'Weekday')}>
          {weekDay}
        </Weekday>
      ));
    }

    render() {
      const {
        highlighted,          // eslint-disable-line
        isDayBlocked,         // eslint-disable-line
        isDayDisabled,        // eslint-disable-line
        locale,               // eslint-disable-line
        onDayClick,           // eslint-disable-line
        onDayMouseEnter,      // eslint-disable-line
        selected,             // eslint-disable-line
        sundayFirstDayOfWeek, // eslint-disable-line
        viewDate,
        ...rest
      } = this.props;
      return (
        <MonthWrapper {...rest} {...passProps(this.props, 'MonthWrapper')}>
          <MonthTitle {...passProps(this.props, 'MonthTitle')}>
            {getFullMonth(viewDate)} {viewDate.getFullYear()}
          </MonthTitle>
          <WeekdaysWrapper>{this.renderWeekDays()}</WeekdaysWrapper>
          <DaysWrapper>{this.renderDays()}</DaysWrapper>
        </MonthWrapper>
      );
    }
  }

  return Month;
};

export default monthFactory;
