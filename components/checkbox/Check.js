import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styleShape from 'react-style-proptype';

const factory = (ripple) => {
  const Check = ({ checked, children, onMouseDown, theme, style }) => (
    <div
      data-react-toolbox="check"
      className={classnames(theme.check, { [theme.checked]: checked })}
      onMouseDown={onMouseDown}
      style={style}
    >
      {children}
    </div>
  );

  Check.propTypes = {
    checked: PropTypes.bool,
    children: PropTypes.node,
    onMouseDown: PropTypes.func,
    style: styleShape,
    theme: PropTypes.shape({
      check: PropTypes.string,
      checked: PropTypes.string,
    }),
  };

  return ripple(Check);
};

export default factory;
