import React, { PropTypes } from 'react';
import { themr } from 'react-css-themr';
import classnames from 'classnames';
import { CARD } from '../identifiers.js';

const Card = ({children, className, raised, theme, ...other}) => {
  const classes = classnames(theme.card, {
    [theme.raised]: raised
  }, className);

  return (
    <div data-react-toolbox='card' className={classes} {...other}>
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  raised: PropTypes.bool,
  theme: React.PropTypes.shape({
    card: React.PropTypes.string,
    raised: React.PropTypes.string
  })
};

export default themr(CARD)(Card);
export { Card };
