import React from 'react';
import style from './style';


const ListItemLeft = ({children}) => {
  return <div className={`${style.icon} ${style.left}`}> {children} </div>;
};

export default ListItemLeft;
