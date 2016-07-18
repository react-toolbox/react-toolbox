import __ReactToolbox from "../index.d.ts";

export interface TableTheme {
  editable?: string;
  row?: string;
  selectable?: string;
  selected?: string;
  table?: string;
}

interface TableProps extends __ReactToolbox.Props {
  heading?: boolean;
  model?: any;
  onChange?: Function;
  onSelect?: __React.FormEventHandler;
  selectable?: boolean;
  multiSelectable?: boolean;
  selected?: any[];
  source?: any[];
  /**
   * Classnames object defining the component style.
   */
  theme?: TableTheme;
}

export class Table extends __React.Component<TableProps, {}> { }

export default Table;
