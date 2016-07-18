import __ReactToolbox from "../index.d.ts";

export interface SnackbarTheme {
  accept?: string;
  active?: string;
  button?: string;
  cancel?: string;
  icon?: string;
  label?: string;
  snackbar?: string;
  warning?: string;
}

interface SnackbarProps extends __ReactToolbox.Props {
  action?: string;
  active?: boolean;
  icon?: __React.ReactNode | string;
  label?: string;
  onTimeout?: Function;
  /**
   * Classnames object defining the component style.
   */
  theme?: SnackbarTheme;
  timeout?: number;
  type?: "accept" | "cancel" | "warning";
}

export class Snackbar extends __React.Component<SnackbarProps, {}> { }

export default Snackbar;
