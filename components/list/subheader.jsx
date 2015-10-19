import React from 'react';
import style from './style';

const ListSubHeader = ({ caption }) => {
  return (
    <h5 className={style.subheader}>
      { caption }
    </h5>
  );
};

ListSubHeader.propTypes = {
  caption: React.PropTypes.string
};

export default ListSubHeader;
