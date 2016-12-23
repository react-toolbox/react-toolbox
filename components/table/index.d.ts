import * as React from "react";
import ReactToolbox from "../index";

export interface TableTheme extends TableRowTheme {
  /**
   * Classname used for the root element.
   */
  table?: string;
}

export interface TableProps extends ReactToolbox.Props {
  /**
   * If true, component will show a heading using model field names.
   * @default true
   */
  heading?: boolean;
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
   * If true, the header and each row will display a checkbox to allow the user to select multiple rows.
   * @default true
   */
  multiSelectable?: boolean;
  /**
   * Array of indexes of the items in the source that should appear as selected.
   */
  selected?: any[];
  /**
   * Array of objects representing each item to show.
   */
  source?: any[];
  /**
   * Classnames object defining the component style.
   */
  theme?: TableTheme;
}

export class Table extends React.Component<TableProps, {}> { }

export interface TableHeadTheme {
  /**
   * It will be added to a row in case it is selectable.
   */
  selectable?: string;
}

export interface TableHeadProps extends ReactToolbox.Props {
  /**
   * Object describing the data model that represents each object in the source.
   */
  model?: any;
  /**
   * If true, the header and each row will display a checkbox to allow the user to select multiple rows.
   */
  multiSelectable?: boolean;
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
   * Whether header should look selected.
   * @default false
   */
  selected?: boolean;
  /**
   * Classnames object defining the component style.
   */
  theme?: TableHeadTheme;
}

export class TableHead extends React.Component<TableHeadProps, {}> { }

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

export default Table;
