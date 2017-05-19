import * as React from 'react';
import { range, memoize } from 'ramda';
import { ComponentClass, Component } from 'react';
import getPassThrough, { PassTroughFunction } from '../../utils/getPassThrough';
import getFullDayOfWeek from '../../locale/getFullDayOfWeek';
import getFullMonth from '../../locale/getFullMonth';
import getMonthMatrix from './getMonthMatrix';
import getMonthAffected from './getMonthAffected';
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
  return class Month extends Component<MonthProps, void> {
    public shouldComponentUpdate(nextProps) {
      if (
        this.props.viewDate.getTime() !== nextProps.viewDate.getTime() ||
        this.props.isDayBlocked !== nextProps.isDayBlocked ||
        this.props.isDayDisabled !== nextProps.isDayDisabled ||
        this.props.onDayClick !== nextProps.onDayClick ||
        this.props.onDayMouseEnter !== nextProps.onDayMouseEnter ||
        this.props.onDayMouseLeave !== nextProps.onDayMouseLeave ||
        this.props.sundayFirstDayOfWeek !== nextProps.sundayFirstDayOfWeek
      ) {
        return true;
      }

      if (
        getMonthAffected(this.props.viewDate, this.props.selected) ||
        getMonthAffected(nextProps.viewDate, nextProps.selected) ||
        getMonthAffected(this.props.viewDate, this.props.highlighted) ||
        getMonthAffected(nextProps.viewDate, nextProps.highlighted)
      ) {
        return true;
      }

      return false;
    }

    private getMonthMatrix = memoize(getMonthMatrix);

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
      const monthMatrix = this.getMonthMatrix(viewDate.getTime(), sundayFirstDayOfWeek);
      const weeks: JSX.Element[] = [];
      let days;

      for (let i = 0; i < monthMatrix.length; i++) {
        days = [];
        for (let j = 0; j < 7; j++) {
          const monthDay = monthMatrix[i][j];
          days[j] = (
            <Day
              {...passProps(this.props, 'Day', this)}
              day={monthDay}
              highlighted={highlighted}
              isDayBlocked={isDayBlocked}
              isDayDisabled={isDayDisabled}
              key={monthDay.getTime().toString()}
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
            key={`${i}${viewDate.getTime().toString()}`}
          >
            {days}
          </DaysWeek>
        );
      }

      return weeks;
    }

    private renderWeekDay = (weekDay) => (
      <Weekday
        {...passProps(this.props, 'Weekday', this)}
        key={getFullDayOfWeek(weekDay, this.props.locale)}
        weekDay={weekDay}
      >
        {getFullDayOfWeek(weekDay, this.props.locale)}
      </Weekday>
    )

    private renderWeekDays = () => {
      const idxs = range(0, 7);
      const { sundayFirstDayOfWeek } = this.props;
      const sortedDaysIdx = sundayFirstDayOfWeek ? idxs : [...idxs.slice(1), idxs[0]];
      return sortedDaysIdx.map(this.renderWeekDay);
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
