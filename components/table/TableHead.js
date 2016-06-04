import React, { PropTypes } from 'react';

const factory = (Checkbox) => {
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
    className: PropTypes.string,
    model: PropTypes.object,
    multiSelectable: PropTypes.bool,
    onSelect: PropTypes.func,
    selectable: PropTypes.bool,
    selected: PropTypes.bool,
    theme: PropTypes.shape({
      selectable: PropTypes.string
    })
  };

  TableHead.defaultProps = {
    className: '',
    model: {},
    selected: false
  };

  return TableHead;
};

export default factory;
