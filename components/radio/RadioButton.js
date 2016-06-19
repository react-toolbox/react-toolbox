import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import { RADIO } from '../identifiers.js';
import rippleFactory from '../ripple/Ripple.js';
import radioFactory from './Radio.js';

const factory = (Radio) => {
  class RadioButton extends Component {
    static propTypes = {
      checked: PropTypes.bool,
      className: PropTypes.string,
      disabled: PropTypes.bool,
      label: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node
      ]),
      name: PropTypes.string,
      onBlur: PropTypes.func,
      onChange: PropTypes.func,
      onFocus: PropTypes.func,
      theme: PropTypes.shape({
        disabled: PropTypes.string,
        field: PropTypes.string,
        input: PropTypes.string,
        text: PropTypes.string
      }),
      value: PropTypes.any
    };

    static defaultProps = {
      checked: false,
      className: '',
      disabled: false
    };

    handleClick = (event) => {
      const {checked, disabled, onChange} = this.props;
      if (event.pageX !== 0 && event.pageY !== 0) this.blur();
      if (!disabled && !checked && onChange) onChange(event, this);
    };

    blur () {
      this.refs.input.blur();
    }

    focus () {
      this.refs.input.focus();
    }

    render () {
      const { className, checked, disabled, label, theme, onChange, ...others } = this.props;  // eslint-disable-line
      const _className = classnames(theme[this.props.disabled ? 'disabled' : 'field'], className);
      return (
        <label data-react-toolbox='radio-button' className={_className}>
          <input
            {...others}
            className={theme.input}
            onClick={this.handleClick}
            readOnly
            ref='input'
            type='radio'
          />
        <Radio checked={checked} disabled={disabled} theme={theme} />
          {label ? <span className={theme.text}>{label}</span> : null}
        </label>
      );
    }
  }

  return RadioButton;
};

const Radio = radioFactory(rippleFactory({ centered: true, spread: 2.6 }));
const RadioButton = factory(Radio);
export default themr(RADIO)(RadioButton);
export { factory as radioButtonFactory };
export { RadioButton };
