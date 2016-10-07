import React, { PropTypes } from 'react';
import classnames from 'classnames';

const factory = (ripple) => {
  const Check = ({checked, children, onMouseDown, theme, style}) => (
    <div
      data-react-toolbox='check'
      className={classnames(theme.check, { [theme.checked]: checked })}
      onMouseDown={onMouseDown}
      style={style}
    >
      {children}
    </div>
  );

  Check.propTypes = {
    checked: PropTypes.bool,
    children: PropTypes.any,
    onMouseDown: PropTypes.func,
    style: PropTypes.object,
    theme: PropTypes.shape({
      check: PropTypes.string,
      checked: PropTypes.string
    })
  };

  return ripple(Check);
};

export default factory;
