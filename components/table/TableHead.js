import React, { PropTypes } from 'react';

const factory = (Checkbox, FontIcon) => {
  const TableHead = ({model, onSelect, selectable, multiSelectable, selected, theme, sortColumn, sortDirection}) => {
    let selectCell;
    const contentCells = Object.keys(model).map((key) => {
      const name = model[key].title || key;
      const onClick = model[key].onClick;
      return (
        <th
          key={key}
          className={onClick && theme.clickable}
          onClick={onClick}>
          {sortColumn === key && sortDirection === 'asc'
            && <FontIcon value="arrow_upward" className={theme.ascIcon} />
          }
          {sortColumn === key && sortDirection === 'desc'
            && <FontIcon value="arrow_downward" className={theme.descIcon} />
          }
          {name}
        </th>
      );
    });

    if (selectable && multiSelectable) {
      selectCell = (
        <th key='select' className={theme.selectable}>
          <Checkbox onChange={onSelect} checked={selected}/>
        </th>
      );
    } else if (selectable) {
      selectCell = (
        <th key='select' className={theme.selectable}/>
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
    sortColumn: PropTypes.string,
    sortDirection: PropTypes.string,
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
