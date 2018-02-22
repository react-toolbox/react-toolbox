import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withRouter } from 'react-router-dom';
import { List, ListItem } from 'react-toolbox/lib/list';
import components from '../modules/components';
import style from './navigation.css';

const MainNavigation = ({ className, component, history }) => {
  const drawerItems = Object.keys(components).map((key) => {
    return (
      <ListItem
        key={key}
        caption={components[key].name}
        className={classnames(style.item, { [style.active]: key === component })}
        selectable
        onClick={() => { history.push(components[key].path); }}
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

export default withRouter(MainNavigation);
