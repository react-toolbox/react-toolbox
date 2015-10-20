import React from 'react';
import style from './style';

const FontIcon = props  => {
  let className = style[props.value];
  if (props.className) className += ` ${props.className}`;
  return (
    <span data-react-toolbox='icon' {...props} className={className}>
      {props.children}
    </span>
  );
};

FontIcon.propTypes = {
  className: React.PropTypes.string,
  value: React.PropTypes.string
};

FontIcon.defaultProps = {
  className: ''
};

export default FontIcon;
