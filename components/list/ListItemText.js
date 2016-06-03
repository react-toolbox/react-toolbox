import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import { LIST } from '../identifiers.js';

const ListItemText = ({className, primary, children, theme, ...other}) => {
  const _className = classnames(theme.itemText, {[theme.primary]: primary}, className);
  return (
    <span data-react-toolbox="list-item-text" className={_className} {...other}>
      {children}
    </span>
  );
};

ListItemText.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  primary: PropTypes.bool,
  theme: PropTypes.shape({
    itemText: PropTypes.string,
    primary: PropTypes.string
  })
};

ListItemText.defaultProps = {
  primary: false
};

export default themr(LIST)(ListItemText);
export { ListItemText };
