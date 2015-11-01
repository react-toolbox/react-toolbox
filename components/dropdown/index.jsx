import React from 'react';
import ReactDOM from 'react-dom';
import Ripple from '../ripple';
import style from './style';

const _selectValue = (value, dataSource) => {
  let item;
  if (value) {
    for (item of dataSource) {
      if (item.value.toString() === value.toString()) break;
    }
    return item;
  } else {
    return dataSource[0];
  }
};

class Dropdown extends React.Component {
  static propTypes = {
    auto: React.PropTypes.bool,
    className: React.PropTypes.string,
    dataSource: React.PropTypes.array.isRequired,
    disabled: React.PropTypes.bool,
    label: React.PropTypes.string,
    onChange: React.PropTypes.func,
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
    selected: _selectValue(this.props.value, this.props.dataSource),
    up: false,
    width: undefined
  };

  componentDidMount () {
    this.setState({
      width: ReactDOM.findDOMNode(this).getBoundingClientRect().width
    });
  }

  componentDidUpdate (prev_props, prev_state) {
    if (this.props.onChange && prev_state.selected !== this.state.selected && prev_state.active) {
      this.props.onChange(this);
    }
  }

  handleClick = (event) => {
    const client = event.target.getBoundingClientRect();
    const screen_height = window.innerHeight || document.documentElement.offsetHeight;
    const up = this.props.auto ? client.top > ((screen_height / 2) + client.height) : false;
    this.setState({ active: true, up: up });
  };

  handleClickValue = (id) => {
    if (!this.props.disabled) {
      const value = id.toString();
      for (const item of this.props.dataSource) {
        if (item.value.toString() === value) {
          this.setState({active: false, selected: item});
          break;
        }
      }
    }
  };

  renderValues () {
    const items = this.props.dataSource.map((item, index) => {
      let className;
      if (item.value === this.state.selected.value) className = ` ${style.selected}`;

      return (
        <li
          key={index}
          className={className}
          id={item.value}
          onClick={this.handleClickValue.bind(this, item.value)}
        >
          { this.props.template ? this.props.template(item) : item.label }
          <Ripple className={style.ripple}/>
        </li>
      );
    });

    let className = style.values;
    const valuesStyle = {width: this.state.width};
    if (this.state.up) className += ` ${style.up}`;

    return <ul ref='values' className={className} style={valuesStyle}>{ items }</ul>;
  }

  render () {
    let className = style.root;
    if (this.props.className) className += ` ${this.props.className}`;
    if (this.props.disabled) className += ` ${style.disabled}`;
    if (this.state.active) className += ` ${style.active}`;

    return (
      <div data-react-toolbox='dropdown' className={className}>
        {this.props.label ? <label className={style.label}>{this.props.label}</label> : null}
        { this.renderValues() }
        <div ref='value' className={style.value} onClick={this.handleClick}>
          { this.props.template ? this.props.template(this.state.selected) : <span>{this.state.selected.label}</span> }
        </div>
      </div>
    );
  }

  getValue () {
    return this.state.selected.value;
  }

  setValue (data) {
    this.setState({selected: data});
  }
}

export default Dropdown;
