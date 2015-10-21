import React from 'react';
import autobind from 'autobind-decorator'
import ListItem from './item';
import style from './style';

@autobind
export default class List extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    onClick: React.PropTypes.func,
    ripple: React.PropTypes.bool,
    selectable: React.PropTypes.bool
  };

  static defaultProps = {
    className: '',
    ripple: false,
    selectable: false
  };

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
  }

  render () {
    let className = style.list;
    if (this.props.className) className += ` ${this.props.className}`;
    return (
      <ul className={className}>
        { this.renderItems() }
      </ul>
    );
  }
};
