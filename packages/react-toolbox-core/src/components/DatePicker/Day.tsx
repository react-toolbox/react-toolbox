import * as React from 'react';
import { F, memoize } from 'ramda';
import { ComponentClass, MouseEvent, PureComponent } from 'react';
import { isSameMonth, isToday } from 'date-fns';
import getPassThrough, { PassTroughFunction } from '../../utils/getPassThrough';
import { DateChecker,  PickerDate, SelectedSource } from './types';
import getSelectionMatch, { equalSelectionMatch } from './getSelectionMatch';
import { Component }  from '../../types';

export interface DayNodeProps {
  blocked: boolean;
  disabled: boolean;
  highlighted: boolean;
  inRange: boolean;
  onClick(event: MouseEvent<any>): void;
  onMouseEnter(event: MouseEvent<any>): void;
  onMouseLeave(event: MouseEvent<any>): void;
  outOfMonth: boolean;
  selected: boolean;
  selectedSource: SelectedSource;
  today: boolean;
}

export interface DayFactoryArgs {
  DayNode: Component<DayNodeProps>;
  passthrough: PassTroughFunction<DayProps, 'DayNode'>;
}

export interface DayProps {
  day: Date;
  highlighted?: PickerDate;
  isDayBlocked: DateChecker;
  isDayDisabled: DateChecker;
  onClick(day: Date, event: MouseEvent<any>): void;
  onMouseEnter(day: Date, event: MouseEvent<any>): void;
  onMouseLeave(day: Date, event: MouseEvent<any>): void;
  selected?: PickerDate;
  viewDate: Date;
}

export type Day = ComponentClass<DayProps>;

export default function dayFactory({ DayNode, passthrough }: DayFactoryArgs): Day {
  const passProps = getPassThrough(passthrough);
  return class Day extends PureComponent<DayProps, void> {
    public static defaultProps = {
      isDayBlocked: F,
      isDayDisabled: F,
    };

    public shouldComponentUpdate(nextProps) {
      if (
        nextProps.isDayBlocked !== this.props.isDayBlocked ||
        nextProps.isDayDisabled !== this.props.isDayDisabled ||
        nextProps.day.getTime() !== this.props.day.getTime() ||
        nextProps.viewDate.getTime() !== this.props.viewDate.getTime()
      ) {
        return true;
      }

      if ((this.props.selected || nextProps.selected) && !equalSelectionMatch(
        this.getSelectedMatch(nextProps.day, this.props.selected, this.props.viewDate),
        this.getSelectedMatch(nextProps.day, nextProps.selected, nextProps.viewDate),
      )) {
        return true;
      }

      if ((this.props.highlighted || nextProps.highlighted) && !equalSelectionMatch(
        this.getHighlightedMatch(nextProps.day, this.props.highlighted, this.props.viewDate),
        this.getHighlightedMatch(nextProps.day, nextProps.highlighted, nextProps.viewDate),
      )) {
        return true;
      }

      return false;
    }

    private getSelectedMatch = memoize(getSelectionMatch);
    private getHighlightedMatch = memoize(getSelectionMatch);

    private handleClick = event => {
      const { day, isDayDisabled, onClick, viewDate } = this.props;
      if (isSameMonth(day, viewDate) && !isDayDisabled(day)) {
        onClick(day, event);
      }
    }

    private handleMouseEnter = (event) => {
      const { day, isDayDisabled, onMouseEnter, viewDate } = this.props;
      if (isSameMonth(day, viewDate) && !isDayDisabled(day)) {
        onMouseEnter(day, event);
      }
    }

    private handleMouseLeave = (event) => {
      const { day, isDayDisabled, onMouseLeave, viewDate } = this.props;
      if (isSameMonth(day, viewDate) && !isDayDisabled(day)) {
        onMouseLeave(day, event);
      }
    }

    public render() {
      const {
        day,
        highlighted,
        isDayBlocked,
        isDayDisabled,
        selected,
        viewDate,
        ...rest,
      } = this.props;
      const selectedMatch = this.getSelectedMatch(day, selected, viewDate);
      const highlightedMatch = this.getHighlightedMatch(day, highlighted, viewDate);
      const isHighlighted = highlightedMatch.selected || highlightedMatch.inRange;

      return (
        <DayNode
          {...rest}
          {...passProps(this.props, 'DayNode', this)}
          blocked={isDayBlocked && isDayBlocked(day)}
          disabled={isDayDisabled && isDayDisabled(day)}
          highlighted={isHighlighted}
          inRange={selectedMatch.inRange}
          onClick={this.handleClick}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          outOfMonth={!isSameMonth(viewDate, day)}
          selected={selectedMatch.selected}
          selectedSource={selectedMatch.source}
          today={isToday(day)}
        >
          {day.getDate()}
        </DayNode>
      );
    }
  };
}
