import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import ListItem from './item';
import style from './style';

const List = React.createClass({
  mixins: [PureRenderMixin],

  propTypes: {
    className: React.PropTypes.string,
    onClick: React.PropTypes.func,
    ripple: React.PropTypes.bool,
    selectable: React.PropTypes.bool
  },

  getDefaultProps () {
    return {
      className: '',
      ripple: false,
      selectable: false
    };
  },

  renderItems () {
    return React.Children.map(this.props.children, (item) => {
      if (item.type === ListItem) {
        return React.cloneElement(item, {
          ripple: this.props.ripple,
          selectable: this.props.selectable
        });
      } else {
        return React.cloneElement(item);
      }
    });
  },

  render () {
    let className = style.list;
    if (this.props.className) className += ` ${this.props.className}`;
    return (
      <ul className={className}>
        { this.renderItems() }
      </ul>
    );
  }
});

export default List;
