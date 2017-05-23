import React from 'react';
import PropTypes from 'prop-types';
import { themr } from 'react-css-themr';
import classnames from 'classnames';
import { CARD } from '../identifiers';

const CardText = ({ children, className, theme, ...other }) => (
  <div className={classnames(theme.cardText, className)} {...other}>
    {typeof children === 'string' ? <p>{children}</p> : children}
  </div>
);

CardText.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  theme: PropTypes.shape({
    cardText: PropTypes.string,
  }),
};

export default themr(CARD)(CardText);
export { CardText };
