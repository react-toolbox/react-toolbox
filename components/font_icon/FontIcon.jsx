import React from 'react';
import ClassNames from 'classnames';

const FontIcon = ({ children, className, value, ...other}) => {
  const classes = ClassNames(
    {'material-icons': !React.isValidElement(value)},
    className
  );
  return (
    <span className={classes} {...other} >
      {value}
      {children}
    </span>
  );
};

FontIcon.propTypes = {
  children: React.PropTypes.any,
  className: React.PropTypes.string,
  value: React.PropTypes.any
};

FontIcon.defaultProps = {
  className: ''
};

export default FontIcon;
