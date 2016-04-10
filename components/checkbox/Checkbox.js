import React from 'react';
import ClassNames from 'classnames';
import Check from './Check';
import style from './style';

class Checkbox extends React.Component {
  static propTypes = {
    checked: React.PropTypes.bool,
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    label: React.PropTypes.any,
    onChange: React.PropTypes.func
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
    const { onChange, ...others } = this.props; //eslint-disable-line no-unused-vars
    const className = ClassNames(style.field, {
      [style.disabled]: this.props.disabled
    }, this.props.className);

    return (
      <label data-react-toolbox='checkbox' className={className}>
        <input
          {...others}
          className={style.input}
          onClick={this.handleToggle}
          readOnly
          ref='input'
          type='checkbox'
        />
        <Check checked={this.props.checked} disabled={this.props.disabled}/>
        {this.props.label ? <span data-react-toolbox='label' className={style.text}>{this.props.label}</span> : null}
      </label>
    );
  }
}

export default Checkbox;
