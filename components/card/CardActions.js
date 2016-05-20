import React, { PropTypes } from 'react';
import { themr } from 'react-css-themr';
import classnames from 'classnames';

const CardActions = ({ children, className, theme, ...other }) => (
  <div className={classnames(theme.cardActions, className)} {...other}>
    {children}
  </div>
);

CardActions.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  theme: React.PropTypes.shape({
    cardActions: React.PropTypes.string.isRequired
  })
};

export default themr('ToolboxCard')(CardActions);
