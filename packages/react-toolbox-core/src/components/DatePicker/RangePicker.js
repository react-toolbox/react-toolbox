import React, { cloneElement, PropTypes, Children, PureComponent } from 'react';
import isComponentOfType from '../../utils/isComponentOfType';
import getPassThrough from '../../utils/getPassThrough';
import { START_DATE, END_DATE } from './constants';
import dateShape from './dateShape';

const rangePickerFactory = ({
  MonthsWrapper,
  Month,
  passthrough,
}) => {
  const passProps = getPassThrough(passthrough);
  class RangePicker extends PureComponent {
    static propTypes = {
      children: PropTypes.node,
      focusedInput: PropTypes.oneOf([START_DATE, END_DATE]),
      highlighted: dateShape,
      onChange: PropTypes.func,
      onHighlightedChange: PropTypes.func,
      selected: dateShape,
    };

    static defaultProps = {
      onHighlightedChange: () => {},
      focusedInput: START_DATE,
      highlighted: {},
    };

    selecting = false;

    isDateInvalid = (dateForDay) => {
      const { focusedInput, selected } = this.props;
      const { from, to } = selected || {};
      return focusedInput === START_DATE
        ? (!from || dateForDay.getTime() < from.getTime())
        : (!to || dateForDay.getTime() > to.getTime());
    }

    handleDayClick = (dateForDay) => {
      const { selected, focusedInput, highlighted, onChange, onHighlightedChange } = this.props;
      const { selecting } = this;
      const firstSelect = focusedInput === START_DATE ? 'from' : 'to';

      if (selecting) {
        const secondSelect = focusedInput === START_DATE ? 'to' : 'from';
        const invalidSelected = this.isDateInvalid(dateForDay);
        if (invalidSelected) {
          const newHighlighted = { [firstSelect]: dateForDay };
          this.selecting = true;
          onHighlightedChange(newHighlighted);
          onChange(newHighlighted);
        } else {
          this.selecting = false;
          onHighlightedChange({});
          onChange({ ...selected, [secondSelect]: dateForDay });
        }
      } else {
        const newHighlighted = { [firstSelect]: dateForDay };
        this.selecting = true;
        onHighlightedChange(newHighlighted);
        onChange(newHighlighted);
      }
    }

    handleDayMouseEnter = (dateForDay) => {
      const { focusedInput, highlighted, onHighlightedChange } = this.props;
      const firstSelect = focusedInput === START_DATE ? 'from' : 'to';
      const { selecting } = this;

      if (selecting) {
        const secondSelect = focusedInput === START_DATE ? 'to' : 'from';
        const invalidEntered = this.isDateInvalid(dateForDay);
        if (invalidEntered) {
          const newHighlighted = { [firstSelect]: highlighted[firstSelect] };
          onHighlightedChange(newHighlighted);
        } else {
          const newHighlighted = { ...highlighted, [secondSelect]: dateForDay };
          onHighlightedChange(newHighlighted);
        }
      }
    };

    renderMonth = month => (
      cloneElement(month, {
        highlighted: this.props.highlighted,
        onDayClick: this.handleDayClick,
        onDayMouseEnter: this.handleDayMouseEnter,
        selected: this.props.selected,
      })
    );

    render() {
      const {
        children,
        focusedInput, // eslint-disable-line
        onChange,     // eslint-disable-line
        selected,     // eslint-disable-line
        ...rest
      } = this.props;
      return (
        <MonthsWrapper {...rest} {...passProps(this.props, 'MonthsWrapper')}>
          {Children.map(children, child => (
            isComponentOfType(Month, child)
              ? this.renderMonth(child)
              : child
          ))}
        </MonthsWrapper>
      );
    }
  }

  return RangePicker;
};

export default rangePickerFactory;
