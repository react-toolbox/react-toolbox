import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import { APP_BAR } from '../identifiers.js';

const AppBar = ({ theme, ...props }) => {
  const className = classnames(theme.appBar, {
    [theme.fixed]: props.fixed,
    [theme.flat]: props.flat
  }, props.className);

  return (
    <header className={className} data-react-toolbox='app-bar'>
      {props.children}
    </header>
  );
};

AppBar.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  fixed: PropTypes.bool,
  flat: PropTypes.bool,
  theme: PropTypes.shape({
    appBar: PropTypes.string,
    fixed: PropTypes.string,
    flat: PropTypes.string
  })
};

AppBar.defaultProps = {
  className: '',
  fixed: false,
  flat: false
};

export default themr(APP_BAR)(AppBar);
export { AppBar };
