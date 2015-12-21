import React from 'react';
import style from './style';

const ListItemAvatar = ({children}) => {
  return <span className={style.avatar}> {children} </span>;
}

export default ListItemAvatar;
