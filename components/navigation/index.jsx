import React from 'react';
import style from './style';
import Button from '../button';
import Link from '../link';

const Navigation = props => {
  let className = `${style[props.type]}`;
  if (props.className) className += ` ${props.className}`;

  const buttons = props.actions.map((action, index) => {
    return <Button key={index} {...action} />;
  });

  const links = props.routes.map((route, index) => {
    return <Link key={index} {...route} />;
  });

  return (
    <nav data-react-toolbox='navigation' className={className}>
      { links }
      { buttons }
      { props.children }
    </nav>
  );
};

Navigation.propTypes = {
  actions: React.PropTypes.array,
  className: React.PropTypes.string,
  routes: React.PropTypes.array,
  type: React.PropTypes.string
};

Navigation.defaultProps = {
  actions: [],
  className: '',
  type: 'default',
  routes: []
};

export default Navigation;
