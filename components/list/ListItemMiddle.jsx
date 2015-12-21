import React from 'react';
import style from './style';
import ListItemCaption from './ListItemCaption';
import ListItemLegend from './ListItemLegend';
import ReservedChildren from '../reserved_children/ReservedChildren';

class ListItemMiddle extends React.Component {
  render () {
    const defaultCaption = <ListItemCaption> {this.props.caption} </ListItemCaption>;
    const defaultLegend = <ListItemLegend> {this.props.legend} </ListItemLegend>;
    const reservedChildren = this.reservedChildrenByType();

    return (
      <span className={style.text}>
        {reservedChildren[ListItemCaption] || defaultCaption}
        {reservedChildren[ListItemLegend] || defaultLegend}
      </span>
    );
  }
}

export default ReservedChildren(ListItemMiddle, [ListItemCaption, ListItemLegend]);
