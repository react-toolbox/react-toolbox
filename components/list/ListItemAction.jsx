import React from 'react';
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
};

ListItemAction.defaultProps = {
};

export default ListItemAction;
