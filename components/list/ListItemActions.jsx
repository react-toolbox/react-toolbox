import React from 'react';
import style from './style';

const ListItemActions = ({type, children}) => {
  const validChildren = React.Children.toArray(children).filter(c => (
    React.isValidElement(c)
  ));

  return (
    <span className={style[type]}>
      {validChildren.map((child, i) => {
        return <span className={style.itemChild} key={i}> {child} </span>;
      })}
    </span>
  );
};

ListItemActions.propTypes = {
  children: React.PropTypes.any,
  type: React.PropTypes.oneOf(['left', 'right'])
};

export default ListItemActions;
