import React from 'react';
import style from './style';

const ListItemLegend = ({children}) => {
  return <span className={style.legend}> {children} </span>;
};

export default ListItemLegend;
