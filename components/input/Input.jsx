import React from 'react';
import ClassNames from 'classnames';
import FontIcon from '../font_icon';
import style from './style';

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
    onBlur: React.PropTypes.func,
    onChange: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onKeyPress: React.PropTypes.func,
    required: React.PropTypes.bool,
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
            label: labelText, maxLength, multiline, required,
            type, value, ...others} = this.props;
    const length = maxLength && value ? value.length : 0;
    const labelClassName = ClassNames(style.label, {[style.fixed]: !floating});

    const className = ClassNames(style.root, {
      [style.disabled]: disabled,
      [style.errored]: error,
      [style.hidden]: type === 'hidden',
      [style.withIcon]: icon
    }, this.props.className);

    const valuePresent = value !== null && value !== undefined && value !== '' && !Number.isNaN(value);

    const InputElement = React.createElement(multiline ? 'textarea' : 'input', {
      ...others,
      className: ClassNames(style.input, {[style.filled]: valuePresent}),
      onChange: this.handleChange,
      ref: 'input',
      role: 'input',
      disabled,
      required,
      type,
      value,
      maxLength
    });

    return (
      <div data-react-toolbox='input' className={className}>
        {InputElement}
        {icon ? <FontIcon className={style.icon} value={icon} /> : null}
        <span className={style.bar}></span>
        {labelText
          ? <label className={labelClassName}>
              {labelText}
              {required ? <span className={style.required}> * </span> : null}
            </label>
          : null}
        {hint ? <span className={style.hint}>{hint}</span> : null}
        {error ? <span className={style.error}>{error}</span> : null}
        {maxLength ? <span className={style.counter}>{length}/{maxLength}</span> : null}
        {children}
      </div>
    );
  }
}

export default Input;
