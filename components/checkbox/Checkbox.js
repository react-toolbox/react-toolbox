import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import { CHECKBOX } from '../identifiers';
import rippleFactory from '../ripple/Ripple';
import checkFactory from './Check';

const factory = (Check) => {
  class Checkbox extends Component {
    static propTypes = {
      checked: PropTypes.bool,
      className: PropTypes.string,
      disabled: PropTypes.bool,
      htmlFor: PropTypes.string,
      label: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node,
      ]),
      name: PropTypes.string,
      onChange: PropTypes.func,
      style: PropTypes.object,
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
      this.inputRoot.blur();
    }

    focus() {
      this.inputRoot.focus();
    }

    render() {
      // eslint-disable-next-line no-unused-vars
      const { onChange, theme, style, htmlFor, ...others } = this.props;
      const className = classnames(theme.field, {
        [theme.disabled]: this.props.disabled,
      }, this.props.className);

      return (
        <label data-react-toolbox="checkbox" className={className} htmlFor={htmlFor}>
          <input
            {...others}
            className={theme.input}
            onClick={this.handleToggle}
            readOnly
            ref={(node) => { this.inputRoot = node; }}
            type="checkbox"
          />
          <Check
            checked={this.props.checked}
            disabled={this.props.disabled}
            rippleClassName={theme.ripple}
            style={style}
            theme={this.props.theme}
          />
          { this.props.label
            ? <span data-react-toolbox="label" className={theme.text}>{this.props.label}</span>
            : null
          }
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
