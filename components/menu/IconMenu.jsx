import React from 'react';
import FontIcon from '../font_icon';
import Menu from './Menu';
import Ripple from '../ripple';
import style from './style.icon_menu';

class IconMenu extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    icon: React.PropTypes.string,
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

  handleButtonClick = () => {
    this.refs.menu.show();
    if (this.props.onClick) this.props.onClick();
  };

  handleMouseDown = (event) => {
    if (this.props.iconRipple) {
      this.refs.ripple.start(event);
    }
  };

  render () {
    let className = style.root;
    if (this.props.className) className += ` ${this.props.className}`;

    return (
      <div className={className}>
        <FontIcon
          className={style.icon}
          onClick={this.handleButtonClick}
          onMouseDown={this.handleMouseDown}
          value={this.props.icon}
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
        {this.props.iconRipple ? <Ripple ref='ripple' className={style.ripple} spread={2.4} centered /> : null}
      </div>
    );
  }
}

export default IconMenu;
