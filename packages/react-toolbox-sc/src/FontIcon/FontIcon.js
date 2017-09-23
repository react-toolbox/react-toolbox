import React from 'react';
import withStyled from '../utils/withStyled';

const FontIcon = ({ alt, children, className, theme, value, ...other }) => (
  <span
    data-react-toolbox="font-icon"
    aria-label={alt}
    className={
      typeof value === 'string' || typeof children === 'string' ? (
        `material-icons ${className}`
      ) : (
        className
      )
    }
    {...other}
  >
    {value}
    {children}
  </span>
);

FontIcon.defaultProps = {
  alt: '',
};

export default withStyled()(FontIcon);
