/* global React */

import { addons } from 'react/addons';
import Ripple from '../ripple';
import style from './style.scss';
import events from '../utils/events';

export default React.createClass({
  mixins: [addons.PureRenderMixin],

  displayName: 'Checkbox',

  propTypes: {
    checked: React.PropTypes.bool,
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    label: React.PropTypes.string,
    onBlur: React.PropTypes.func,
    onChange: React.PropTypes.func,
    onFocus: React.PropTypes.func
  },

  getDefaultProps () {
    return {
      className: '',
      disabled: false
    };
  },

  getInitialState () {
    return { checked: this.props.checked };
  },

  handleChange (event) {
    this.setState({checked: !this.state.checked});
    if (this.props.onChange) this.props.onChange(event, this);
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
    let checkboxClassName = style[this.state.checked ? 'checked' : 'check'];
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
          className={style.input}
          onChange={this.handleChange}
          checked={this.state.checked}
        />
        <span role='checkbox' className={checkboxClassName} onMouseDown={this.handleMouseDown}>
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
  },

  getValue () {
    return this.state.checked;
  },

  setValue (value) {
    this.setState({checked: value});
  }
});
