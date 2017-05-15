import * as React from 'react';
import { range } from 'ramda';
import { ComponentClass, PureComponent, PropTypes } from 'react';
import {
  addDays,
  differenceInCalendarDays,
  lastDayOfMonth,
  lastDayOfWeek,
  startOfWeek,
  subDays,
} from 'date-fns';
import getPassThrough, { PassTroughFunction } from '../../utils/getPassThrough';
import getFullDayOfWeek from '../../locale/getFullDayOfWeek';
import getFullMonth from '../../locale/getFullMonth';
import { PickerDate, DateChecker } from './types';
import { Day } from './Day';

export interface MonthTitleProps {
  viewDate: Date;
}

export interface WeekdayProps {
  children: string;
  weekDay: number;
}

export interface MonthProps {
  highlighted?: PickerDate;
  isDayBlocked: DateChecker;
  isDayDisabled: DateChecker;
  locale: string | object;
  onDayClick(day: Date, event: React.MouseEvent<any>): void;
  onDayMouseEnter(day: Date, event: React.MouseEvent<any>): void;
  onDayMouseLeave(day: Date, event: React.MouseEvent<any>): void;
  selected?: PickerDate;
  sundayFirstDayOfWeek: boolean;
  viewDate: Date;
}

export type MonthNodes =
  'Day' |
  'DaysWeek' |
  'DaysWrapper' |
  'Weekday' |
  'MonthTitle' |
  'MonthWrapper' |
  'WeekDay' |
  'WeekdaysWrapper';

export interface MonthFactoryArgs {
  /**
   * Used to render each Day of the Month.
   */
  Day: Day;
  /**
   * Used wrap each bunch of days that compose a week.
   */
  DaysWeek: ComponentClass<any>;
  /**
   * Used to render a wrapper around all weeks..
   */
  DaysWrapper: ComponentClass<any>;
  /**
   * Used to render the month title
   */
  MonthTitle: ComponentClass<MonthTitleProps>;
  /**
   * Used as a wrapper of the whole month component.
   */
  MonthWrapper: ComponentClass<any>;
  /**
   * Use it to render each Weekday
   */
  Weekday: ComponentClass<WeekdayProps>;
  /**
   * Used to render a wrapper around all weekdays
   */
  WeekdaysWrapper: ComponentClass<any>;
  /**
   * Use it to customize how props are passed around.
   */
  passthrough: PassTroughFunction<MonthProps, MonthNodes>;
}

export type Month = ComponentClass<MonthProps>;

export default function monthFactory({
  Day,
  DaysWeek,
  DaysWrapper,
  MonthTitle,
  MonthWrapper,
  Weekday,
  WeekdaysWrapper,
  passthrough,
}: MonthFactoryArgs): Month {
  const passProps = getPassThrough(passthrough);
  return class Month extends PureComponent<MonthProps, void> {
    private renderDays = () => {
      const {
        highlighted,
        isDayBlocked,
        isDayDisabled,
        onDayClick,
        onDayMouseEnter,
        onDayMouseLeave,
        selected,
        sundayFirstDayOfWeek,
        viewDate,
      } = this.props;

      const firstDay = sundayFirstDayOfWeek
        ? subDays(startOfWeek(viewDate), 1)
        : startOfWeek(viewDate);

      const lastDay = sundayFirstDayOfWeek
        ? subDays(lastDayOfWeek(lastDayOfMonth(viewDate)), 1)
        : lastDayOfWeek(lastDayOfMonth(viewDate));

      const nweeks = Math.ceil(differenceInCalendarDays(lastDay, firstDay) / 7);
      const monthMatrix: Date[][] = [];
      const weeks: JSX.Element[] = [];
      let days;

      for (let i = 0; i < nweeks; i++) {
        monthMatrix[i] = [];
        days = [];

        for (let j = 0; j < 7; j++) {
          const monthDay = addDays(firstDay, j + i * 7);
          monthMatrix[i][j] = monthDay;
          days[j] = (
            <Day
              {...passProps(this.props, 'Day', this)}
              day={monthDay}
              highlighted={highlighted}
              isDayBlocked={isDayBlocked}
              isDayDisabled={isDayDisabled}
              key={monthDay.getTime()}
              onClick={onDayClick}
              onMouseEnter={onDayMouseEnter}
              onMouseLeave={onDayMouseLeave}
              selected={selected}
              viewDate={viewDate}
            />
          );
        }

        weeks[i] = (
          <DaysWeek
            {...passProps(this.props, 'DaysWeek', this)}
            key={`${i}${viewDate.getMonth()}`}
          >
            {days}
          </DaysWeek>
        );
      }

      return weeks;
    }

    private renderWeekDays = () => {
      const { locale, sundayFirstDayOfWeek } = this.props;
      const indexes = range(0, 7);
      const sortedDaysIdx = sundayFirstDayOfWeek
        ? indexes
        : [...indexes.slice(1), indexes[0]];
      return sortedDaysIdx.map(weekDay => (
        <Weekday
          {...passProps(this.props, 'Weekday', this)}
          key={getFullDayOfWeek(weekDay, locale)}
          weekDay={weekDay}
        >
          {getFullDayOfWeek(weekDay, locale)}
        </Weekday>
      ));
    }

    public render() {
      const {
        highlighted,
        isDayBlocked,
        isDayDisabled,
        locale,
        onDayClick,
        onDayMouseEnter,
        selected,
        sundayFirstDayOfWeek,
        viewDate,
        ...rest,
      } = this.props;
      return (
        <MonthWrapper {...rest} {...passProps(this.props, 'MonthWrapper', this)}>
          <MonthTitle {...passProps(this.props, 'MonthTitle', this)} viewDate={viewDate}>
            {getFullMonth(viewDate)} {viewDate.getFullYear()}
          </MonthTitle>
          <WeekdaysWrapper {...passProps(this.props, 'WeekdaysWrapper', this)}>
            {this.renderWeekDays()}
          </WeekdaysWrapper>
          <DaysWrapper {...passProps(this.props, 'DaysWrapper', this)}>
            {this.renderDays()}
          </DaysWrapper>
        </MonthWrapper>
      );
    }
  };
}
