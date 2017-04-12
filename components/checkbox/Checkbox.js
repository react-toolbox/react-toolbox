import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styleShape from 'react-style-proptype';
import { themr } from 'react-css-themr';
import { CHECKBOX } from '../identifiers';
import rippleFactory from '../ripple/Ripple';
import checkFactory from './Check';

const factory = (Check) => {
  class Checkbox extends Component {
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
      onChange: PropTypes.func,
      onMouseEnter: PropTypes.func,
      onMouseLeave: PropTypes.func,
      style: styleShape,
      theme: PropTypes.shape({
        disabled: PropTypes.string,
        field: PropTypes.string,
        input: PropTypes.string,
        ripple: PropTypes.string,
      }),
    };

    static defaultProps = {
      checked: false,
      className: '',
      disabled: false,
    };

    handleToggle = (event) => {
      if (event.pageX !== 0 && event.pageY !== 0) this.blur();
      if (!this.props.disabled && this.props.onChange) {
        this.props.onChange(!this.props.checked, event);
      }
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
      const { checked, children, disabled, label, name, style, onChange, // eslint-disable-line
        onMouseEnter, onMouseLeave, theme, ...others } = this.props;
      const className = classnames(theme.field, {
        [theme.disabled]: this.props.disabled,
      }, this.props.className);

      return (
        <label
          data-react-toolbox="checkbox"
          className={className}
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
            onClick={this.handleToggle}
            ref={(node) => { this.inputNode = node; }}
            type="checkbox"
          />
          <Check
            checked={checked}
            disabled={disabled}
            rippleClassName={theme.ripple}
            style={style}
            theme={theme}
          />
          {label ? <span data-react-toolbox="label" className={theme.text}>{label}</span> : null}
          {children}
        </label>
      );
    }
  }

  return Checkbox;
};

const Check = checkFactory(rippleFactory({ centered: true, spread: 2.6 }));
const Checkbox = factory(Check);
export default themr(CHECKBOX)(Checkbox);
export { factory as checkboxFactory };
export { Checkbox };
