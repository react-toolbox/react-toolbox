import React from 'react';
import RippleDecorator from '../ripple/RippleDecorator';
import style from './style';

const Check = ({children, onMouseDown}) => (
  <span role='thumb' className={style.thumb} onMouseDown={onMouseDown}>{children}</span>
);

export default RippleDecorator({
  className: style.ripple,
  spread: 2.6,
  centered: true
})(Check);
