import React from 'react';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import Button from '../button';
import Link from '../link';

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
  actions: React.PropTypes.array,
  children: React.PropTypes.node,
  className: React.PropTypes.string,
  routes: React.PropTypes.array,
  theme: React.PropTypes.shape({
    button: React.PropTypes.string.isRequired,
    horizontal: React.PropTypes.string.isRequired,
    link: React.PropTypes.string.isRequired,
    vertical: React.PropTypes.string.isRequired
  }),
  type: React.PropTypes.oneOf(['vertical', 'horizontal'])
};

Navigation.defaultProps = {
  actions: [],
  className: '',
  type: 'horizontal',
  routes: []
};

export default themr('ToolboxNavigation')(Navigation);
