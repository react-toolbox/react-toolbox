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
    className: React.PropTypes.string,
    dataSource: React.PropTypes.array,
    disabled: React.PropTypes.bool,
    label: React.PropTypes.string,
    onChange: React.PropTypes.func,
    template: React.PropTypes.func,
    value: React.PropTypes.string
  };

  static defaultProps = {
    className: '',
    dataSource: [],
    up: false
  };

  state = {
    active: false,
    selected: _selectValue(this.props.value, this.props.dataSource),
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
    let client = event.target.getBoundingClientRect();
    let screen_height = window.innerHeight || document.documentElement.offsetHeight;

    this.setState({
      active: true,
      up: client.top > ((screen_height / 2) + client.height)
    });
  };

  handleClickValue = (id) => {
    if (!this.props.disabled) {
      let value = id.toString();
      for (let item of this.props.dataSource) {
        if (item.value.toString() === value) {
          this.setState({active: false, selected: item});
          break;
        }
      }
    }
  };

  renderValues () {
    let items = this.props.dataSource.map((item, index) => {
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
    if (this.state.up) className += ` ${style.up}`;
    let valuesStyle = {width: this.state.width};

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
