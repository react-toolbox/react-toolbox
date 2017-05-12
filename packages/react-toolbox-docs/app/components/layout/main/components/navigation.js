import React, { PropTypes } from 'react';
import { List, ListItem } from 'react-toolbox';
import classnames from 'classnames';
import components from '../modules/components';
import style from './navigation.css';

const MainNavigation = ({ className }, { router }) => {
  const drawerItems = Object.keys(components).map((key) => {
    const isActive = router.isActive(components[key].path);
    return (
      <ListItem
        key={key}
        caption={components[key].name}
        className={classnames(style.item, { [style.active]: isActive })}
        selectable
        onClick={() => { router.push(components[key].path); }}
      />
    );
  });

  return (
    <aside className={classnames(style.root, { [className]: className })}>
      <List className={style.list} selectable ripple>
        {drawerItems}
      </List>
      <footer className={style.footer}>
        <span>React Toolbox © 2016</span>
      </footer>
    </aside>
  );
};

MainNavigation.propTypes = {
  className: PropTypes.string
};

MainNavigation.contextTypes = {
  router: PropTypes.object
};

export default MainNavigation;
