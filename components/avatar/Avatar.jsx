import React, { PropTypes, Component } from 'react';
import ClassNames from 'classnames';
import FontIcon from '../font_icon'; // ewww! :P @TODO
import style from './style';

class Avatar extends Component {

  static propTypes = {
    accent: PropTypes.bool,
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node
    ]),
    className: PropTypes.string,
    icon: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element
    ]),
    image: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element
    ]),
    primary: PropTypes.bool
  }

  static defaultProps = {
    size: 40
  }

  render () {
    const {
      accent,
      children,
      className,
      icon,
      primary,
      image,
      ...otherProps
    } = this.props;

    let component;

    const classes = ClassNames(style.avatar, [
      primary ? style.primary : accent ? style.accent : null
    ], className);

    if (typeof image === 'string') {
      component = <img className={style.avatarImg} src={image} />;
    } else if (typeof image === 'string') {
      component = <img className={style.avatarImg} src={image} />;
    } else if (typeof icon === 'string') {
      component = <FontIcon value="icon" />;
    }

    return (
      <div className={classes}>{component ? component : children}</div>
    );
  }

}

export default Avatar;
