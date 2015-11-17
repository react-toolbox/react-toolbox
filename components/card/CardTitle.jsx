import React, { PropTypes, Component } from 'react';
import ClassNames from '../decorators/ClassNames';
import { Avatar } from '../avatar';
import style from './style';

@ClassNames(style)
class CardTitle extends Component {

  static propTypes = {
    avatar: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element
    ]),
    children: PropTypes.string,
    className: PropTypes.string,
    classNames: PropTypes.func,
    subtitle: PropTypes.string,
    title: PropTypes.string
  }

  render () {
    let avatarComponent;

    const {
      avatar,
      children,
      className,
      classNames,
      subtitle,
      title,
      ...otherProps
    } = this.props;

    const classes = classNames('cardTitle', {
      'small': avatar,
      'large': !avatar
    }, className);

    if (typeof avatar === 'string') {
      avatarComponent = <Avatar image={avatar} />;
    } else {
      avatarComponent = avatar;
    }

    return (
      <div className={classes} {...otherProps}>
        {avatarComponent && (
          <div className={style.avatar}>
            {avatarComponent}
          </div>
        )}
        <div>
          {(title || children) && <h5 className={style.title}>{title ? title : children}</h5>}
          {subtitle && <p className={style.subtitle}>{subtitle}</p>}
        </div>
      </div>
    );
  }
}

export default CardTitle;
