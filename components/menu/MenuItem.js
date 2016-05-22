import React from 'react';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import FontIcon from '../font_icon';
import Ripple from '../ripple';

class MenuItem extends React.Component {
  static propTypes = {
    caption: React.PropTypes.string.isRequired,
    children: React.PropTypes.any,
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    icon: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.element
    ]),
    onClick: React.PropTypes.func,
    selected: React.PropTypes.bool,
    shortcut: React.PropTypes.string,
    theme: React.PropTypes.shape({
      caption: React.PropTypes.string.isRequired,
      disabled: React.PropTypes.string.isRequired,
      icon: React.PropTypes.string.isRequired,
      menuItem: React.PropTypes.string.isRequired,
      selected: React.PropTypes.string.isRequired,
      shortcut: React.PropTypes.string.isRequired
    })
  };

  static defaultProps = {
    className: '',
    disabled: false,
    selected: false
  };

  handleClick = (event) => {
    if (this.props.onClick && !this.props.disabled) {
      this.props.onClick(event, this);
    }
  };

  render () {
    const {icon, caption, children, shortcut, selected, disabled, theme, ...others} = this.props;
    const className = classnames(theme.menuItem, {
      [theme.selected]: selected,
      [theme.disabled]: disabled
    }, this.props.className);

    return (
      <li {...others} data-react-toolbox='menu-item' className={className} onClick={this.handleClick}>
        {icon ? <FontIcon value={icon} className={theme.icon}/> : null}
        <span className={theme.caption}>{caption}</span>
        {shortcut ? <small className={theme.shortcut}>{shortcut}</small> : null}
        {children}
      </li>
    );
  }
}

const RawMenuItem = themr('ToolboxMenu')(MenuItem);
export default themr('ToolboxMenu')(Ripple({})(MenuItem));
export {RawMenuItem as RawMenuItem};
