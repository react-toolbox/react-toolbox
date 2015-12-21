import React from 'react';
import style from './style';

const ListItemContent = ({children}) => (
  <span className={style.text}> {children} </span>
);

export default ListItemContent;
