import React, { PropTypes } from 'react';
import ClassNames from 'classnames';
import { Avatar } from '../avatar';
import style from './style';

/**
 * A versatile title block that can be used in
 * various places on the card, including the media
 * area. This component can also display an avatar next
 * to the title content.
 */
const CardTitle = ({
  avatar,
  children,
  className,
  subtitle,
  title,
  ...otherProps
}) => {

  const classes = ClassNames(style.cardTitle, {
    [style.small]: avatar,
    [style.large]: !avatar
  }, className);

  let avatarComponent;

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
  subtitle: PropTypes.string,
  title: PropTypes.string
};

export default CardTitle;
