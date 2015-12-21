import React from 'react';
import style from './style';

const ListItemCaption = ({children}) => {
  return <span className={style.caption}> {children} </span>;
}

export default ListItemCaption;
