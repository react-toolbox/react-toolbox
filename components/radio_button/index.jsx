/* global React */

import { addons } from 'react/addons';
import Ripple from '../ripple';
import style from './style';
import events from '../utils/events';

export default React.createClass({
  mixins: [addons.PureRenderMixin],

  displayName: 'RadioButton',

  propTypes: {
    checked: React.PropTypes.bool,
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    label: React.PropTypes.string,
    name: React.PropTypes.string,
    onBlur: React.PropTypes.func,
    onChange: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    value: React.PropTypes.any
  },

  getDefaultProps () {
    return {
      checked: false,
      className: '',
      disabled: false
    };
  },

  handleChange (event) {
    if (!this.props.checked && this.props.onChange) {
      this.props.onChange(event, this);
    }
  },

  handleClick (event) {
    events.pauseEvent(event);
    if (!this.props.disabled) this.handleChange(event);
  },

  handleMouseDown (event) {
    if (!this.props.disabled) this.refs.ripple.start(event);
  },

  render () {
    let labelClassName = style[this.props.disabled ? 'disabled' : 'field'];
    let radioClassName = style[this.props.checked ? 'radio-checked' : 'radio'];
    if (this.props.className) labelClassName += ` ${this.props.className}`;

    return (
      <label className={labelClassName} onClick={this.handleClick}>
        <input
          {...this.props}
          ref='input'
          type='radio'
          className={style.input}
          onChange={this.handleChange}
        />
        <span role='radio' className={radioClassName} onMouseDown={this.handleMouseDown}>
          <Ripple ref='ripple' role='ripple' className={style.ripple} spread={3} centered />
        </span>
        { this.props.label ? <span className={style.text}>{this.props.label}</span> : null }
      </label>
    );
  },

  blur () {
    this.refs.input.getDOMNode().blur();
  },

  focus () {
    this.refs.input.getDOMNode().focus();
  }
});
