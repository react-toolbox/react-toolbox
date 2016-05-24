import React from 'react';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import Thumb from './Thumb';

class Switch extends React.Component {
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
      disabled: React.PropTypes.string,
      field: React.PropTypes.string,
      input: React.PropTypes.string,
      off: React.PropTypes.string,
      on: React.PropTypes.string,
      ripple: React.PropTypes.string,
      text: React.PropTypes.string,
      thumb: React.PropTypes.string
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

export default themr('ToolboxSwitch')(Switch);
