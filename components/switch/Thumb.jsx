import React, { PropTypes } from 'react';
import Ripple from '../ripple';
import style from './style';

const Thumb = ({children, onMouseDown}) => (
  <span role='thumb' className={style.thumb} onMouseDown={onMouseDown}>{children}</span>
);

Thumb.propTypes = {
  children: PropTypes.any
};

export default Ripple({
  className: style.ripple,
  spread: 2.6,
  centered: true
})(Thumb);
export {Thumb as RawThumb};
