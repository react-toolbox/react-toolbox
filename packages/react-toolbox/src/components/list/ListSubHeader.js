import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import { LIST } from '../identifiers';

const ListSubHeader = ({ caption, className, theme }) => (
  <h5 className={classnames(theme.subheader, className)}>{caption}</h5>
);

ListSubHeader.propTypes = {
  caption: PropTypes.string,
  className: PropTypes.string,
  theme: PropTypes.object, // eslint-disable-line
};

ListSubHeader.defaultProps = {
  className: '',
};

export default themr(LIST)(ListSubHeader);
export { ListSubHeader };
