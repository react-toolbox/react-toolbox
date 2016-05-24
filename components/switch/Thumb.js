import React, { PropTypes } from 'react';
import Ripple from '../ripple';

const Thumb = ({onMouseDown, theme, ...other}) => (
  <span role='thumb' className={theme.thumb} onMouseDown={onMouseDown} {...other} />
);

Thumb.propTypes = {
  children: PropTypes.any,
  theme: PropTypes.shape({
    ripple: PropTypes.string,
    thumb: PropTypes.string
  })
};

export default Ripple({spread: 2.6, centered: true})(Thumb);
export {Thumb as RawThumb};
