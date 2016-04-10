import React, { PropTypes } from 'react';
import Ripple from '../ripple';
import style from './style';

const Radio = ({checked, children, onMouseDown}) => {
  const className = style[checked ? 'radio-checked' : 'radio'];
  return <div data-react-toolbox='radio' onMouseDown={onMouseDown} className={className}>{children}</div>;
};

Radio.propTypes = {
  checked: PropTypes.bool,
  children: PropTypes.any,
  onMouseDown: PropTypes.func
};

export default Ripple({
  className: style.ripple,
  spread: 2.6,
  centered: true
})(Radio);
export {Radio as RawRadio};
