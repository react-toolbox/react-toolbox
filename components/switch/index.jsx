import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Ripple from '../ripple';
import style from './style';
import events from '../utils/events';

export default React.createClass({
  mixins: [PureRenderMixin],

  displayName: 'Switch',

  propTypes: {
    checked: React.PropTypes.bool,
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    label: React.PropTypes.string,
    name: React.PropTypes.string,
    onBlur: React.PropTypes.func,
    onChange: React.PropTypes.func,
    onFocus: React.PropTypes.func
  },

  getDefaultProps () {
    return {
      checked: false,
      className: '',
      disabled: false
    };
  },

  getInitialState () {
    return { checked: this.props.checked };
  },

  handleChange (event) {
    this.setState({checked: !this.state.checked}, () => {
      if (this.props.onChange) this.props.onChange(event, this);
    });
  },

  handleClick (event) {
    events.pauseEvent(event);
    if (!this.props.disabled) this.handleChange(event);
  },

  handleInputClick (event) {
    events.pauseEvent(event);
  },

  handleMouseDown (event) {
    if (!this.props.disabled) this.refs.ripple.start(event);
  },

  render () {
    let labelClassName = style[this.props.disabled ? 'disabled' : 'field'];
    let switchClassName = style[this.state.checked ? 'switch-on' : 'switch-off'];
    if (this.props.className) labelClassName += ` ${this.props.className}`;

    return (
      <label
        data-react-toolbox='checkbox'
        className={labelClassName}
        onClick={this.handleClick}
      >
        <input
          {...this.props}
          ref='input'
          type='checkbox'
          checked={this.state.checked}
          className={style.input}
          onChange={this.handleChange}
          onClick={this.handleInputClick}
        />
        <span role='switch' className={switchClassName}>
          <span role='thumb' className={style.thumb} onMouseDown={this.handleMouseDown}>
            <Ripple ref='ripple' role='ripple' className={style.ripple} spread={2.4} centered />
          </span>
        </span>
        { this.props.label ? <span className={style.text}>{this.props.label}</span> : null }
      </label>
    );
  },

  blur () {
    this.refs.input.blur();
  },

  focus () {
    this.refs.input.focus();
  },

  getValue () {
    return this.state.checked;
  },

  setValue (value) {
    this.setState({checked: value});
  }
});
