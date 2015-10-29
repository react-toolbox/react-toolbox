/*eslint-disable no-unused-vars*/
import React from 'react';
import ToolboxComponents from './components';
import { List, ListItem } from 'react-toolbox';
import style from './style';

const MainDrawer = () => {
  const DrawerItems = Object.keys(ToolboxComponents).map((key) => {
    const ToolboxComponent = ToolboxComponents[key];
    return (
      <ListItem
        key={key}
        caption={ToolboxComponent.name}
        className={style.drawer_item}
        to={ToolboxComponent.path}
      />
    );
  });

  return (
    <aside className={style.drawer}>
      <List className={style.drawer_list} ripple>
        { DrawerItems }
      </List>
      <footer className={style.drawer_footer}>
        <span>React Toolbox ©</span>
        <span>
          <a href=''>Privacy</a> & <a href=''>Terms</a>
        </span>
      </footer>
    </aside>
  );
};

export default MainDrawer;
