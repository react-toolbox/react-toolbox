import React, { PropTypes } from 'react';
import ClassNames from 'classnames';
import { Avatar } from '../avatar';
import style from './style';

const CardTitle = ({avatar, children, className, size, subtitle, title, ...other}) => {
  const classes = ClassNames([style.cardTitle, style[size]], className);

  let avatarComponent;

  if (typeof avatar === 'string') {
    avatarComponent = <Avatar image={avatar} />;
  } else {
    avatarComponent = avatar;
  }

  return (
    <div className={classes} {...other}>
      {avatarComponent && (
        <div className={style.avatar}>
          {avatarComponent}
        </div>
      )}
      <div>
        {title && <h5 className={style.title}>{title}</h5>}
        {children && typeof children === 'string' && (
          <h5 className={style.title}>{children}</h5>
        )}
        {subtitle && <p className={style.subtitle}>{subtitle}</p>}
        {children && typeof children !== 'string' && children}
      </div>
    </div>
  );
};

CardTitle.propTypes = {
  avatar: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.array
  ]),
  className: PropTypes.string,
  size: PropTypes.oneOf(['small', 'large']),
  subtitle: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ])
};

export default CardTitle;
