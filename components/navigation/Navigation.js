import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import { NAVIGATION } from '../identifiers';
import InjectButton from '../button/Button';
import InjectLink from '../link/Link';

const factory = (Button, Link) => {
  const Navigation = ({ actions, children, className, routes, theme, type }) => {
    const _className = classnames(theme[type], className);
    const buttons = actions.map((action, index) => (
      <Button className={theme.button} key={index} {...action} /> // eslint-disable-line
    ));

    const links = routes.map((route, index) => (
      <Link className={theme.link} key={index} {...route} /> // eslint-disable-line
    ));

    return (
      <nav data-react-toolbox="navigation" className={_className}>
        {links}
        {buttons}
        {children}
      </nav>
    );
  };

  Navigation.propTypes = {
    actions: PropTypes.array, // eslint-disable-line
    children: PropTypes.node,
    className: PropTypes.string,
    routes: PropTypes.array, // eslint-disable-line
    theme: PropTypes.shape({
      button: PropTypes.string,
      horizontal: PropTypes.string,
      link: PropTypes.string,
      vertical: PropTypes.string,
    }),
    type: PropTypes.oneOf(['vertical', 'horizontal']),
  };

  Navigation.defaultProps = {
    actions: [],
    className: '',
    type: 'horizontal',
    routes: [],
  };

  return Navigation;
};

const Navigation = factory(InjectButton, InjectLink);
export default themr(NAVIGATION)(Navigation);
export { factory as navigationFactory };
export { Navigation };
