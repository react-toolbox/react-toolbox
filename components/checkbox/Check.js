import React, { PropTypes } from 'react';
import classnames from 'classnames';

const factory = (ripple) => {
  const Check = ({checked, children, onMouseDown, theme}) => (
    <div
      data-react-toolbox='check'
      className={classnames(theme.check, { [theme.checked]: checked })}
      onMouseDown={onMouseDown}
    >
      {children}
    </div>
  );

  Check.propTypes = {
    checked: PropTypes.bool,
    children: PropTypes.any,
    onMouseDown: PropTypes.func,
    theme: React.PropTypes.shape({
      check: React.PropTypes.string.isRequired,
      checked: React.PropTypes.string.isRequired
    })
  };

  return ripple(Check);
};

export default factory;
