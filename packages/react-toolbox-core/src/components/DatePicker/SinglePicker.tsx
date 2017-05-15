import * as React from 'react';
import { cloneElement, Children, ComponentClass, PureComponent, ReactNode } from 'react';
import getPassThrough, { PassTroughFunction } from '../../utils/getPassThrough';
import isComponentOfType from '../../utils/isComponentOfType';

export interface SinglePickerProps {
  children: ReactNode;
  onChange(date: Date): void;
  selected: Date;
}

interface SinglePickerState {
  highlighted?: Date;
}

export interface SinglePickerArgs {
  MonthsWrapper;
  Month;
  passthrough: PassTroughFunction<SinglePickerProps, 'MonthsWrapper' | 'Month'>;
}

export default function singlePickerFactory({
  MonthsWrapper,
  Month,
  passthrough,
}: SinglePickerArgs): ComponentClass<SinglePickerProps> {
  const passProps = getPassThrough(passthrough);
  return class SinglePicker extends PureComponent<SinglePickerProps, SinglePickerState> {
    public state = {
      highlighted: undefined,
    };

    private handleDayMouseEnter = (dateForDay, event) => {
      this.setState({ highlighted: dateForDay });
    }

    private renderMonth = month => (
      cloneElement(month, {
        highlighted: this.state.highlighted,
        onDayClick: this.props.onChange,
        onDayMouseEnter: this.handleDayMouseEnter,
        selected: this.props.selected,
      })
    )

    public render(): JSX.Element {
      const { children, onChange, selected, ...rest } = this.props;
      return (
        <MonthsWrapper {...rest} {...passProps(this.props, 'MonthsWrapper', this)}>
          {Children.map(children, child => (
            isComponentOfType(Month, child)
              ? this.renderMonth(child)
              : child
          ))}
        </MonthsWrapper>
      );
    }
  };
}
