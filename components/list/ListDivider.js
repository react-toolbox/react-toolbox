import React from 'react';
import PropTypes from 'prop-types';
import { themr } from 'react-css-themr';
import { LIST } from '../identifiers';

const ListDivider = ({ inset, thick, className, theme }) => (
  <hr className={`${inset && theme.inset} ${thick && theme.thick} ${theme.divider} ${className && className}`} />
);

ListDivider.propTypes = {
  className: PropTypes.string,
  inset: PropTypes.bool,
  theme: PropTypes.shape({
    divider: PropTypes.string,
    inset: PropTypes.string,
    thick: PropTypes.string,
  }),
  thick: PropTypes.bool,
};

ListDivider.defaultProps = {
  inset: false,
  className: false,
};

export default themr(LIST)(ListDivider);
export { ListDivider };
