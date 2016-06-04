import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import { NAVIGATION } from '../identifiers.js';
import InjectButton from '../button/Button.js';
import InjectLink from '../link/Link.js';

const factory = (Button, Link) => {
  const Navigation = ({ actions, children, className, routes, theme, type }) => {
    const _className = classnames(theme[type], className);
    const buttons = actions.map((action, index) => {
      return <Button className={theme.button} key={index} {...action} />;
    });

    const links = routes.map((route, index) => {
      return <Link className={theme.link} key={index} {...route} />;
    });

    return (
      <nav data-react-toolbox='navigation' className={_className}>
        {links}
        {buttons}
        {children}
      </nav>
    );
  };

  Navigation.propTypes = {
    actions: PropTypes.array,
    children: PropTypes.node,
    className: PropTypes.string,
    routes: PropTypes.array,
    theme: PropTypes.shape({
      button: PropTypes.string,
      horizontal: PropTypes.string,
      link: PropTypes.string,
      vertical: PropTypes.string
    }),
    type: PropTypes.oneOf(['vertical', 'horizontal'])
  };

  Navigation.defaultProps = {
    actions: [],
    className: '',
    type: 'horizontal',
    routes: []
  };

  return Navigation;
};

const Navigation = factory(InjectButton, InjectLink);
export default themr(NAVIGATION)(Navigation);
export { factory as navigationFactory };
export { Navigation };
