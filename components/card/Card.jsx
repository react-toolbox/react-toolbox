import React, { PropTypes } from 'react';
import ClassNames from 'classnames';
import style from './style';

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
    <div
      data-react-toolbox="card"
      className={classes}
      {...otherProps}
    >
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  raised: PropTypes.bool
};

export default Card;
