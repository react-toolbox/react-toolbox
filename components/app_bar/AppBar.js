import React from 'react';
import { themr } from 'react-css-themr';
import classnames from 'classnames';

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
  children: React.PropTypes.node,
  className: React.PropTypes.string,
  fixed: React.PropTypes.bool,
  flat: React.PropTypes.bool,
  theme: React.PropTypes.shape({
    appBar: React.PropTypes.string.isRequired,
    fixed: React.PropTypes.string.isRequired,
    flat: React.PropTypes.string.isRequired
  })
};

AppBar.defaultProps = {
  className: '',
  fixed: false,
  flat: false
};

export default themr('ToolboxAppBar')(AppBar);
