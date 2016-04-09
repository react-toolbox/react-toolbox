import React, { PropTypes } from 'react';
import style from './style';

const ListItemAction = ({action}) => {
  const {onClick, onMouseDown} = action.props;
  const stopRipple = onClick && !onMouseDown;
  const stop = e => e.stopPropagation();
  return (
    <span className={style.itemAction} onMouseDown={stopRipple && stop} onClick={onClick && stop}>
      {action}
    </span>
  );
};

ListItemAction.propTypes = {
  action: PropTypes.object
};

ListItemAction.defaultProps = {
};

export default ListItemAction;
