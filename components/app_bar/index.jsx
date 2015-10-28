import React from 'react';
import style from './style';

const AppBar = (props) => {
  let className = style.appbar;
  if (props.className) className += ` ${props.className}`;

  return (
    <header className={className}>
      {props.children}
    </header>
  );
};

AppBar.propTypes = {
  className: React.PropTypes.string
};

AppBar.defaultProps = {
  className: ''
};

export default AppBar;
