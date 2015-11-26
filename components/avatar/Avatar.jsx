import React from 'react';
import ClassNames from 'classnames';
import FontIcon from '../font_icon';
import style from './style';

const Avatar = ({children, className, icon, image, title, ...other}) => {
  const classes = ClassNames(style.avatar, [], className);
  const avatarStyle = {backgroundImage: typeof image === 'string' ? `url(${image})` : null};

  return (
    <div className={classes} {...other}>
      {typeof icon === 'string' ? <FontIcon className={style.letter} value={icon} /> : icon}
      {typeof image === 'string' && title ? <span className={style.letter}>{title[0]}</span> : null}
      {typeof image === 'string' ? <span className={style.image} style={avatarStyle} /> : null}
      {children}
    </div>
  );
};

Avatar.propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string,
  icon: React.PropTypes.string,
  image: React.PropTypes.string,
  title: React.PropTypes.string
};

export default Avatar;
