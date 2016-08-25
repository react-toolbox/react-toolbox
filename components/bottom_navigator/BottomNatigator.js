import React from 'react';
import style from './style';
import FontIcon from '../font_icon';
import classnames from 'classnames';

class BottomNavigationItem extends React.Component {
  handleClick = (event) => {
    this.props.onClick(event, this.props.index);
  };

  render () {
    const { active, label, index, icon, theme, ...other } = this.props;
    const classes = classnames(style.li, {
      [style.liActive]: active
    });

    return (
    <li
      {...other}
      data-react-toolbox='bottom-navigation-item'
      className={classes}
      onClick={this.handleClick}
    >
      {this.props.children}
      <FontIcon className={style.icon} value={icon} />
      <span className={style.span}>{label}</span>
    </li>
    );
  }
}

export default BottomNavigationItem;
