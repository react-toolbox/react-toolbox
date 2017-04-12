import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import { RADIO } from '../identifiers';
import rippleFactory from '../ripple/Ripple';
import radioFactory from './Radio';

const factory = (Radio) => {
  class RadioButton extends Component {
    static propTypes = {
      checked: PropTypes.bool,
      children: PropTypes.node,
      className: PropTypes.string,
      disabled: PropTypes.bool,
      label: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node,
      ]),
      name: PropTypes.string,
      onBlur: PropTypes.func,
      onChange: PropTypes.func,
      onFocus: PropTypes.func,
      onMouseEnter: PropTypes.func,
      onMouseLeave: PropTypes.func,
      theme: PropTypes.shape({
        disabled: PropTypes.string,
        field: PropTypes.string,
        input: PropTypes.string,
        text: PropTypes.string,
      }),
      value: PropTypes.string,
    };

    static defaultProps = {
      checked: false,
      className: '',
      disabled: false,
    };

    handleClick = (event) => {
      const { checked, disabled, onChange } = this.props;
      if (event.pageX !== 0 && event.pageY !== 0) this.blur();
      if (!disabled && !checked && onChange) onChange(event, this);
    };

    blur() {
      if (this.inputNode) {
        this.inputNode.blur();
      }
    }

    focus() {
      if (this.inputNode) {
        this.inputNode.focus();
      }
    }

    render() {
      const {
        checked,
        children,
        className,
        disabled,
        label,
        name,
        onChange, // eslint-disable-line
        onMouseEnter,
        onMouseLeave,
        theme,
        ...others
      } = this.props;
      const _className = classnames(theme[this.props.disabled ? 'disabled' : 'field'], className);
      return (
        <label
          data-react-toolbox="radio-button"
          className={_className}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <input
            {...others}
            checked={checked}
            className={theme.input}
            disabled={disabled}
            name={name}
            onChange={() => {}}
            onClick={this.handleClick}
            ref={(node) => { this.inputNode = node; }}
            type="radio"
          />
          <Radio checked={checked} disabled={disabled} theme={theme} />
          {label ? <span className={theme.text}>{label}</span> : null}
          {children}
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
