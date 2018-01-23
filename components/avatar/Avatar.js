import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import { AVATAR } from '../identifiers';
import InjectFontIcon from '../font_icon/FontIcon';

const factory = (FontIcon) => {
  const Avatar = ({ alt, children, className, cover, icon, image, theme, title, ...other }) => (
    <div data-react-toolbox="avatar" className={classnames(theme.avatar, className)} {...other}>
      {children}
      {cover && typeof image === 'string' && <span aria-label={alt} className={theme.image} style={{ backgroundImage: `url(${image})` }} />}
      {!cover && (typeof image === 'string' ? <img alt={alt} className={theme.image} src={image} title={title} /> : image)}
      {typeof icon === 'string' ? <FontIcon className={theme.letter} value={icon} alt={alt} /> : icon}
      {title ? <span className={theme.letter}>{title[0]}</span> : null}
    </div>
  );

  Avatar.propTypes = {
    alt: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
    cover: PropTypes.bool,
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    image: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    theme: PropTypes.shape({
      avatar: PropTypes.string,
      image: PropTypes.string,
      letter: PropTypes.string,
    }),
    title: PropTypes.string,
  };

  Avatar.defaultProps = {
    alt: '',
    cover: false,
  };

  return Avatar;
};

const Avatar = factory(InjectFontIcon);
export default themr(AVATAR)(Avatar);
export { factory as avatarFactory };
export { Avatar };
