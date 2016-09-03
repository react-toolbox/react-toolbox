import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import { APP_BAR } from '../identifiers.js';
import FontIcon from '../font_icon/FontIcon.js';

const AppBar = ({ theme, title, ...props }) => {
  const className = classnames(theme.appBar, {
    [theme.fixed]: props.fixed,
    [theme.flat]: props.flat
  }, props.className);
  const { leftIcon, onLeftIconClick, rightIcon, onRightIconClick } = props;

  return (
    <header className={className} data-react-toolbox='app-bar'>
      {leftIcon ? <FontIcon
        className={classnames(theme.leftIcon)}
        value={leftIcon}
        onClick={onLeftIconClick}/> : null
      }
      {title ? <h1 className={classnames(theme.title)}>{title}</h1> : null}
      {props.children}
      {rightIcon ? <FontIcon
        className={classnames(theme.rightIcon)}
        value={rightIcon}
        onClick={onRightIconClick}/> : null
      }
    </header>
  );
};

AppBar.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  fixed: PropTypes.bool,
  flat: PropTypes.bool,
  leftIcon: PropTypes.oneOfType(
    PropTypes.string,
    PropTypes.element
  ),
  onLeftIconClick: PropTypes.func,
  onRightIconClick: PropTypes.func,
  rightIcon: PropTypes.oneOfType(
    PropTypes.string,
    PropTypes.element
  ),
  theme: PropTypes.shape({
    appBar: PropTypes.string,
    leftIcon: PropTypes.string,
    rightIcon: PropTypes.string,
    fixed: PropTypes.string,
    flat: PropTypes.string,
    title: PropTypes.string
  }),
  title: PropTypes.string
};

AppBar.defaultProps = {
  className: '',
  fixed: false,
  flat: false
};

export default themr(APP_BAR)(AppBar);
export { AppBar };
