import React, { PropTypes } from 'react';

const factory = (ripple) => {
  const Radio = ({checked, onMouseDown, theme, ...other}) => (
    <div
      data-react-toolbox='radio'
      className={theme[checked ? 'radioChecked' : 'radio']}
      onMouseDown={onMouseDown}
      {...other}
    />
  );

  Radio.propTypes = {
    checked: PropTypes.bool,
    children: PropTypes.any,
    onMouseDown: PropTypes.func,
    theme: PropTypes.shape({
      radio: PropTypes.string.isRequired,
      radioChecked: PropTypes.string.isRequired,
      ripple: PropTypes.string.isRequired
    })
  };

  return ripple(Radio);
};

export default factory;
