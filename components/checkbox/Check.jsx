import React, { PropTypes } from 'react';
import ClassNames from 'classnames';
import Ripple from '../ripple';
import style from './style';

const Check = ({checked, children, onMouseDown}) => {
  const className = ClassNames(style.check, {
    [style.checked]: checked
  });

  return <div data-react-toolbox='check' onMouseDown={onMouseDown} className={className}>{children}</div>;
};

Check.propTypes = {
  checked: PropTypes.bool,
  children: PropTypes.any,
  onMouseDown: PropTypes.func
};

export default Ripple({
  className: style.ripple,
  spread: 2.6,
  centered: true
})(Check);
export {Check as RawCheck};
