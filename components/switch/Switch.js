import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import { SWITCH } from '../identifiers';
import rippleFactory from '../ripple/Ripple';
import thumbFactory from './Thumb';

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
      ripple: PropTypes.bool,
      theme: PropTypes.shape({
        disabled: PropTypes.string,
        field: PropTypes.string,
        input: PropTypes.string,
        off: PropTypes.string,
        on: PropTypes.string,
        ripple: PropTypes.string,
        text: PropTypes.string,
        thumb: PropTypes.string,
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
      this.inputNode.blur();
    }

    focus() {
      this.inputNode.focus();
    }

    render() {
      const {
        checked,
        className,
        disabled,
        onChange, // eslint-disable-line no-unused-vars
        ripple,
        theme,
        ...others
      } = this.props;
      const _className = classnames(theme[disabled ? 'disabled' : 'field'], className);
      return (
        <label data-react-toolbox="switch" className={_className}>
          <input
            {...others}
            checked={this.props.checked}
            className={theme.input}
            onClick={this.handleToggle}
            readOnly
            ref={(node) => { this.inputNode = node; }}
            type="checkbox"
          />
          <span className={theme[checked ? 'on' : 'off']}>
            <Thumb disabled={this.props.disabled} theme={theme} ripple={ripple} />
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
