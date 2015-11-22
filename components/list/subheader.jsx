import React from 'react';
import style from './style';

const ListSubHeader = (props) => {
  let className = style.subheader;
  if (props.className) className += ` ${props.className}`;
  return <h5 className={className}>{props.caption}</h5>;
};

ListSubHeader.propTypes = {
  caption: React.PropTypes.string,
  className: React.PropTypes.string
};

export default ListSubHeader;
