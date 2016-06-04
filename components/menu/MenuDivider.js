import React, { PropTypes } from 'react';
import { themr } from 'react-css-themr';
import { MENU } from '../identifiers.js';

const MenuDivider = ({ theme }) => (
  <hr data-react-toolbox='menu-divider' className={theme.menuDivider}/>
);

MenuDivider.propTypes = {
  theme: PropTypes.shape({
    menuDivider: PropTypes.string
  })
};

export default themr(MENU)(MenuDivider);
export { MenuDivider };
