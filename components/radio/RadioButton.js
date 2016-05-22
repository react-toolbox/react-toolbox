import React from 'react';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import Radio from './Radio';

class RadioButton extends React.Component {
  static propTypes = {
    checked: React.PropTypes.bool,
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    label: React.PropTypes.string,
    name: React.PropTypes.string,
    onBlur: React.PropTypes.func,
    onChange: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    theme: React.PropTypes.shape({
      disabled: React.PropTypes.string.isRequired,
      field: React.PropTypes.string.isRequired,
      input: React.PropTypes.string.isRequired,
      text: React.PropTypes.string.isRequired
    }),
    value: React.PropTypes.any
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
        <Radio checked={checked} disabled={disabled}/>
        {label ? <span className={theme.text}>{label}</span> : null}
      </label>
    );
  }
}

export default themr('ToolboxRadio')(RadioButton);
