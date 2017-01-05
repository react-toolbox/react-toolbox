import * as React from "react";
import ReactToolbox from "../index";

export interface TableTheme {
  /**
   * Used for the `thead` element.
   */
  head?: string;
  /**
   * Used for the root element of the component (`table`).
   */
  table?: string;
}

export interface TableProps extends ReactToolbox.Props {
  /**
   * If true, the header and each row will display a checkbox to allow the user to select multiple rows.
   * @default true
   */
  multiSelectable?: boolean;
  /**
   * Will be called when the row selection changes. It passes an array of selected indexes as first parameter so you can figure out changes in your local state.
   */
  onRowSelect?: Function;
  /**
   * If true, each row will display a checkbox to allow the user to select that one row.
   * @default true
   */
  selectable?: boolean;
  /**
   * Classnames object defining the component style.
   */
  theme?: TableTheme;
}

export class Table extends React.Component<TableProps, {}> { }

export default Table;
