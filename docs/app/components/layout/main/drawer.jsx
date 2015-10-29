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
        className={style.draweroption}
        to={ToolboxComponent.path}
      />
    );
  });

  return (
    <List className={style.drawer} ripple>
      { DrawerItems }
    </List>
  );
};

export default MainDrawer;
