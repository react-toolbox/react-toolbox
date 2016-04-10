import React from 'react';
import ClassNames from 'classnames';
import style from './style';

const AppBar = (props) => {
  const className = ClassNames(style.root, {
    [style.fixed]: props.fixed,
    [style.flat]: props.flat
  }, props.className);

  return (
    <header className={className} data-react-toolbox='app-bar'>
      {props.children}
    </header>
  );
};

AppBar.propTypes = {
  children: React.PropTypes.node,
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
