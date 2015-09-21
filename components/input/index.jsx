/* global React */

import { addons } from 'react/addons';
import style from './style';

export default React.createClass({
  mixins: [addons.PureRenderMixin],

  displayName: 'Input',

  propTypes: {
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    error: React.PropTypes.string,
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
      multiline: false,
      required: false,
      type: 'text'
    };
  },

  getInitialState () {
    return {
      checked: this.props.value,
      error: this.props.error,
      touch: ['checkbox', 'radio'].indexOf(this.props.type) !== -1,
      value: this.props.value,
      focus: false,
      valid: false
    };
  },

  onBlur (event) {
    this.setState({focus: false});
    if (this.props.onBlur) this.props.onBlur(event, this);
  },

  onChange (event) {
    if (this.state.touch) {
      this.setState({checked: event.target.checked, error: undefined});
    } else {
      this.setState({value: event.target.value, error: undefined});
    }
    if (this.props.onChange) this.props.onChange(event, this);
  },

  onFocus (event) {
    this.setState({focus: true});
    if (this.props.onFocus) this.props.onFocus(event, this);
  },

  onKeyPress (event) {
    this.setState({focus: true});
    if (this.props.onKeyPress) this.props.onKeyPress(event, this);
  },

  renderInput () {
    if (this.props.multiline) {
      return (
        <textarea
          ref='input'
          {...this.props}
          onChange={this.onChange}
          onKeyPress={this.onKeyPress}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          value={this.state.value} />
      );
    } else if (this.props.type === 'file') {
      return (
        <input
          ref='input'
          {...this.props}
          value={undefined}
          onChange={this.onChange} />
      );
    } else {
      return (
        <input
          ref='input'
          {...this.props}
          value={this.state.value}
          checked={this.state.checked}
          onBlur={this.onBlur}
          onChange={this.onChange}
          onFocus={this.onFocus}
          onKeyPress={this.onKeyPress} />
      );
    }
  },

  render () {
    let className = `${style.root} ${this.props.className}`;
    if (this.props.type) className += ` ${this.props.type}`;
    if (this.state.checked) className += ' checked';
    if (this.props.disabled) className += ' disabled';
    if (this.state.error) className += ' error';
    if (this.state.focus) className += ' focus';
    if (this.props.type === 'hidden') className += ' hidden';
    if (this.state.touch) className += ' touch';
    if (this.props.type === 'radio') className += ' radio';
    if (this.state.value && this.state.value.length > 0) className += ' valid';

    return (
      <div data-react-toolbox='input' className={className}>
        { this.renderInput() }
        <span className='bar'></span>
        { this.props.label ? <label>{this.props.label}</label> : null }
        { this.state.error ? <span className='error'>{this.state.error}</span> : null }
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
    if (this.props.type === 'file') {
      return this.state.value;
    } else if (this.refs.input) {
      return this.refs.input.getDOMNode()[this.state.touch ? 'checked' : 'value'];
    }
  },

  setError (data = 'Unknown error') {
    this.setState({error: this.props.error || data});
  },

  setValue (argData) {
    let data = this.state.touch && argData === undefined ? false : argData;
    let attributes = { value: data };
    if (this.state.touch && data) attributes.checked = data;
    this.setState(attributes);
  }
});
