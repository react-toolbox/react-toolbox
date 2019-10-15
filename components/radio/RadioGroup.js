import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { themr } from 'react-css-themr';
import { RADIO } from '../identifiers';
import InjectRadioButton from './RadioButton';
import isComponentOfType from '../utils/is-component-of-type';

const factory = (RadioButton) => {
  class RadioGroup extends Component {
    static propTypes = {
      children: PropTypes.node,
      className: PropTypes.string,
      disabled: PropTypes.bool,
      onChange: PropTypes.func,
      value: PropTypes.string,
    };

    static defaultProps = {
      className: '',
      disabled: false,
    };

    handleChange = (value, event) => {
      if (this.props.onChange) this.props.onChange(value, event);
    };

    renderRadioButtons() {
      return React.Children.map(this.props.children, child => (
        !isComponentOfType(RadioButton, child)
          ? child
          : React.cloneElement(child, {
            checked: child.props.value === this.props.value,
            disabled: this.props.disabled || child.props.disabled,
            onChange: this.handleChange.bind(this, child.props.value),
          })
      ));
    }

    render() {
      return (
        <div data-react-toolbox="radio-group" className={this.props.className}>
          {this.renderRadioButtons()}
        </div>
      );
    }
  }

  return RadioGroup;
};

const RadioGroup = factory(InjectRadioButton);
export default themr(RADIO)(RadioGroup);
export { factory as radioGroupFactory };
export { RadioGroup };
