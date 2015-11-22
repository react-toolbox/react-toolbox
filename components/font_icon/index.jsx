import React from 'react';
import ClassNames from 'classnames';

const FontIcon = ({
  children,
  className,
  value,
  ...otherProps
}) => {

  const classes = ClassNames('material-icons', className);

  return (
    <span className={classes} {...otherProps} >
      {value ? value : children}
    </span>
  );
};

FontIcon.propTypes = {
  children: React.PropTypes.string,
  className: React.PropTypes.string,
  value: React.PropTypes.string
};

FontIcon.defaultProps = {
  className: ''
};

export default FontIcon;
