import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import { Avatar } from '../avatar';

const CardTitle = ({avatar, children, className, subtitle, theme, title, ...other}) => {
  const classes = classnames(theme.cardTitle, {
    [theme.small]: avatar,
    [theme.large]: !avatar
  }, className);

  let avatarComponent;

  if (typeof avatar === 'string') {
    avatarComponent = <Avatar image={avatar} />;
  } else {
    avatarComponent = avatar;
  }

  return (
    <div className={classes} {...other}>
      {avatarComponent}
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
  theme: React.PropTypes.shape({
    large: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    small: React.PropTypes.string.isRequired,
    subtitle: React.PropTypes.string.isRequired
  }),
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ])
};

export default themr('ToolboxCard')(CardTitle);
