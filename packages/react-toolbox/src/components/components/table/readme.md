# Data Table

The [Table component](https://material.google.com/components/data-tables.html) is an enhanced version of the standard HTML `<table>`. A data-table consists of rows and columns of well-formatted data, presented with appropriate user interaction capabilities. You can compose your Table with similar components to those you use directly in HTML.

<!-- example -->

```jsx
import React, { Component } from 'react';
import { Table, TableHead, TableRow, TableCell } from '../../components/table2';
import Tooltip from '../../components/tooltip';

const data = [
  {name: 'Cupcake', calories: 305, fat: 3.7, sodium: 413, calcium: '3%', iron: '8%'},
  {name: 'Donut', calories: 452, fat: 25.0, sodium: 326, calcium: '2%', iron: '22%'},
  {name: 'Eclair', calories: 262, fat: 16.0, sodium: 337, calcium: '6%', iron: '7%'},
  {name: 'Frozen yogurt', calories: 159, fat: 6.0, sodium: 87, calcium: '14%', iron: '1%'},
  {name: 'Gingerbread', calories: 356, fat: 16.0, sodium: 327, calcium: '7%', iron: '16%'},
  {name: 'Ice cream sandwich', calories: 237, fat: 9.0, sodium: 129, calcium: '8%', iron: '1%'},
  {name: 'Jelly bean', calories: 375, fat: 0.0, sodium: 50, calcium: '0%', iron: '0%'},
  {name: 'KitKat', calories: 518, fat: 26.0, sodium: 54, calcium: '12%', iron: '6%'}
];

const TooltipCell = Tooltip(TableCell);

const sortByCaloriesAsc = (a, b) => {
  if (a.calories < b.calories) return -1;
  if (a.calories > b.calories) return 1;
  return 0;
};

const sortByCaloriesDesc = (a, b) => {
  if (a.calories > b.calories) return -1;
  if (a.calories < b.calories) return 1;
  return 0;
};

class TableTest extends Component {
  state = {
    selected: ['Donut'],
    sorted: 'asc'
  };

  getSortedData = () => {
    const compare = this.state.sorted === 'asc' ? sortByCaloriesAsc : sortByCaloriesDesc;
    return data.sort(compare);
  }

  handleRowSelect = selected => {
    const sortedData = this.getSortedData();
    this.setState({ selected: selected.map(item => sortedData[item].name) });
  };

  handleSortClick = () => {
    const { sorted } = this.state;
    const nextSorting = sorted === 'asc' ? 'desc' : 'asc';
    this.setState({ sorted: nextSorting });
  };

  render () {
    const { sorted } = this.state;
    const sortedData = this.getSortedData();
    return (
      <Table multiSelectable onRowSelect={this.handleRowSelect} style={{ marginTop: 10 }}>
        <TableHead>
          <TooltipCell tooltip="The total amount of food energy in the given serving size">
            Dessert (100g serving)
          </TooltipCell>
          <TableCell onClick={this.handleSortClick} numeric sorted={sorted}>Calories</TableCell>
          <TableCell numeric>Fat (g)</TableCell>
          <TableCell numeric>Sodium (mg)</TableCell>
          <TableCell numeric>Calcium (%)</TableCell>
          <TableCell numeric>Iron (%)</TableCell>
        </TableHead>
        {sortedData.map((item, idx) => (
          <TableRow key={idx} selected={this.state.selected.indexOf(item.name) !== -1}>
            <TableCell>{item.name}</TableCell>
            <TableCell numeric>{item.calories}</TableCell>
            <TableCell numeric>{item.fat}</TableCell>
            <TableCell numeric>{item.sodium}</TableCell>
            <TableCell numeric>{item.calcium}</TableCell>
            <TableCell numeric>{item.iron}</TableCell>
          </TableRow>
        ))}
      </Table>
    );
  }
}

export default TableTest;
```

If you want to provide styles via context to this components, you should use the key `RTTable`.

## Table

This is the `Table` main wrapper component. It parses children to generate an appropriated structure passing also some additional props so it's important to keep an eye on nesting.

### Properties

Name              | Type       | Default | Description
:---------------- | :--------- | :------ | :-------------------------------------------------------------
`children`        | `Node`     |         | Pass `TableHead` and `TableRow` components as children always.
`className`       | `String`   | `''`    | Sets a custom class to style the component.
`multiSelectable` | `Boolean`  | `false` | If true, the header and each row will display a checkbox to allow the user to select multiple rows at the same time.
`onRowSelect`     | `Function` |         | Will be called when the row selection changes. It passes an array of selected indexes as first parameter so you can figure out changes in your local state.
`selectable`      | `Boolean`  | `true`  | If true, each row will display a checkbox to allow the user to select that one row.

## TableHead

Header element that should be place as a direct descendant of `Table` and whose children should be `TableCells` that will be rendered as header cells. It receives properties from the parent to decide whether a select column should be placed/disabled or not.

### Properties

Name              | Type       | Default  | Description
:---------------- | :--------- | :------  | :----------------------------------------------
`children`        | `Node`     |          | Pass `TableCell` components always either decorated or not.
`className`       | `String`   | `''`     | Sets a custom class to style the header row.
`displaySelect`   | `Boolean`  | `true`   | If true, a checkbox will be displayed to select every row. In case the table is not multi-selectable, it will be disabled though.

## TableRow

An element that represents a row in the Table. It should be place as a direct descendant of `Table` and it should has `TableCells` children. It receives extra properties from `Table` to decide if checkboxes should be placed as a first column.

### Properties

Name              | Type       | Default  | Description
:---------------- | :--------- | :------  | :----------------------------------------------
`children`        | `Node`     |          | Pass `TableCell` components always either decorated or not.
`className`       | `String`   | `''`     | Sets a custom class to style the row.
`selected`        | `Boolean`  | `false`  | If true, the row will be considered as selected so the row will display a selected style with the selection control activated. This property is used by `Table` to figure out the selection when you interact with the Table.

## TableCell

Displays a cell of the `Table`. It renders a tag `td` or `th` depending on if it's set as direct children of `TableRow` or `TableHead`.

Name              | Type       | Default  | Description
:---------------- | :--------- | :------  | :----------------------------------------------
`children`        | `Any`      |          | Any content you want to render inside the cell.
`className`       | `String`   | `''`     | Sets a custom class to style that particular cell.
`numeric`         | `Boolean`  | `false`  | If true the cell is considered as numeric and the content will be displayed aligned to right.
`onClick`         | `Function` |          | Called when the cell is clicked with the click event, column number and row number.
`sorted`          | `Bool`     | `asc` or `desc` | Optional. If you provide a value the cell will show an arrow pointing down or up depending on the value to indicate it is a sorted element. Useful only for columns.

## Theme

Name           | Description
:------------- | :--------------------------------------------------
`table`        | Used the root element of the component (`table`).
`head`         | Used for the `thead` element.
`row`          | Added to each row in the table except for the header.
`selected`     | Modifier for rows that are selected.
`headCell`     | Added to each cell displayed in the head.
`rowCell`      | Added to each cell displayed in the table body.
`sorted`       | Modifier for cells that are sorted asc or desc.
`numeric`      | Modifier for cells that are numeric.
`checkboxCell` | Modifier for cells that include a select checkbox.
`sortIcon`     | Used for the sort icon included in sorted cells.
`asc`          | Modifier for the icon in case the order is ascendent.
