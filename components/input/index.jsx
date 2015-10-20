import React from 'react';
import style from './style.scss';
import FontIcon from '../font_icon';

export default class Input extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    error: React.PropTypes.string,
    floating: React.PropTypes.bool,
    icon: React.PropTypes.string,
    label: React.PropTypes.string,
    multiline: React.PropTypes.bool,
    onBlur: React.PropTypes.func,
    onChange: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onKeyPress: React.PropTypes.func,
    required: React.PropTypes.bool,
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

  state = {
    value: this.props.value
  };

  onChange (event) {
    this.setState({value: event.target.value}, () => {
      if (this.props.onChange) this.props.onChange(event, this);
    });
  }

  renderInput () {
    let className = style.input;
    if (this.state.value && this.state.value.length > 0) className += ` ${style.filled}`;

    if (this.props.multiline) {
      return (
        <textarea
          ref='input'
          role='input'
          {...this.props}
          className={className}
          onChange={::this.onChange}
          value={this.state.value} />
      );
    } else {
      return (
        <input
          ref='input'
          role='input'
          {...this.props}
          className={className}
          value={this.state.value}
          onChange={::this.onChange} />
      );
    }
  }

  render () {
    let className = style.root;
    let labelClassName = style.label;
    if (this.props.error) className += ` ${style.errored}`;
    if (this.props.disabled) className += ` ${style.disabled}`;
    if (this.props.className) className += ` ${this.props.className}`;
    if (this.props.type === 'hidden') className += ` ${style.hidden}`;
    if (this.props.icon) className += ` ${style['with-icon']}`;
    if (!this.props.floating) labelClassName += ` ${style.fixed}`;

    return (
      <div data-react-toolbox='input' className={className}>
        { this.renderInput() }
        { this.props.icon ? <FontIcon className={style.icon} value={this.props.icon} /> : null }
        <span className={style.bar}></span>
        { this.props.label ? <label className={labelClassName}>{this.props.label}</label> : null }
        { this.props.error ? <span className={style.error}>{this.props.error}</span> : null }
      </div>
    );
  }

  blur () {
    this.refs.input.blur();
  }

  focus () {
    this.refs.input.focus();
  }

  getValue () {
    return this.state.value;
  }

  setValue (value) {
    this.setState({value: value});
  }
};
