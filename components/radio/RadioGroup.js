import React, { Component, PropTypes } from 'react';
import { themr } from 'react-css-themr';
import { RADIO } from '../identifiers.js';
import InjectRadioButton from './RadioButton.js';
import { isComponentOfType } from '../utils/react.js';

const factory = (RadioButton) => {
  class RadioGroup extends Component {
    static propTypes = {
      children: PropTypes.node,
      className: PropTypes.string,
      disabled: PropTypes.bool,
      name: PropTypes.string,
      onChange: PropTypes.func,
      value: PropTypes.any
    };

    static defaultProps = {
      className: '',
      disabled: false
    };

    handleChange = (value) => {
      if (this.props.onChange) this.props.onChange(value);
    };

    renderRadioButtons () {
      return React.Children.map(this.props.children, child => (
        !isComponentOfType(RadioButton, child)
          ? child
          : React.cloneElement(child, {
              checked: child.props.value === this.props.value,
              disabled: this.props.disabled || child.props.disabled,
              onChange: this.handleChange.bind(this, child.props.value)
            })
      ));
    }

    render () {
      return (
        <div data-react-toolbox='radio-group' className={this.props.className}>
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
