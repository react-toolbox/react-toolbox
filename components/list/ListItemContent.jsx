import React from 'react';
import style from './style';

const ListItemContent = ({caption, legend}) => (
  <span className={style.text}>
    <span className={style.caption}>{caption}</span>
    <span className={style.legend}>{legend}</span>
  </span>
);

ListItemContent.propTypes = {
  caption: React.PropTypes.string.isRequired,
  legend: React.PropTypes.any
};

export default ListItemContent;
