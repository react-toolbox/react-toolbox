import React from 'react';
import { themr } from 'react-css-themr';
import { LIST } from '../identifiers.js';

const ListDivider = ({inset, theme}) => (
  <hr className={inset ? `${theme.divider} ${theme.inset}` : theme.divider} />
);

ListDivider.propTypes = {
  inset: React.PropTypes.bool,
  theme: React.PropTypes.shape({
    divider: React.PropTypes.string.isRequired,
    inset: React.PropTypes.string.isRequired
  })
};

ListDivider.defaultProps = {
  inset: false
};

export default themr(LIST)(ListDivider);
export { ListDivider };
