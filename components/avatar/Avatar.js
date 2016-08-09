import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import { AVATAR } from '../identifiers.js';
import InjectFontIcon from '../font_icon/FontIcon.js';

const factory = (FontIcon) => {
  const Avatar = ({children, className, cover, icon, image, theme, title, ...other}) => (
    <div data-react-toolbox='avatar' className={classnames(theme.avatar, className)} {...other}>
      {children}
      {cover && typeof image === 'string' && <span alt={title} className={theme.image} style={{backgroundImage: `url(${image})`}} />}
      {!cover && (typeof image === 'string' ? <img alt={title} className={theme.image} src={image} title={title} /> : image)}
      {typeof icon === 'string' ? <FontIcon className={theme.letter} value={icon} /> : icon}
      {title ? <span className={theme.letter}>{title[0]}</span> : null}
    </div>
  );

  Avatar.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    cover: PropTypes.bool,
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    image: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    theme: PropTypes.shape({
      avatar: PropTypes.string,
      image: PropTypes.string,
      letter: PropTypes.string
    }),
    title: PropTypes.string
  };

  Avatar.defaultProps = {
    cover: false
  };

  return Avatar;
};

const Avatar = factory(InjectFontIcon);
export default themr(AVATAR)(Avatar);
export { factory as avatarFactory };
export { Avatar };
