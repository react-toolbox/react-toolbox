import React from 'react';
import { IconButton } from '../button';
import Menu from './Menu';
import style from './style.icon_menu';

class IconMenu extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    icon: React.PropTypes.any,
    iconRipple: React.PropTypes.bool,
    menuRipple: React.PropTypes.bool,
    onClick: React.PropTypes.func,
    onHide: React.PropTypes.func,
    onSelect: React.PropTypes.func,
    onShow: React.PropTypes.func,
    position: React.PropTypes.string,
    selectable: React.PropTypes.bool,
    selected: React.PropTypes.any
  };

  static defaultProps = {
    className: '',
    icon: 'more_vert',
    iconRipple: true,
    menuRipple: true,
    position: 'auto',
    selectable: false
  };

  handleButtonClick = (event) => {
    this.refs.menu.show();
    if (this.props.onClick) this.props.onClick(event);
  };

  render () {
    let className = style.root;
    if (this.props.className) className += ` ${this.props.className}`;

    return (
      <div className={className}>
        <IconButton
          className={style.icon}
          icon={this.props.icon}
          onClick={this.handleButtonClick}
          ripple={this.props.iconRipple}
        />
        <Menu
          ref='menu'
          onHide={this.props.onHide}
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

export default IconMenu;
