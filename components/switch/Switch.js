import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import { SWITCH } from '../identifiers.js';
import rippleFactory from '../ripple/Ripple.js';
import thumbFactory from './Thumb.js';

const factory = (Thumb) => {
  class Switch extends Component {
    static propTypes = {
      checked: PropTypes.bool,
      className: PropTypes.string,
      disabled: PropTypes.bool,
      label: PropTypes.string,
      name: PropTypes.string,
      onBlur: PropTypes.func,
      onChange: PropTypes.func,
      onFocus: PropTypes.func,
      theme: PropTypes.shape({
        disabled: PropTypes.string,
        field: PropTypes.string,
        input: PropTypes.string,
        off: PropTypes.string,
        on: PropTypes.string,
        ripple: PropTypes.string,
        text: PropTypes.string,
        thumb: PropTypes.string
      })
    };

    static defaultProps = {
      checked: false,
      className: '',
      disabled: false
    };

    handleToggle = (event) => {
      if (event.pageX !== 0 && event.pageY !== 0) this.blur();
      if (!this.props.disabled && this.props.onChange) {
        this.props.onChange(!this.props.checked, event);
      }
    };

    blur () {
      this.refs.input.blur();
    }

    focus () {
      this.refs.input.focus();
    }

    render () {
      const { className, checked, disabled, onChange, theme, ...others } = this.props; //eslint-disable-line no-unused-vars
      const _className = classnames(theme[disabled ? 'disabled' : 'field'], className);
      return (
        <label data-react-toolbox='switch' className={_className}>
          <input
            {...others}
            checked={this.props.checked}
            className={theme.input}
            onClick={this.handleToggle}
            readOnly
            ref='input'
            type='checkbox'
          />
          <span className={theme[checked ? 'on' : 'off']}>
            <Thumb disabled={this.props.disabled} theme={theme} />
          </span>
          {this.props.label ? <span className={theme.text}>{this.props.label}</span> : null}
        </label>
      );
    }
  }

  return Switch;
};

const Thumb = thumbFactory(rippleFactory({ centered: true, spread: 2.6 }));
const Switch = factory(Thumb);

export default themr(SWITCH)(Switch);
export { factory as switchFactory };
export { Switch };
