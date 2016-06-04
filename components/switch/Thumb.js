import React, { PropTypes } from 'react';

const factory = (ripple) => {
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

  return ripple(Thumb);
};

export default factory;
