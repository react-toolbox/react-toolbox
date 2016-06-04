import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import { LIST } from '../identifiers.js';

const ListSubHeader = ({ caption, className, theme }) => (
  <h5 className={classnames(theme.subheader, className)}>{caption}</h5>
);

ListSubHeader.propTypes = {
  caption: PropTypes.string,
  className: PropTypes.string,
  theme: PropTypes.object
};

ListSubHeader.defaultProps = {
  className: ''
};

export default themr(LIST)(ListSubHeader);
export { ListSubHeader };
