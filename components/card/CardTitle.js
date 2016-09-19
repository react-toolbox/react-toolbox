import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import { CARD } from '../identifiers.js';
import InjectAvatar from '../avatar/Avatar.js';

const factory = (Avatar) => {
  const CardTitle = ({avatar, children, className, subtitle, theme, title, ...other}) => {
    const classes = classnames(theme.cardTitle, {
      [theme.small]: avatar,
      [theme.large]: !avatar
    }, className);

    return (
      <div className={classes} {...other}>
        {typeof avatar === 'string' ? <Avatar image={avatar} theme={theme} /> : avatar}
        <div>
          {title && <h5 className={theme.title}>{title}</h5>}
          {children && typeof children === 'string' && (
            <h5 className={theme.title}>{children}</h5>
          )}
          {subtitle && <p className={theme.subtitle}>{subtitle}</p>}
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
    subtitle: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element
    ]),
    theme: PropTypes.shape({
      large: PropTypes.string,
      title: PropTypes.string,
      small: PropTypes.string,
      subtitle: PropTypes.string
    }),
    title: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element
    ])
  };

  return CardTitle;
};

const CardTitle = factory(InjectAvatar);
export default themr(CARD)(CardTitle);
export { CardTitle };
export { factory as cardTitleFactory };
