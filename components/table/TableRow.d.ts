import * as React from "react";
import ReactToolbox from "../index";
import { TableHeadTheme } from './TableHead';

export interface TableRowTheme extends TableHeadTheme {
  /**
   * It will be added to a row in case it is editable.
   */
  editable?: string;
  /**
   * Used for the row element.
   */
  row?: string;
  /**
   * Added to a row in case it is selected.
   */
  selected?: string;
}

export interface TableRowProps {
  /**
   * Single row data.
   */
  data?: any;
  /**
   * Row index.
   */
  index?: number;
  /**
   * Object describing the data model that represents each object in the source.
   */
  model?: any;
  /**
   * Callback function that is fired when an item in a row changes. If set, rows are editable.
   */
  onChange?: Function;
  /**
   * Callback fired when row was clicked.
   */
  onRowClick?: Function;
  /**
   * Callback function invoked when the row selection changes.
   */
  onSelect?: Function;
  /**
   * If true, each row will display a checkbox to allow the user to select that one row.
   * @default true
   */
  selectable?: boolean;
  /**
   * Whether table row should look selected.
   * @default false
   */
  selected?: boolean;
}

export class TableRow extends React.Component<TableRowProps, {}> { }

export default TableRow;
