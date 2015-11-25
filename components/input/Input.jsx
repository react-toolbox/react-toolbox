import React from 'react';
import classNames from 'classnames';
import style from './style';
import FontIcon from '../font_icon';
import Tooltip from '../tooltip';

class Input extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    error: React.PropTypes.string,
    floating: React.PropTypes.bool,
    icon: React.PropTypes.string,
    label: React.PropTypes.string,
    maxLength: React.PropTypes.number,
    multiline: React.PropTypes.bool,
    onBlur: React.PropTypes.func,
    onChange: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onKeyPress: React.PropTypes.func,
    required: React.PropTypes.bool,
    tooltip: React.PropTypes.string,
    tooltipDelay: React.PropTypes.number,
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

  handleChange = (event) => {
    if (this.props.onChange) this.props.onChange(event.target.value, event);
  };

  renderInput () {
    let className = style.input;
    if (this.props.value && this.props.value.length > 0) className += ` ${style.filled}`;

    const element = this.props.multiline ? 'textarea' : 'input';
    return React.createElement(element, {
      ...this.props,
      className,
      onChange: this.handleChange,
      ref: 'input',
      role: 'input'
    });
  }

  renderUnderline () {
    const error = this.props.error ? <span className={style.error}>{this.props.error}</span> : null;
    let counter = null;
    if (this.props.maxLength) {
      const length = this.props.value ? this.props.value.length : 0;
      if (length > 0) counter = <span className={style.counter}>{length} / {this.props.maxLength}</span>;
    }
    if (error || counter) return <span className={style.underline}>{error}{counter}</span>;
  }

  blur () {
    this.refs.input.blur();
  }

  focus () {
    this.refs.input.focus();
  }

  render () {
    const className = classNames({
      [style.root]: true,
      [style.errored]: this.props.error,
      [style.disabled]: this.props.disabled,
      [this.props.className]: this.props.className,
      [style.hidden]: this.props.type === 'hidden',
      [style['with-icon']]: this.props.icon
    });

    const labelClassName = classNames({
      [style.label]: true,
      [style.fixed]: !this.props.floating
    });

    return (
      <div data-react-toolbox='input' className={className}>
        {this.renderInput()}
        {this.props.icon ? <FontIcon className={style.icon} value={this.props.icon} /> : null}
        <span className={style.bar}></span>
        {this.props.label ? <label className={labelClassName}>{this.props.label}</label> : null}
        {this.renderUnderline()}
        {this.props.tooltip ? <Tooltip label={this.props.tooltip} delay={this.props.tooltipDelay}/> : null}
      </div>
    );
  }
}

export default Input;
