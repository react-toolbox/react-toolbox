import React, { PropTypes } from 'react';
import { themr } from 'react-css-themr';
import classnames from 'classnames';
import { CARD } from '../identifiers.js';

const CardText = ({ children, className, theme, ...other }) => (
  <div className={classnames(theme.cardText, className)} {...other}>
    {typeof children === 'string' ? <p>{children}</p> : children}
  </div>
);

CardText.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  theme: PropTypes.shape({
    cardText: PropTypes.string
  })
};

export default themr(CARD)(CardText);
export { CardText };
