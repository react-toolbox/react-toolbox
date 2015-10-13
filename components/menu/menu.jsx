import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Ripple from '../ripple';
import style from './style.menu';

export default React.createClass({
  mixins: [PureRenderMixin],

  displayName: 'Menu',

  propTypes: {
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    onChange: React.PropTypes.func,
    selected: React.PropTypes.string
  },

  componentDidUpdate (prev_props, prev_state) {
    if (this.props.onChange && prev_state.selected !== this.state.selected && prev_state.active) {
      this.props.onChange(this);
    }
  },

  handleClick (event) {
    console.log('menu.handleClick', event);
  },

  render () {
    let className = style.root;
    if (this.props.className) className += ` ${this.props.className}`;

    return (
      <ul
        data-react-toolbox='menu'
        className={className}
        onClick={this.handleClick}
      >
        { this.props.children }
      </ul>
    );
  }
});
