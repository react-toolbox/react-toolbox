import React from 'react';
import classnames from 'classnames';

const FontIcon = ({ children, className, value, ...other}) => (
  <span
    data-react-toolbox='font-icon'
    className={classnames({'material-icons': typeof value === 'string'}, className)}
    {...other}
  >
    {value}
    {children}
  </span>
);

FontIcon.propTypes = {
  children: React.PropTypes.any,
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
