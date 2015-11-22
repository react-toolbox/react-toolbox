import React from 'react';
import { History } from 'react-router';
import { List, ListItem } from 'react-toolbox';
import components from '../modules/components';
import style from './navigation.scss';

const MainNavigation = React.createClass({
  propTypes: {
    active: React.PropTypes.bool,
    className: React.PropTypes.string
  },

  mixins: [History],

  renderDrawerItems () {
    return Object.keys(components).map((key) => {
      const ToolboxComponent = components[key];
      const to = this.context.history.createHref(ToolboxComponent.path);
      let className = style.item;
      if (this.context.history.isActive(ToolboxComponent.path)) {
        className += ` ${style.active}`;
      }

      return (
        <ListItem
          key={key}
          caption={ToolboxComponent.name}
          className={className}
          selectable
          to={to}
        />
      );
    });
  },

  render () {
    let className = style.root;
    if (this.props.className) className += ` ${this.props.className}`;

    return (
      <aside className={className}>
        <List className={style.list} selectable ripple>
          {this.renderDrawerItems()}
        </List>
        <footer className={style.footer}>
          <span>React Toolbox © 2015</span>
        </footer>
      </aside>
    );
  }
});

export default MainNavigation;
