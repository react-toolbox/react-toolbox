import React from 'react';
import { History } from 'react-router';
import { List, ListItem } from 'react-toolbox';
import style from './drawer_components.scss';
import components from '../modules/components';

const MainDrawer = React.createClass({
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
    return (
      <aside className={style.root}>
        <List className={style.list} selectable>
          { this.renderDrawerItems() }
        </List>
        <footer className={style.footer}>
          <span>React Toolbox ©</span>
          <span>
            <a href=''>Privacy</a> & <a href=''>Terms</a>
          </span>
        </footer>
      </aside>
    );
  }
});

export default MainDrawer;
