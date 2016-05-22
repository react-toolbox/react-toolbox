import React from 'react';
import { themr } from 'react-css-themr';

const MenuDivider = ({ theme }) => (
  <hr data-react-toolbox='menu-divider' className={theme.menuDivider}/>
);

MenuDivider.propTypes = {
  theme: React.PropTypes.shape({
    menuDivider: React.PropTypes.string.isRequired
  })
};

export default themr('ToolboxMenu')(MenuDivider);
