import React from 'react';
import FontIcon from '../font_icon';
import ClassNames from 'classnames';
import Ripple from '../ripple';
import style from './style.menu_item';

class MenuItem extends React.Component {
  static propTypes = {
    caption: React.PropTypes.string.isRequired,
    children: React.PropTypes.any,
    className: React.PropTypes.string,
    colorIcon: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    icon: React.PropTypes.any,
    onClick: React.PropTypes.func,
    selected: React.PropTypes.bool,
    shortcut: React.PropTypes.string
  };

  static defaultProps = {
    className: '',
    colorIcon: '',
    disabled: false,
    selected: false
  };

  handleClick = (event) => {
    if (this.props.onClick && !this.props.disabled) {
      this.props.onClick(event, this);
    }
  };

  render () {
    const {icon, caption, children, colorIcon, shortcut, selected, disabled, ...others} = this.props;
    const className = ClassNames(style.root, {
      [style.selected]: selected,
      [style.disabled]: disabled
    }, this.props.className);

    return (
      <li {...others} data-react-toolbox='menu-item' className={className} onClick={this.handleClick}>
        {icon ? <FontIcon value={icon} className={style.icon} colorIcon={colorIcon}/> : null}
        <span className={style.caption}>{caption}</span>
        {shortcut ? <small className={style.shortcut}>{shortcut}</small> : null}
        {children}
      </li>
    );
  }
}

export default Ripple({
  className: style.ripple
})(MenuItem);
export {MenuItem as RawMenuItem};
