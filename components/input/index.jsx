/* global React */

import { addons } from 'react/addons';
import style from './style.scss';

export default React.createClass({
  mixins: [addons.PureRenderMixin],

  displayName: 'Input',

  propTypes: {
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    error: React.PropTypes.string,
    floating: React.PropTypes.bool,
    label: React.PropTypes.string,
    multiline: React.PropTypes.bool,
    onBlur: React.PropTypes.func,
    onChange: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onKeyPress: React.PropTypes.func,
    required: React.PropTypes.bool,
    type: React.PropTypes.string,
    value: React.PropTypes.any
  },

  getDefaultProps () {
    return {
      className: '',
      disabled: false,
      floating: true,
      multiline: false,
      required: false,
      type: 'text'
    };
  },

  getInitialState () {
    return { value: this.props.value };
  },

  onChange (event) {
    this.setState({value: this.refs.input.getDOMNode().value}, () => {
      if (this.props.onChange) this.props.onChange(event, this);
    });
  },

  renderInput () {
    let className = style.input;
    if (this.state.value && this.state.value.length > 0) className += ` ${style.filled}`;

    if (this.props.multiline) {
      return (
        <textarea
          ref='input'
          {...this.props}
          className={className}
          onChange={this.onChange}
          value={this.state.value} />
      );
    } else {
      return (
        <input
          ref='input'
          {...this.props}
          className={className}
          value={this.state.value}
          onChange={this.onChange} />
      );
    }
  },

  render () {
    let className = style.root;
    let labelClassName = style.label;
    if (this.props.error) className += ` ${style.errored}`;
    if (this.props.disabled) className += ` ${style.disabled}`;
    if (this.props.className) className += ` ${this.props.className}`;
    if (this.props.type === 'hidden') className += ` ${style.hidden}`;
    if (!this.props.floating) labelClassName += ` ${style.fixed}`;

    return (
      <div data-react-toolbox='input' className={className}>
        { this.renderInput() }
        <span className={style.bar}></span>
        { this.props.label ? <label className={labelClassName}>{this.props.label}</label> : null }
        { this.props.error ? <span className={style.error}>{this.props.error}</span> : null }
      </div>
    );
  },

  blur () {
    this.refs.input.getDOMNode().blur();
  },

  focus () {
    this.refs.input.getDOMNode().focus();
  },

  getValue () {
    return this.state.value;
  },

  setValue (value) {
    this.setState({value: value});
  }
});
