import React from 'react';
import Ripple from '../ripple';
import style from './style';
import ListItemContent from './ListItemContent';
import ListItemMiddle from './ListItemMiddle';
import ListItemLeft from './ListItemLeft';
import ListItemRight from './ListItemRight';
import ListItemAvatar from './ListItemAvatar';
import ReservedChildren from '../reserved_children/ReservedChildren';

class ListItem extends React.Component {
  static propTypes = {
    disabled: React.PropTypes.bool,
    onClick: React.PropTypes.func,
    ripple: React.PropTypes.bool,
    to: React.PropTypes.string
  };

  static defaultProps = {
    disabled: false,
    ripple: false
  };

  handleClick = (event) => {
    if (this.props.onClick && !this.props.disabled) {
      this.props.onClick(event);
    }
  };

  render () {
    const {onClick, ripple, to, ...other} = this.props;
    const content = <ListItemContent {...other} reservedChildren={this.reservedChildrenByType()}/>;
    return (
      <li className={style.listItem} onClick={this.handleClick} onMouseDown={this.props.onMouseDown}>
        {this.props.to ? <a href={this.props.to}>{content}</a> : content}
        {this.unreservedChildren()}
      </li>
    );
  }
}

const ListItemWithReservedChildren = ReservedChildren(ListItem, [ListItemMiddle, ListItemLeft, ListItemRight, ListItemAvatar]);
export default Ripple({
  className: style.ripple,
  centered: false
})(ListItemWithReservedChildren);
