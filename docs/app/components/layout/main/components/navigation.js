import PropTypes from 'prop-types';
import React from 'react';
import { List, ListItem } from 'react-toolbox';
import classnames from 'classnames';
import Carbon from '../../../Carbon';
import components from '../modules/components';
import style from './navigation.scss';

const MainNavigation = ({ className }, { router }) => {
  const drawerItems = Object.keys(components).map((key) => {
    const isActive = router.isActive(components[key].path);
    return (
      <ListItem
        key={key}
        caption={components[key].name}
        className={classnames(style.item, { [style.active]: isActive })}
        selectable
        onClick={() => { router.push(components[key].path);}}
      />
    );
  });

  return (
    <aside className={classnames(style.root, { [className]: className })}>
      <List className={style.list} selectable ripple>
        {drawerItems}
      </List>
      <footer className={style.footer}>
        <span className={style.footerLegend}>React Toolbox © 2017</span>
        <Carbon className={style.ad} />
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
