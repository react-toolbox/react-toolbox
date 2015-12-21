import React from 'react';

const ReservedChildren = (ComposedComponent, reservedChildrenTypes) => {
  return class ComponentWithReservedChildren extends ComposedComponent {
    reservedChildrenTypes = new Set(reservedChildrenTypes);

    isReservedChild (child) {
      return child && this.reservedChildrenTypes.has(child.type);
    }

    reservedChildrenByType () {
      const children = {};
      React.Children.forEach(this.props.children, (child) => {
        if (this.isReservedChild(child)) {
          children[child.type] = child;
        }
      });

      return children;
    }

    unreservedChildren () {
      const children = React.Children.toArray(this.props.children);

      return children.filter((child) => !this.isReservedChild(child));
    }
  };
};


export default ReservedChildren;
