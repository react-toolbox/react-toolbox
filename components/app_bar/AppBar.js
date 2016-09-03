import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import { APP_BAR } from '../identifiers.js';
import InjectedFontIcon from '../font_icon/FontIcon.js';

const factory = (FontIcon) => {
  const AppBar = ({ children, leftIcon, onLeftIconClick, onRightIconClick, rightIcon, theme, title, ...props }) => {
    const className = classnames(theme.appBar, {
      [theme.fixed]: props.fixed,
      [theme.flat]: props.flat
    }, props.className);

    return (
      <header className={className} data-react-toolbox='app-bar'>
        {leftIcon && <FontIcon
          className={classnames(theme.leftIcon)}
          onClick={onLeftIconClick}
          value={leftIcon} />
        }
        {title && <h1 className={classnames(theme.title)}>{title}</h1>}
        {children}
        {rightIcon && <FontIcon
          className={classnames(theme.rightIcon)}
          onClick={onRightIconClick}
          value={rightIcon} />
        }
      </header>
    );
  };

  AppBar.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    fixed: PropTypes.bool,
    flat: PropTypes.bool,
    leftIcon: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element
    ]),
    onLeftIconClick: PropTypes.func,
    onRightIconClick: PropTypes.func,
    rightIcon: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element
    ]),
    theme: PropTypes.shape({
      appBar: PropTypes.string,
      fixed: PropTypes.string,
      flat: PropTypes.string,
      leftIcon: PropTypes.string,
      rightIcon: PropTypes.string,
      title: PropTypes.string
    }),
    title: PropTypes.string
  };

  AppBar.defaultProps = {
    className: '',
    fixed: false,
    flat: false
  };

  return AppBar;
};

const AppBar = factory(InjectedFontIcon);
export default themr(APP_BAR, null)(AppBar);
export { factory as appBarFactory };
export { AppBar };
