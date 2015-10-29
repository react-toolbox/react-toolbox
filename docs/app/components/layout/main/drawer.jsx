import React from 'react';
import ToolboxComponents from './components';
import { History } from 'react-router';
import { List, ListItem } from 'react-toolbox';
import style from './drawer.scss';

const MainDrawer = React.createClass({
  mixins: [History],

  renderDrawerItems () {
    return Object.keys(ToolboxComponents).map((key) => {
      const ToolboxComponent = ToolboxComponents[key];
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
