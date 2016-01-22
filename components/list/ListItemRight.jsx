import React from 'react';
import style from './style';

const ListItemRight = ({children}) => {
 return <div className={`${style.icon} ${style.right}`}> {children} </div>;
};

export default ListItemRight;
