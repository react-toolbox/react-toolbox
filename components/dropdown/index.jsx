/* global React */

import { addons } from 'react/addons';
import style from './style';
import Ripple from '../ripple';

export default React.createClass({
  mixins: [addons.PureRenderMixin],

  displayName: 'Dropdown',

  propTypes: {
    className: React.PropTypes.string,
    dataSource: React.PropTypes.array,
    disabled: React.PropTypes.bool,
    label: React.PropTypes.string,
    onChange: React.PropTypes.func,
    template: React.PropTypes.func,
    type: React.PropTypes.string,
    value: React.PropTypes.string
  },

  getDefaultProps () {
    return {
      className: '',
      dataSource: [],
      type: 'normal'
    };
  },

  getInitialState () {
    return {
      active: false,
      selected: _selectValue(this.props.value, this.props.dataSource)
    };
  },

  componentDidMount () {
    this.setState({
      height: this.refs.values.getDOMNode().firstElementChild.getBoundingClientRect().height
    });
  },

  componentDidUpdate (prev_props, prev_state) {
    if (this.props.onChange && prev_state.selected !== this.state.selected && prev_state.active) {
      this.props.onChange(this);
    }
  },

  onSelect () {
    if (!this.props.disabled) {
      this.setState({active: true});
    }
  },

  onItem (id) {
    if (!this.props.disabled) {
      let value = id.toString();
      for (let item of this.props.dataSource) {
        if (item.value.toString() === value) {
          this.setState({
            active: false,
            selected: item
          });
          break;
        }
      }
    }
  },

  render () {
    let stylesheet;
    let className = `${style.root} ${this.props.className}`;
    if (this.props.type) className += ` ${this.props.type}`;
    if (this.props.disabled) className += ' disabled';
    if (this.state.active === true) {
      className += ' active';
      stylesheet = { height: this.state.height * this.props.dataSource.length };
    }

    const items = this.props.dataSource.map((item, index) => {
      return (
        <li
          key={index}
          id={item.value}
          onClick={this.onItem.bind(this, item.value)}
          style={{position: 'relative'}}
          className={ item.value === this.state.selected.value ? 'selected' : null}
        >
          { this.props.template ? this.props.template(item) : item.label }
          <Ripple className={style.ripple}/>
        </li>
      );
    });

    return (
      <div data-react-toolbox='dropdown' className={className}>
        {this.props.label ? <label>{this.props.label}</label> : null}
        <ul ref='values' className={style.values} style={stylesheet}>{ items }</ul>
        <div ref='value' className={style.value} onClick={this.onSelect}>
          { this.props.template ? this.props.template(this.state.selected) : <span>{this.state.selected.label}</span> }
        </div>
      </div>
    );
  },

  getValue () {
    return this.state.selected.value;
  },

  setValue (data) {
    this.setState({selected: data});
  }
});

function _selectValue (value, dataSource) {
  let item;
  if (value) {
    for (item of dataSource) {
      if (item.value.toString() === value.toString()) break;
    }
    return item;
  } else {
    return dataSource[0];
  }
}
