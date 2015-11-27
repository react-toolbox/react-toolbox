import React from 'react';
import FontIcon from '../font_icon';
import style from './style';

const Avatar = ({children, className, icon, image, title, ...other}) => {
  return (
    <div data-react-toolbox='avatar' className={`${style.avatar} ${className}`} {...other}>
      {children}
      {typeof image === 'string' ? <img className={style.image} src={image} title={title} /> : image}
      {typeof icon === 'string' ? <FontIcon className={style.letter} value={icon} /> : icon}
      {title ? <span className={style.letter}>{title[0]}</span> : null}
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
