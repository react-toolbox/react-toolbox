import React from 'react';
import ClassNames from 'classnames';
import FontIcon from '../font_icon';
import Tooltip from '../tooltip';
import style from './style';

class Input extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    error: React.PropTypes.string,
    floating: React.PropTypes.bool,
    icon: React.PropTypes.string,
    label: React.PropTypes.string,
    maxLength: React.PropTypes.number,
    multiline: React.PropTypes.bool,
    onBlur: React.PropTypes.func,
    onChange: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onKeyPress: React.PropTypes.func,
    required: React.PropTypes.bool,
    tooltip: React.PropTypes.string,
    tooltipDelay: React.PropTypes.number,
    type: React.PropTypes.string,
    value: React.PropTypes.any
  };

  static defaultProps = {
    className: '',
    disabled: false,
    floating: true,
    multiline: false,
    required: false,
    type: 'text'
  };

  handleChange = (event) => {
    if (this.props.onChange) this.props.onChange(event.target.value, event);
  };

  renderInput () {
    const {multiline, value, ...others} = this.props;
    const className = ClassNames(style.input, {[style.filled]: value});

    return React.createElement(multiline ? 'textarea' : 'input', {
      ...others,
      className,
      onChange: this.handleChange,
      ref: 'input',
      role: 'input',
      value
    });
  }

  blur () {
    this.refs.input.blur();
  }

  focus () {
    this.refs.input.focus();
  }

  render () {
    const {disabled, error, icon, floating, label: labelText,
           maxLength, tooltip, tooltipDelay, type, value} = this.props;
    const length = maxLength && value ? value.length : 0;
    const labelClassName = ClassNames(style.label, {[style.fixed]: !floating});
    const className = ClassNames(style.root, {
      [style.disabled]: disabled,
      [style.errored]: error,
      [style.hidden]: type === 'hidden',
      [style.withIcon]: icon
    }, this.props.className);

    return (
      <div data-react-toolbox='input' className={className}>
        {this.renderInput()}
        {icon ? <FontIcon className={style.icon} value={icon} /> : null}
        <span className={style.bar}></span>
        {labelText ? <label className={labelClassName}>{labelText}</label> : null}
        {error ? <span className={style.error}>{error}</span> : null}
        {maxLength ? <span className={style.counter}>{length}/{maxLength}</span> : null}
        {tooltip ? <Tooltip label={tooltip} delay={tooltipDelay}/> : null}
      </div>
    );
  }
}

export default Input;
