import React, { PropTypes } from 'react';
import ClassNames from 'classnames';
import { Avatar } from '../avatar';
import style from './style';

const CardTitle = (props) => {

  const {
    avatar,
    children,
    className,
    subtitle,
    title,
    ...otherProps
  } = props;

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
        {(title || children) && (
          <h5 className={style.title}>
            {title ? title : children}
          </h5>
        )}
        {subtitle && <p className={style.subtitle}>{subtitle}</p>}
      </div>
    </div>
  );
};

CardTitle.propTypes = {
  avatar: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),
  // children: PropTypes.string,
  // className: PropTypes.string,
  subtitle: PropTypes.string,
  title: PropTypes.string
};

export default CardTitle;
