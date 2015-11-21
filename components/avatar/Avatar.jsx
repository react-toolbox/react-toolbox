import React, { PropTypes, Component } from 'react';
import ClassNames from '../decorators/ClassNames';
import FontIcon from '../font_icon'; // ewww! :P @TODO
import style from './style';

@ClassNames(style)
class Avatar extends Component {

  static propTypes = {
    accent: PropTypes.bool,
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node
    ]),
    className: PropTypes.string,
    classNames: PropTypes.func,
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
      classNames,
      icon,
      primary,
      image,
      ...otherProps
    } = this.props;

    let component;

    const classes = classNames('avatar', {
      accent,
      primary
    }, className);

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
