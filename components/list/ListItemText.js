import React from 'react';
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
  children: React.PropTypes.any,
  className: React.PropTypes.string,
  primary: React.PropTypes.bool,
  theme: React.PropTypes.shape({
    itemText: React.PropTypes.string.isRequired,
    primary: React.PropTypes.string.isRequired
  })
};

ListItemText.defaultProps = {
  primary: false
};

export default themr(LIST)(ListItemText);
export { ListItemText };
