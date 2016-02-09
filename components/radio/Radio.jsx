import React from 'react';
import Ripple from '../ripple';
import style from './style';

const Radio = ({checked, children, onMouseDown}) => {
  const className = style[checked ? 'radio-checked' : 'radio'];
  return <div data-react-toolbox='radio' onMouseDown={onMouseDown} className={className}>{children}</div>;
};

export default Ripple({
  className: style.ripple,
  spread: 2.6,
  centered: true
})(Radio);
export {Radio as RawRadio};
