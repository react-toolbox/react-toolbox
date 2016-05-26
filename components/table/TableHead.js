import React from 'react';
import Checkbox from '../checkbox';

const TableHead = ({model, onSelect, selectable, multiSelectable, selected, theme}) => {
  let selectCell;
  const contentCells = Object.keys(model).map((key) => {
    const name = model[key].title || key;
    return <th key={key}>{name}</th>;
  });

  if (selectable && multiSelectable) {
    selectCell = (
      <th key='select' className={theme.selectable}>
        <Checkbox onChange={onSelect} checked={selected}/>
      </th>
    );
  } else if (selectable) {
    selectCell = (
      <th key='select' className={theme.selectable}></th>
    );
  }
  return (
    <thead>
      <tr>{[selectCell, ...contentCells]}</tr>
    </thead>
  );
};

TableHead.propTypes = {
  className: React.PropTypes.string,
  model: React.PropTypes.object,
  multiSelectable: React.PropTypes.bool,
  onSelect: React.PropTypes.func,
  selectable: React.PropTypes.bool,
  selected: React.PropTypes.bool,
  theme: React.PropTypes.shape({
    selectable: React.PropTypes.string
  })
};

TableHead.defaultProps = {
  className: '',
  model: {},
  selected: false
};

export default TableHead;
