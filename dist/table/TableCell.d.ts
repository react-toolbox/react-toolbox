import * as React from 'react';
import ReactToolbox from "../index";

export interface TableCellTheme {
  /**
   * Modifier for the icon in case the order is ascendent.
   */
  asc?: string;
  /**
   * Added to each cell displayed in the head.
   */
  headCell?: string;
  /**
   * Modifier for cells that are numeric.
   */
  numeric?: string;
  /**
   * Added to each cell displayed in the table body.
   */
  rowCell?: string;
  /**
   * Modifier for cells that are sorted asc or desc.
   */
  sorted?: string;
  /**
   * Used for the sort icon included in sorted cells.
   */
  sortIcon?: string;
  /**
   * Applied to the root element of the cell.
   */
  tableCell?: string;
}

export interface TableCellProps extends ReactToolbox.Props {
  /**
   * The column number of this cell.
   */
  column?: number;
  /**
   * If true the cell is considered as numeric and the content will be displayed aligned to right.
   * @default false
   */
  numeric?: boolean;
  /**
   * Called when the cell is clicked with the click event, column number and row number.
   */
  onClick?: Function;
  /**
   * The row number of the cell.
   */
  row?: number;
  /**
   * If you provide a value the cell will show an arrow pointing down or up depending on the value to indicate it is a sorted element. Useful only for columns.
   */
  sorted?: 'asc' | 'desc';
  /**
   * The element tag, either `td` or `th`.
   * @default 'td'
   */
  tagName?: 'td' | 'th';
  /**
   * Classnames object defining the component style.
   */
  theme?: TableCellTheme;
}

export class TableCell extends React.Component<TableCellProps, {}> { }
export default TableCell;
