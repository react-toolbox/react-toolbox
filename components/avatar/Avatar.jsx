import React, {PropTypes} from 'react';
import FontIcon from '../font_icon';
import style from './style';

const imageStyle = (image) => ({
  backgroundImage: `url('${image}')`
});

const Avatar = ({children, className, icon, image, title, ...other}) => {
  return (
    <div data-react-toolbox='avatar' className={`${style.avatar} ${className}`} {...other}>
      {children}
      {
        typeof image === 'string' ?
        <div className={style.image} title={title} style={imageStyle(image)} /> :
        image
      }
      {typeof icon === 'string' ? <FontIcon className={style.letter} value={icon} /> : icon}
      {title ? <span className={style.letter}>{title[0]}</span> : null}
    </div>
  );
};

Avatar.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  image: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  title: PropTypes.string
};

export default Avatar;
