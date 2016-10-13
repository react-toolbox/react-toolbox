import React, { PropTypes } from 'react';
import classnames from 'classnames';

const MaterialIcon = ({ children, className, value, ...other}) => (
  <span
    data-react-toolbox='font-icon'
    className={classnames({'material-icons': typeof value === 'string' || typeof children === 'string'}, className)}
    {...other}
  >
    {value}
    {children}
  </span>
);

MaterialIcon.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ])
};

export default MaterialIcon;
