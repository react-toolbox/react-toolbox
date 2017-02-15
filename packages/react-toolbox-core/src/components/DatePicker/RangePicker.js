import React, { cloneElement, PropTypes, Children, Component } from 'react';
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
  class RangePicker extends Component {
    static propTypes = {
      children: PropTypes.node,
      focusedInput: PropTypes.oneOf([START_DATE, END_DATE]),
      onChange: PropTypes.func,
      selected: dateShape,
    };

    static defaultProps = {
      focusedInput: START_DATE,
    };

    state = {
      selecting: false,
      highlighted: {},
    };

    isDateInvalid = (dateForDay) => {
      const { focusedInput } = this.props;
      const { from, to } = this.state.highlighted;
      return focusedInput === START_DATE
        ? (!from || dateForDay.getTime() < from.getTime())
        : (!to || dateForDay.getTime() > to.getTime());
    }

    handleDayClick = (dateForDay) => {
      const { focusedInput, onChange } = this.props;
      const { highlighted, selecting } = this.state;
      const firstSelect = focusedInput === START_DATE ? 'from' : 'to';

      if (selecting) {
        const secondSelect = focusedInput === START_DATE ? 'to' : 'from';
        const invalidSelected = this.isDateInvalid(dateForDay);
        if (invalidSelected) {
          const newHighlighted = { [firstSelect]: dateForDay };
          this.setState({ selecting: true, highlighted: newHighlighted });
          onChange(newHighlighted);
        } else {
          this.setState({ selecting: false, highlighted: {} });
          onChange({ ...highlighted, [secondSelect]: dateForDay });
        }
      } else {
        const newHighlighted = { [firstSelect]: dateForDay };
        this.setState({ selecting: true, highlighted: newHighlighted });
        onChange(newHighlighted);
      }
    }

    handleDayMouseEnter = (dateForDay) => {
      const { focusedInput } = this.props;
      const { highlighted, selecting } = this.state;
      const firstSelect = focusedInput === START_DATE ? 'from' : 'to';

      if (selecting) {
        const secondSelect = focusedInput === START_DATE ? 'to' : 'from';
        const invalidEntered = this.isDateInvalid(dateForDay);
        if (invalidEntered) {
          const newHighlighted = { [firstSelect]: highlighted[firstSelect] };
          this.setState({ highlighted: newHighlighted });
        } else {
          const newHighlighted = { ...highlighted, [secondSelect]: dateForDay };
          this.setState({ highlighted: newHighlighted });
        }
      }
    };

    renderMonth = month => (
      cloneElement(month, {
        highlighted: this.state.highlighted,
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
