import React, { PropTypes } from 'react';
import ClassNames from 'classnames';
import style from './style';

/**
 * The base card component. This acts as the main card element
 * that all subcomponents are placed within.
 */
const Card = ({
    children,
    className,
    raised,
    ...otherProps
  }) => {

  const classes = ClassNames(style.card, {
    [style.raised]: raised
  }, className);

  return (
    <div className={classes} {...otherProps}>
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  /** Increases the shadow depth */
  raised: PropTypes.bool
};

export default Card;
