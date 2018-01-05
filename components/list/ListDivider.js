import React from 'react';
import PropTypes from 'prop-types';
import { themr } from 'react-css-themr';
import { LIST } from '../identifiers';

const ListDivider = ({ inset, li, theme }) => {
  const hr = (
    <hr
      aria-hidden="true"
      className={inset ? `${theme.divider} ${theme.inset}` : theme.divider}
    />
  );
  return li ? <li aria-hidden="true">{hr}</li> : hr;
};

ListDivider.propTypes = {
  inset: PropTypes.bool,
  li: PropTypes.bool,
  theme: PropTypes.shape({
    divider: PropTypes.string,
    inset: PropTypes.string,
  }),
};

ListDivider.defaultProps = {
  inset: false,
  li: true,
};

export default themr(LIST)(ListDivider);
export { ListDivider };
