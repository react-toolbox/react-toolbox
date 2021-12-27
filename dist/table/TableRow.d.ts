import * as React from 'react';
import ReactToolbox from "../index";

export interface TableRowTheme {
  /**
   * Modifier for cells that include a select checkbox.
   */
  checkboxCell?: string;
  /**
   * Added to each row in the table except for the header.
   */
  row?: string;
  /**
   * Modifier for rows that are selected.
   */
  selected?: string;
}

export interface TableRowProps extends ReactToolbox.Props {
  /**
   * The index of the row.
   */
  idx?: number;
  /**
   * Handle the select state change of the checkbox in the ow.
   */
  onSelect?: Function;
  /**
   * If true, each row will display a checkbox to allow the user to select that one row.
   * @default true
   */
  selectable?: boolean;
  /**
   * If true, the row will be considered as selected so the row will display a selected style with the selection control activated. This property is used by `Table` to figure out the selection when you interact with the Table.
   */
  selected?: boolean;
  /**
   * Classnames object defining the component style.
   */
  theme?: TableRowTheme;
}

export class TableRow extends React.Component<TableRowProps, {}> { }
export default TableRow;
