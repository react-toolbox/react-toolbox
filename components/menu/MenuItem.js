import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import { MENU } from '../identifiers';
import { FontIcon } from '../font_icon/FontIcon';
import rippleFactory from '../ripple/Ripple';

const factory = (ripple) => {
  class MenuItem extends Component {
    static propTypes = {
      caption: PropTypes.string,
      children: PropTypes.node,
      className: PropTypes.string,
      disabled: PropTypes.bool,
      icon: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
      ]),
      onClick: PropTypes.func,
      selected: PropTypes.bool,
      shortcut: PropTypes.string,
      tabIndex: PropTypes.string,
      theme: PropTypes.shape({
        caption: PropTypes.string,
        disabled: PropTypes.string,
        icon: PropTypes.string,
        menuItem: PropTypes.string,
        selected: PropTypes.string,
        shortcut: PropTypes.string,
      }),
    };

    static defaultProps = {
      className: '',
      disabled: false,
      selected: false,
    };

    handleClick = (event) => {
      if (this.props.onClick && !this.props.disabled) {
        this.props.onClick(event, this);
      }
    };

    handleEnter = (event) => {
      if (event.keyCode === 13) {
        this.handleClick(event);
      }
    };

    render() {
      const {
        caption,
        children,
        disabled,
        icon,
        selected,
        shortcut,
        theme,
        tabIndex,
        ...others
      } = this.props;
      const className = classnames(theme.menuItem, {
        [theme.selected]: selected,
        [theme.disabled]: disabled,
      }, this.props.className);

      return (
        <li
          {...others}
          data-react-toolbox="menu-item"
          className={className}
          onClick={this.handleClick}
          onKeyDown={this.handleEnter}
          role="menuitem"
          tabIndex={tabIndex}
        >
          {icon ? <FontIcon value={icon} className={theme.icon} /> : null}
          <span className={theme.caption}>{caption}</span>
          {shortcut ? <small className={theme.shortcut}>{shortcut}</small> : null}
          {children}
        </li>
      );
    }
  }

  return ripple(MenuItem);
};

const MenuItem = factory(rippleFactory({}));
export default themr(MENU)(MenuItem);
export { factory as menuItemFactory };
export { MenuItem };
