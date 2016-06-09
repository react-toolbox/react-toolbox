import React from 'react';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import { INPUT } from '../identifiers.js';
import InjectedFontIcon from '../font_icon/FontIcon.js';

const factory = (FontIcon) => {
  class Input extends React.Component {
    static propTypes = {
      children: React.PropTypes.any,
      className: React.PropTypes.string,
      disabled: React.PropTypes.bool,
      error: React.PropTypes.string,
      floating: React.PropTypes.bool,
      hint: React.PropTypes.string,
      icon: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.element
      ]),
      label: React.PropTypes.string,
      maxLength: React.PropTypes.number,
      multiline: React.PropTypes.bool,
      name: React.PropTypes.string,
      onBlur: React.PropTypes.func,
      onChange: React.PropTypes.func,
      onFocus: React.PropTypes.func,
      onKeyPress: React.PropTypes.func,
      required: React.PropTypes.bool,
      theme: React.PropTypes.shape({
        bar: React.PropTypes.string,
        counter: React.PropTypes.string,
        disabled: React.PropTypes.string,
        error: React.PropTypes.string,
        errored: React.PropTypes.string,
        hidden: React.PropTypes.string,
        hint: React.PropTypes.string,
        icon: React.PropTypes.string,
        input: React.PropTypes.string,
        inputElement: React.PropTypes.string,
        required: React.PropTypes.string,
        withIcon: React.PropTypes.string
      }),
      type: React.PropTypes.string,
      value: React.PropTypes.any
    };

    static defaultProps = {
      className: '',
      hint: '',
      disabled: false,
      floating: true,
      multiline: false,
      required: false,
      type: 'text'
    };

    handleChange = (event) => {
      if (this.props.onChange) this.props.onChange(event.target.value, event);
    };

    blur () {
      this.refs.input.blur();
    }

    focus () {
      this.refs.input.focus();
    }

    render () {
      const { children, disabled, error, floating, hint, icon,
              name, label: labelText, maxLength, multiline, required,
              theme, type, value, ...others} = this.props;
      const length = maxLength && value ? value.length : 0;
      const labelClassName = classnames(theme.label, {[theme.fixed]: !floating});

      const className = classnames(theme.input, {
        [theme.disabled]: disabled,
        [theme.errored]: error,
        [theme.hidden]: type === 'hidden',
        [theme.withIcon]: icon
      }, this.props.className);

      const valuePresent = value !== null && value !== undefined && value !== '' && !Number.isNaN(value);

      const InputElement = React.createElement(multiline ? 'textarea' : 'input', {
        ...others,
        className: classnames(theme.inputElement, {[theme.filled]: valuePresent}),
        onChange: this.handleChange,
        ref: 'input',
        role: 'input',
        name,
        disabled,
        required,
        type,
        value,
        maxLength
      });

      return (
        <div data-react-toolbox='input' className={className}>
          {InputElement}
          {icon ? <FontIcon className={theme.icon} value={icon} /> : null}
          <span className={theme.bar}></span>
          {labelText
            ? <label className={labelClassName}>
                {labelText}
                {required ? <span className={theme.required}> * </span> : null}
              </label>
            : null}
          {hint ? <span className={theme.hint}>{hint}</span> : null}
          {error ? <span className={theme.error}>{error}</span> : null}
          {maxLength ? <span className={theme.counter}>{length}/{maxLength}</span> : null}
          {children}
        </div>
      );
    }
  }

  return Input;
};

const Input = factory(InjectedFontIcon);
export default themr(INPUT)(Input);
export { factory as inputFactory };
export { Input };
