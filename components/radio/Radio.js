import React from 'react';
import PropTypes from 'prop-types';

const factory = (ripple) => {
  const Radio = ({ checked, onMouseDown, theme, ...other }) => (
    <div
      data-react-toolbox="radio"
      className={theme[checked ? 'radioChecked' : 'radio']}
      onMouseDown={onMouseDown}
      {...other}
    />
  );

  Radio.propTypes = {
    checked: PropTypes.bool,
    children: PropTypes.node,
    onMouseDown: PropTypes.func,
    theme: PropTypes.shape({
      radio: PropTypes.string,
      radioChecked: PropTypes.string,
      ripple: PropTypes.string,
    }),
  };

  return ripple(Radio);
};

export default factory;
