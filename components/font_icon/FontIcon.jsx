import React from 'react';
import ClassNames from 'classnames';

const FontIcon = ({ children, className, color, value, ...other}) => {
  const classes = ClassNames(
    {'material-icons': typeof value === 'string'},
    className
  );
  return (
    <span className={classes} {...other} data-react-toolbox='font-icon'>
      {color ? <span style={{color:color}}>{value}</span> : value}
      {children}
    </span>
  );
};

FontIcon.propTypes = {
  children: React.PropTypes.any,
  color: React.PropTypes.string,
  className: React.PropTypes.string,
  value: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.element
  ])
};

FontIcon.defaultProps = {
  className: ''
};

export default FontIcon;
