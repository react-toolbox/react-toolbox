import React from 'react';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import Check from './Check';

class Checkbox extends React.Component {
  static propTypes = {
    checked: React.PropTypes.bool,
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    label: React.PropTypes.any,
    onChange: React.PropTypes.func,
    theme: React.PropTypes.shape({
      disabled: React.PropTypes.string.isRequired,
      field: React.PropTypes.string.isRequired,
      input: React.PropTypes.string.isRequired,
      ripple: React.PropTypes.string.isRequired
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
    const { onChange, theme, ...others } = this.props; //eslint-disable-line no-unused-vars
    const className = classnames(theme.field, {
      [theme.disabled]: this.props.disabled
    }, this.props.className);

    return (
      <label data-react-toolbox='checkbox' className={className}>
        <input
          {...others}
          className={theme.input}
          onClick={this.handleToggle}
          readOnly
          ref='input'
          type='checkbox'
        />
        <Check rippleClassName={theme.ripple} checked={this.props.checked} disabled={this.props.disabled}/>
        {this.props.label ? <span data-react-toolbox='label' className={theme.text}>{this.props.label}</span> : null}
      </label>
    );
  }
}

export default themr('ToolboxCheckbox')(Checkbox);
