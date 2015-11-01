import React from 'react';
import style from './style';

const AppBar = (props) => {
  let className = style.root;
  if (props.className) className += ` ${props.className}`;
  if (props.fixed) className += ` ${style.fixed}`;
  if (props.flat) className += ` ${style.flat}`;

  return (
    <header className={className} data-react-toolbox='app-bar'>
      {props.children}
    </header>
  );
};

AppBar.propTypes = {
  className: React.PropTypes.string,
  fixed: React.PropTypes.bool,
  flat: React.PropTypes.bool
};

AppBar.defaultProps = {
  className: '',
  fixed: false,
  flat: false
};

export default AppBar;
