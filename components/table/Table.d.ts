import * as React from "react";
import ReactToolbox from "../index";
import { TableRowTheme } from './TableRow';

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

export default Table;
