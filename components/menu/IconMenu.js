import React from 'react';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import { MENU } from '../identifiers.js';
import InjectIconButton from '../button/IconButton.js';
import InjectMenu from './Menu.js';

const factory = (IconButton, Menu) => {
  class IconMenu extends React.Component {
    static propTypes = {
      children: React.PropTypes.node,
      className: React.PropTypes.string,
      icon: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.element
      ]),
      iconRipple: React.PropTypes.bool,
      menuRipple: React.PropTypes.bool,
      onClick: React.PropTypes.func,
      onHide: React.PropTypes.func,
      onSelect: React.PropTypes.func,
      onShow: React.PropTypes.func,
      position: React.PropTypes.string,
      selectable: React.PropTypes.bool,
      selected: React.PropTypes.any,
      theme: React.PropTypes.shape({
        icon: React.PropTypes.string.isRequired,
        iconMenu: React.PropTypes.string.isRequired
      })
    };

    static defaultProps = {
      className: '',
      icon: 'more_vert',
      iconRipple: true,
      menuRipple: true,
      position: 'auto',
      selectable: false
    };

    state = {
      active: false
    }

    handleButtonClick = (event) => {
      this.setState({ active: !this.state.active });
      if (this.props.onClick) this.props.onClick(event);
    };

    handleMenuHide = () => {
      this.setState({ active: false });
      if (this.props.onHide) this.props.onHide();
    }

    render () {
      return (
        <div className={classnames(this.props.theme.iconMenu, this.props.className)}>
          <IconButton
            className={this.props.theme.icon}
            icon={this.props.icon}
            onClick={this.handleButtonClick}
            ripple={this.props.iconRipple}
          />
          <Menu
            ref='menu'
            active={this.state.active}
            onHide={this.handleMenuHide}
            onSelect={this.props.onSelect}
            onShow={this.props.onShow}
            position={this.props.position}
            ripple={this.props.menuRipple}
            selectable={this.props.selectable}
            selected={this.props.selected}
          >
            {this.props.children}
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
