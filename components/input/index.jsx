import React from 'react';
import style from './style';
import FontIcon from '../font_icon';

class Input extends React.Component {
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

  renderInput () {
    let className = style.input;
    if (this.props.value && this.props.value.length > 0) className += ` ${style.filled}`;
    if (this.props.multiline) {
      return <textarea ref='input' role='input' {...this.props} className={className} />;
    } else {
      return <input ref='input' role='input' {...this.props} className={className} />;
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
}

export default Input;
