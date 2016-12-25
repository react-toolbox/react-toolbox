import * as React from "react";
import ReactToolbox from "../index";

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

export default TableHead;
