import React, { cloneElement, PropTypes, Children, Component } from 'react';
import isComponentOfType from '../../utils/isComponentOfType';
import getPassThrough from '../../utils/getPassThrough';

const singlePickerFactory = ({
  MonthsWrapper,
  Month,
  passthrough,
}) => {
  const passProps = getPassThrough(passthrough);
  class SinglePicker extends Component {
    static propTypes = {
      children: PropTypes.node,
      onChange: PropTypes.func,
      selected: PropTypes.instanceOf(Date),
    };

    state = {
      highlighted: null,
    };

    handleDayMouseEnter = (dateForDay) => {
      this.setState({ highlighted: dateForDay });
    };

    handleMonthMouseLeave = () => {
      this.setState({ highlighted: null });
    }

    renderMonth = month => (
      cloneElement(month, {
        highlighted: this.state.highlighted,
        onDayClick: this.props.onChange,
        onDayMouseEnter: this.handleDayMouseEnter,
        onMouseLeave: this.handleMonthMouseLeave,
        selected: this.props.selected,
      })
    );

    render() {
      const {
        children,
        onChange, // eslint-disable-line
        selected, // eslint-disable-line
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

  return SinglePicker;
};

export default singlePickerFactory;
