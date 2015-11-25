import React from 'react';
import Ripple from '../ripple';
import style from './style';
import events from '../utils/events';

class Switch extends React.Component {
  static propTypes = {
    checked: React.PropTypes.bool,
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    label: React.PropTypes.string,
    name: React.PropTypes.string,
    onBlur: React.PropTypes.func,
    onChange: React.PropTypes.func,
    onFocus: React.PropTypes.func
  };

  static defaultProps = {
    checked: false,
    className: '',
    disabled: false
  };

  handleChange = (event) => {
    events.pauseEvent(event);
    if (this.props.onChange && !this.props.disabled) {
      const value = !this.refs.input.checked;
      this.props.onChange(value, event);
    }
  };

  handleInputClick = (event) => {
    events.pauseEvent(event);
  };

  handleMouseDown = (event) => {
    if (!this.props.disabled) this.refs.ripple.start(event);
  };

  blur () {
    this.refs.input.blur();
  }

  focus () {
    this.refs.input.focus();
  }

  render () {
    let labelClassName = style[this.props.disabled ? 'disabled' : 'field'];
    const switchClassName = style[this.props.checked ? 'on' : 'off'];
    if (this.props.className) labelClassName += ` ${this.props.className}`;

    return (
      <label
        data-react-toolbox='checkbox'
        className={labelClassName}
        onClick={this.handleChange}
      >
        <input
          {...this.props}
          ref='input'
          checked={this.props.checked}
          className={style.input}
          onChange={this.handleChange}
          onClick={this.handleInputClick}
          type='checkbox'
        />
        <span role='switch' className={switchClassName}>
          <span role='thumb' className={style.thumb} onMouseDown={this.handleMouseDown}>
            <Ripple ref='ripple' role='ripple' className={style.ripple} spread={2.4} centered />
          </span>
        </span>
        {this.props.label ? <span className={style.text}>{this.props.label}</span> : null}
      </label>
    );
  }
}

export default Switch;
