import React from 'react';
import Checkbox from '../../checkbox';
import style from './style';

const Head = (props) => {
  return (
    <thead data-component-table-head className={props.className}>
      <tr>
      { props.onSelect ? <th className={style.selectable}><Checkbox/></th> : null }
      {
        Object.keys(props.model).map((key) => {
          return <th key={key}>{key}</th>
        })
      }
      </tr>
    </thead>
  );
};

Head.propTypes = {
  className: React.PropTypes.string,
  model: React.PropTypes.object,
  onSelect: React.PropTypes.func
};

Head.defaultProps = {
  className: '',
  model: {}
};

export default Head;
