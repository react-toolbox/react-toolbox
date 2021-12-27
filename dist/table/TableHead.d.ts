import * as React from 'react';
import ReactToolbox from "../index";

export interface TableHeadTheme {
  /**
   * Modifier for cells that include a select checkbox.
   */
  checkboxCell?: string;
}

export interface TableHeadProps extends ReactToolbox.Props {
  /**
   * If true, a checkbox will be displayed to select every row. In case the table is not multi-selectable, it will be disabled though.
   * @default true
   */
  displaySelect?: boolean;
  /**
   * If true, the header and each row will display a checkbox to allow the user to select multiple rows.
   * @default true
   */
  multiSelectable?: boolean;
  /**
   * Handle the select state change of the checkbox in the header row.
   */
  onSelect?: Function;
  /**
   * If true, each row will display a checkbox to allow the user to select that one row.
   * @default true
   */
  selectable?: boolean;
  /**
   * If selectable, controls the selected state of the checkbox in the header row.
   */
  selected?: boolean;
  /**
   * Classnames object defining the component style.
   */
  theme?: TableHeadTheme;
}

export class TableHead extends React.Component<TableHeadProps, {}> { }
export default TableHead;
