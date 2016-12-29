import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import { MENU } from '../identifiers.js';
import InjectIconButton from '../button/IconButton.js';
import InjectMenu from './Menu.js';

const factory = (IconButton, Menu) => {
  class IconMenu extends Component {
    static propTypes = {
      autofocus: PropTypes.bool,
      children: PropTypes.node,
      className: PropTypes.string,
      icon: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
      ]),
      iconRipple: PropTypes.bool,
      label: PropTypes.string,
      menuRipple: PropTypes.bool,
      onClick: PropTypes.func,
      onHide: PropTypes.func,
      onSelect: PropTypes.func,
      onShow: PropTypes.func,
      position: PropTypes.string,
      selectable: PropTypes.bool,
      selected: PropTypes.any,
      theme: PropTypes.shape({
        icon: PropTypes.string,
        iconMenu: PropTypes.string
      })
    };

    static defaultProps = {
      autofocus: true,
      className: '',
      label: '',
      icon: 'more_vert',
      iconRipple: true,
      menuRipple: true,
      position: 'auto',
      selectable: false
    };

    state = {
      active: false
    }

    generateID = (len) => {
      return Math.random().toString(36).substr(2, len)
    };

    handleButtonClick = (event) => {
      this.setState({ active: !this.state.active });
      if (this.props.onClick) this.props.onClick(event);
    };

    handleMenuHide = () => {
      this.setState({ active: false });
      if (this.props.onHide) this.props.onHide();
    }

    render () {
      const menuId = 'Menu' + this.generateID(7);
      const {
        autofocus, children, className, icon, iconRipple, label, menuRipple, onHide, // eslint-disable-line
        onSelect, onShow, position, selectable, selected, theme, ...other
      } = this.props;
      return (
        <div {...other} className={classnames(theme.iconMenu, className)}>
          <IconButton
            ariaControls={menuId}
            label={label}
            className={theme.icon}
            icon={icon}
            onClick={this.handleButtonClick}
            ripple={iconRipple}
          />
          <Menu
            hidden={true}
            menuId={menuId}
            autofocus={autofocus}
            active={this.state.active}
            onHide={this.handleMenuHide}
            onSelect={onSelect}
            onShow={onShow}
            position={position}
            ripple={menuRipple}
            selectable={selectable}
            selected={selected}
            theme={theme}
          >
            {children}
          </Menu>
        </div>
      );
    }
  }

  return IconMenu;
};

const IconMenu = factory(InjectIconButton, InjectMenu);
export default themr(MENU)(IconMenu);
export { factory as iconMenuFactory };
export { IconMenu };
