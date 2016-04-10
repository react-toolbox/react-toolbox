import React from 'react';
import style from './style';
import ListItemAction from './ListItemAction';

const ListItemActions = ({type, children}) => {
  const validChildren = React.Children.toArray(children).filter(c => (
    React.isValidElement(c)
  ));

  return (
    <span className={style[type]}>
      {validChildren.map((action, i) => <ListItemAction key={i} action={action} />)}
    </span>
  );
};

ListItemActions.propTypes = {
  children: React.PropTypes.any,
  type: React.PropTypes.oneOf(['left', 'right'])
};

export default ListItemActions;
