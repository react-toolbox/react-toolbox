import * as React from "react";
import ReactToolbox from "../index";

export interface TableTheme {
  /**
   * Used the root element of the component (table).
   */
  table?: string;
  /**
   * Used for the thead element.
   */
  head?: string;
  /**
   * Added to each row in the table except for the header.
   */
  row?: string;
  /**
   * Modifier for rows that are selected.
   */
  selected?: string;
  /**
   * Added to each cell displayed in the head.
   */
  headCell?: string;
  /**
   * Added to each cell displayed in the table body.
   */
  rowCell?: string;
  /**
   * Modifier for cells that are sorted asc or desc.
   */
  sorted?: string;
  /**
   * Modifier for cells that are numeric.
   */
  numeric?: string;
  /**
   * Modifier for cells that include a select checkbox.
   */
  checkboxCell?: string;
  /**
   * Used for the sort icon included in sorted cells.
   */
  sortIcon?: string;
  /**
   * Modifier for the icon in case the order is ascendent.
   */
  asc?: string;
}

interface TableProps extends ReactToolbox.Props {
  /**
   * If true, each row will display a checkbox to allow the user to select that one row.
   * @default true
   */
  selectable?: boolean;
  /**
   * If true, the header and each row will display a checkbox to allow the user to select multiple rows.
   * @default true
   */
  multiSelectable?: boolean;
  /**
   * Will be called when the row selection changes. It passes an array of selected indexes as first parameter so you can figure out changes in your local state.
   */
  onRowSelect?: any[];
  /**
   * Classnames object defining the component style.
   */
  theme?: TableTheme;
}

export class Table extends React.Component<TableProps, {}> { }

interface TableHeadProps extends ReactToolbox.Props {
  /**
   * If true, a checkbox will be displayed to select every row. In case the table is not multi-selectable, it will be disabled though.
   * @default true
   */
  displaySelect?: boolean;
}

export class TableHead extends React.Component<TableHeadProps, {}> { }

interface TableRowProps extends ReactToolbox.Props {
  /**
   * If true, the row will be considered as selected so the row will display a selected style with the selection control activated. This property is used by Table to figure out the selection when you interact with the Table.
   * @default false
   */
  selected?: boolean;
}

export class TableRow extends React.Component<TableRowProps, {}> { }

interface TableCellProps extends ReactToolbox.Props {
  /**
   * If true the cell is considered as numeric and the content will be displayed aligned to right.
   * @default false
   */
  numberic?: boolean;
  /**
   * Optional. If you provide a value the cell will show an arrow pointing down or up depending on the value to indicate it is a sorted element. Useful only for columns.
   */
  sorted?: boolean;
}

export class TableCell extends React.Component<TableCellProps, {}> { }
