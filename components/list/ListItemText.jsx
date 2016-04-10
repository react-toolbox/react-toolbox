import React from 'react';
import ClassNames from 'classnames';
import style from './style';

const ListItemText = ({className, primary, children, ...other}) => {
  const _className = ClassNames(style.itemText, {[style.primary]: primary}, className);

  return (
    <span data-react-toolbox="list-item-text" className={_className} {...other}>
      {children}
    </span>
  );
};

ListItemText.propTypes = {
  children: React.PropTypes.any,
  className: React.PropTypes.string,
  primary: React.PropTypes.bool
};

ListItemText.defaultProps = {
  primary: false
};

export default ListItemText;
