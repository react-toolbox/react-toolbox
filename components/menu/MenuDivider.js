import React from 'react';
import PropTypes from 'prop-types';
import { themr } from 'react-css-themr';
import { MENU } from '../identifiers';

const MenuDivider = ({ theme }) => (
  <hr data-react-toolbox="menu-divider" aria-hidden="true" className={theme.menuDivider} />
);

MenuDivider.propTypes = {
  theme: PropTypes.shape({
    menuDivider: PropTypes.string,
  }),
};

export default themr(MENU)(MenuDivider);
export { MenuDivider };
