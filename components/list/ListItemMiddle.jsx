import React from 'react';
import style from './style';
import ListItemCaption from './ListItemCaption'
import ListItemLegend from './ListItemLegend'

class ListItemMiddle extends React.Component {
  reservedChildrenTypes = new Set([ListItemCaption, ListItemLegend]);

  isReservedChild (child) {
    return child && this.reservedChildrenTypes.has(child.type);
  }

  reservedChildren () {
    let children = {};
    React.Children.forEach(this.props.children, (child) => {
      if (this.isReservedChild(child)) {
        children[child.type] = child;
      }
    });

    return children;
  }

  render () {
    const defaultCaption = <ListItemCaption> {this.props.caption} </ListItemCaption>;
    const defaultLegend = <ListItemLegend> {this.props.legend} </ListItemLegend>;
    const reservedChildren = this.reservedChildren();

    return (
      <span className={style.text}>
        {reservedChildren[ListItemCaption] || defaultCaption}
        {reservedChildren[ListItemLegend] || defaultLegend}
      </span>
    );
  }
}

export default ListItemMiddle;
