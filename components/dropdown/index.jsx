import React from 'react';
import style from './style';

class Dropdown extends React.Component {
  static propTypes = {
    auto: React.PropTypes.bool,
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    label: React.PropTypes.string,
    onChange: React.PropTypes.func,
    source: React.PropTypes.array.isRequired,
    template: React.PropTypes.func,
    value: React.PropTypes.string
  };

  static defaultProps = {
    auto: true,
    className: '',
    disabled: false
  };

  state = {
    active: false,
    up: false
  };

  handleClick = (event) => {
    const client = event.target.getBoundingClientRect();
    const screen_height = window.innerHeight || document.documentElement.offsetHeight;
    const up = this.props.auto ? client.top > ((screen_height / 2) + client.height) : false;
    this.setState({active: true, up: up});
  };

  handleSelect = (item) => {
    if (!this.props.disabled && this.props.onChange) {
      this.props.onChange(item);
      this.setState({active: false});
    }
  };

  getSelectedItem = () => {
    if (this.props.value) {
      for (const item of this.props.source) {
        if (item.value === this.props.value) return item;
      }
    } else {
      return this.props.source[0];
    }
  };

  renderItem (item, idx) {
    const className = item.value === this.props.value ? style.selected : null;
    return (
      <li key={idx} className={className} onMouseDown={this.handleSelect.bind(this, item.value)}>
        { this.props.template ? this.props.template(item) : item.label }
      </li>
    );
  }

  render () {
    let className = style.root;
    const selected = this.getSelectedItem();
    if (this.state.up) className += ` ${style.up}`;
    if (this.state.active) className += ` ${style.active}`;
    if (this.props.disabled) className += ` ${style.disabled}`;
    if (this.props.className) className += ` ${this.props.className}`;

    return (
      <div data-react-toolbox='dropdown' className={className}>
        { this.props.label ? <label className={style.label}>{this.props.label}</label> : null }

        <ul ref='values' className={style.values}>
          { this.props.source.map(this.renderItem.bind(this)) }
        </ul>

        <div ref='value' className={style.value} onClick={this.handleClick}>
          { this.props.template ? this.props.template(selected) : <span>{selected.label}</span> }
        </div>
      </div>
    );
  }
}

export default Dropdown;
