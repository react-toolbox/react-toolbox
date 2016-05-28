import React, {PropTypes} from 'react';
import { themr } from 'react-css-themr';
import { AVATAR } from '../identifiers.js';
import InjectFontIcon from '../font_icon/FontIcon.js';

const factory = (FontIcon) => {
  const Avatar = ({children, className, icon, image, theme, title, ...other}) => (
    <div data-react-toolbox='avatar' className={`${theme.avatar} ${className}`} {...other}>
      {children}
      {typeof image === 'string' ? <img className={theme.image} src={image} title={title} /> : image}
      {typeof icon === 'string' ? <FontIcon className={theme.letter} value={icon} /> : icon}
      {title ? <span className={theme.letter}>{title[0]}</span> : null}
    </div>
  );

  Avatar.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    image: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    theme: React.PropTypes.shape({
      avatar: React.PropTypes.string.isRequired,
      image: React.PropTypes.string.isRequired,
      letter: React.PropTypes.string.isRequired
    }),
    title: PropTypes.string
  };

  return Avatar;
};

const Avatar = factory(InjectFontIcon);
export default themr(AVATAR)(Avatar);
export { factory as avatarFactory };
export { Avatar };
