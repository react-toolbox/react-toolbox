import React from 'react';
import RippleDecorator from '../ripple/RippleDecorator';
import style from './style';

const Radio = ({checked, children, onMouseDown}) => {
  const className = style[checked ? 'radio-checked' : 'radio'];
  return <div data-role='radio' onMouseDown={onMouseDown} className={className}>{children}</div>;
};

export default RippleDecorator({
  className: style.ripple,
  spread: 2.6,
  centered: true
})(Radio);
