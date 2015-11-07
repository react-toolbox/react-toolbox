import React from 'react';
import Ripple from '../ripple';
import events from '../utils/events';
import style from './style';

class Checkbox extends React.Component {
  static propTypes = {
    checked: React.PropTypes.bool,
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    label: React.PropTypes.any,
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

  state = {
    checked: this.props.checked
  };

  componentWillReceiveProps = (next_props) => {
    console.log('componentWillReceiveProps', next_props.checked);
    // this.setState({ checked: next_props.checked });
  };

  handleChange = (event) => {
    this.setState({checked: !this.state.checked}, () => {
      if (this.props.onChange) this.props.onChange(event, this);
    });
  };

  handleClick = (event) => {
    events.pauseEvent(event);
    if (!this.props.disabled) this.handleChange(event);
  };

  handleInputClick = (event) => {
    events.pauseEvent(event);
  };

  handleMouseDown = (event) => {
    if (!this.props.disabled) this.refs.ripple.start(event);
  };

  render () {
    let fieldClassName = style.field;
    let checkboxClassName = style.check;
    if (this.state.checked) checkboxClassName += ` ${style.checked}`;
    if (this.props.disabled) fieldClassName += ` ${style.disabled}`;
    if (this.props.className) fieldClassName += ` ${this.props.className}`;

    return (
      <label
        data-react-toolbox='checkbox'
        className={fieldClassName}
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
        <span data-role='checkbox' className={checkboxClassName} onMouseDown={this.handleMouseDown}>
          <Ripple ref='ripple' data-role='ripple' className={style.ripple} spread={3} centered />
        </span>
        { this.props.label ? <span data-role='label' className={style.text}>{this.props.label}</span> : null }
      </label>
    );
  }

  blur () {
    this.refs.input.blur();
  }

  focus () {
    this.refs.input.focus();
  }

  getValue () {
    return this.state.checked;
  }

  setValue (value) {
    this.setState({checked: value});
  }
}

export default Checkbox;
