import React, { PureComponent, PropTypes } from 'react';
import range from 'ramda/src/range';
import getDaysInMonth from 'date-fns/get_days_in_month';
import isWithinRange from 'date-fns/is_within_range';
import startOfMonth from 'date-fns/start_of_month';
import isSameDay from 'date-fns/is_same_day';
import setDate from 'date-fns/set_date';
import dateShape from './dateShape';
import startOfWeek from 'date-fns/start_of_week';
import lastDayOfWeek from 'date-fns/last_day_of_week';
import subDays from 'date-fns/sub_days';
import lastDayOfMonth from 'date-fns/last_day_of_month';
import getDate from 'date-fns/get_date';
import getPassThrough from '../../utils/getPassThrough';
import isDateRange from './dateUtils/isDateRange';
import getFullDayOfWeek from './dateLocale/getFullDayOfWeek';
import getFullMonth from './dateLocale/getFullMonth';
const addDays = require('date-fns/add_days');
const differenceInCalendarDays = require('date-fns/difference_in_calendar_days');

const monthFactory = ({
  Day,
  DaysWeek,
  DaysWrapper,
  MonthTitle,
  MonthWrapper,
  Weekday,
  WeekdaysWrapper,
  passthrough,
}) => {
  const passProps = getPassThrough(passthrough);
  class Month extends PureComponent {
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

    renderDays = () => {
      const { sundayFirstDayOfWeek, selected, onDayMouseEneter, isDayBlocked, onDayClick, isDayDisabled, viewDate } = this.props;
      const firstDay = sundayFirstDayOfWeek
        ? subDays(startOfWeek(viewDate), 1)
        : startOfWeek(viewDate);

      const lastDay = sundayFirstDayOfWeek
        ? subDays(lastDayOfWeek(lastDayOfMonth(viewDate)), 1)
        : lastDayOfWeek(lastDayOfMonth(viewDate));

      const nweeks = Math.ceil(differenceInCalendarDays(lastDay, firstDay) / 7);

      const monthMatrix = [];
      const weeks = [];
      let days;

      for (const i = 0; i < nweeks; i++) {
        monthMatrix[i] = [];
        days = [];

        for (const j = 0; j < 7; j++) {
          const monthDay = addDays(firstDay, j + i * 7);
          monthMatrix[i][j] = monthDay;
          days[j] = (
            <Day
              {...passProps(this.props, 'Day', this)}
              day={monthDay}
              isDayBlocked={isDayBlocked}
              isDayDisabled={isDayDisabled}
              key={monthDay.getTime()}
              onClick={onDayClick}
              onMouseEnter={onDayMouseEneter}
              selected={selected}
              viewDate={viewDate}
            />
          );
        }

        weeks[i] = (
          <DaysWeek {...passProps(this.props, 'DaysWeek', this)} key={`${i}${viewDate.getMonth()}`}>
            {days}
          </DaysWeek>
        );
      }

      return weeks;
    };

    renderWeekDays = () => {
      const { locale, sundayFirstDayOfWeek } = this.props;
      const indexes = range(0, 7);
      const sortedDaysIdx = sundayFirstDayOfWeek ? indexes : [...indexes.slice(1), indexes[0]];
      return sortedDaysIdx.map(weekDay => (
        <Weekday
          {...passProps(this.props, 'Weekday', this)}
          key={getFullDayOfWeek(weekDay, locale)}
          weekDay={weekDay}
        >
          {getFullDayOfWeek(weekDay, locale)}
        </Weekday>
      ));
    };

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
        <MonthWrapper {...rest} {...passProps(this.props, 'MonthWrapper', this)}>
          <MonthTitle {...passProps(this.props, 'MonthTitle', this)}>
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
