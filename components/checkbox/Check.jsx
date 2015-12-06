import React from 'react';
import ClassNames from 'classnames';
import RippleDecorator from '../ripple/RippleDecorator';
import style from './style';

const Check = ({checked, children, onMouseDown}) => {
  const className = ClassNames(style.check, {
    [style.checked]: checked
  });

  return <div data-role='checkbox' onMouseDown={onMouseDown} className={className}>{children}</div>;
};

export default RippleDecorator(Check, {
  className: style.ripple,
  spread: 2.6,
  centered: true
});
