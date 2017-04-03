import React, { PureComponent, PropTypes } from 'react';
import addMonths from 'date-fns/add_months';
import isBefore from 'date-fns/is_before';
import isSameDay from 'date-fns/is_same_day';
import isSameMonth from 'date-fns/is_same_month';
import isToday from 'date-fns/is_today';
import isWithinRange from 'date-fns/is_within_range';
import setDate from 'date-fns/set_date';
import dateShape from './dateShape';
import isDateRange from './dateUtils/isDateRange';
import getPassThrough from '../../utils/getPassThrough';

const dayFactory = ({
  DayNode,
  passthrough,
}) => {
  const passProps = getPassThrough(passthrough);
  class Day extends PureComponent {
    static propTypes = {
      day: PropTypes.instanceOf(Date),
      highlighted: dateShape,
      isDayBlocked: PropTypes.func,
      isDayDisabled: PropTypes.func,
      onClick: PropTypes.func,
      onMouseEnter: PropTypes.func,
      selected: dateShape,
      viewDate: PropTypes.instanceOf(Date),
    };

    shouldComponentUpdate(nextProps) {
      const {
        day,
        highlighted,
        isDayDisabled,
        selected,
        viewDate,
      } = this.props;

      const {
        day: nextDay,
        highlighted: nextHighlighted,
        isDayDisabled: nextIsDayDisabled,
        selected: nextSelected,
        viewDate: nextViewDate,
      } = nextProps;

      if (selected !== nextSelected) {
        return isAffected(day, selected, viewDate)
          || isAffected(nextDay, nextSelected, nextViewDate);
      }

      if (highlighted !== nextHighlighted) {
        return isAffected(day, highlighted, viewDate)
          || isAffected(nextDay, nextHighlighted, nextViewDate);
      }

      if (isDayDisabled !== nextIsDayDisabled) {
        return true;
      }

      return false;
    }

    handleClick = (event) => {
      const { day, isDayDisabled, onClick } = this.props;
      if (onClick && (!isDayDisabled || !isDayDisabled(day))) {
        onClick(day, event);
      }
    };

    handleMouseEnter = () => {
      const { day, isDayDisabled, onMouseEnter } = this.props;
      if (onMouseEnter && (!isDayDisabled || !isDayDisabled(day))) {
        onMouseEnter(day, event);
      }
    };

    render() {
      const {
        day,
        highlighted,
        isDayBlocked,
        isDayDisabled,
        onClick,       // eslint-disable-line
        onMouseEnter,  // eslint-disable-line
        selected,
        viewDate,
        ...others
      } = this.props;

      const selectedMatch = matchSelected(selected, day, viewDate);
      const highlightedMatch = matchSelected(highlighted, day, viewDate);
      const isHighlighted = highlightedMatch.selected || highlightedMatch.inRange;

      return (
        <DayNode
          {...others}
          {...passProps(this.props, 'DayNode')}
          blocked={isDayBlocked && isDayBlocked(day)}
          disabled={isDayDisabled && isDayDisabled(day)}
          highlighted={isHighlighted}
          inRange={selectedMatch.inRange}
          onClick={this.handleClick}
          onMouseEnter={this.handleMouseEnter}
          outOfMonth={!isSameMonth(viewDate, day)}
          selected={selectedMatch.selected}
          selectedSource={selectedMatch.source}
          today={isToday(day)}
        >
          {day.getDate()}
        </DayNode>
      );
    }
  }

  return Day;
};

export function matchSelected(selected, day, viewDate) {
  if (!selected) {
    return { inRange: false, selected: false, source: null };
  }

  if (selected instanceof Date && isSameMonth(viewDate, day) && isSameDay(selected, day)) {
    return { inRange: false, selected: true, source: 'selected' };
  }

  if (isDateRange(selected)) {
    const { from, to } = selected;

    if (!isSameMonth(viewDate, day)) {
      const outOfMonthCompare = isBefore(day, viewDate)
        ? setDate(addMonths(day, 1), 1)
        : setDate(day, 1);

      if (
        (from && isSameDay(outOfMonthCompare, from)) ||
        (to && isSameDay(outOfMonthCompare, to)) ||
        (from && to && isWithinRange(outOfMonthCompare, from, to))
      ) {
        return { inRange: true, selected: false, source: null };
      }
    }

    if (from && isSameDay(day, from)) {
      return { inRange: false, selected: true, source: 'from' };
    }

    if (to && isSameDay(day, to)) {
      return { inRange: false, selected: true, source: 'to' };
    }

    if (from && to && isWithinRange(day, from, to)) {
      return { inRange: true, selected: false, source: null };
    }
  }

  return { inRange: false, selected: false, source: null };
}

function isAffected(_day, selected, viewDate) {
  let day = _day;

  if (!isSameMonth(viewDate, day)) {
    day = isBefore(day, viewDate)
      ? setDate(addMonths(day, 1), 1)
      : setDate(day, 1);
  }

  if (isDateRange(selected)) {
    const { from, to } = selected;

    if (from && to) {
      return isWithinRange(day, from, to);
    }

    return isSameDay(day, from)
      || isSameDay(day, to);
  }

  if (selected instanceof Date) {
    return isSameDay(day, selected);
  }

  return false;
}

export default dayFactory;
