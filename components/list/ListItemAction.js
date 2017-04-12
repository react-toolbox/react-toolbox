import React from 'react';
import PropTypes from 'prop-types';
import { themr } from 'react-css-themr';
import { LIST } from '../identifiers';

const ListItemAction = ({ action, theme }) => {
  const { onClick, onMouseDown } = action.props;
  const stopRipple = onClick && !onMouseDown;
  const stop = e => e.stopPropagation();
  return (
    <span className={theme.itemAction} onMouseDown={stopRipple && stop} onClick={onClick && stop}>
      {action}
    </span>
  );
};

ListItemAction.propTypes = {
  action: PropTypes.node,
  theme: PropTypes.shape({
    itemAction: PropTypes.string,
  }),
};

export default themr(LIST)(ListItemAction);
export { ListItemAction };
