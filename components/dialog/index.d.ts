import __ReactToolbox from "../index.d.ts";

export interface DialogTheme {
  active?: string;
  body?: string;
  button?: string;
  dialog?: string;
  navigation?: string;
  title?: string;
}

interface DialogActionProps {
  label?: string;
}

interface DialogProps extends __ReactToolbox.Props {
  actions?: DialogActionProps[];
  active?: boolean;
  /**
   * Children to pass through the component.
   */
  children?: __React.ReactNode;
  onEscKeyDown?: __React.KeyboardEventHandler;
  onOverlayClick?: __React.MouseEventHandler;
  onOverlayMouseDown?: __React.MouseEventHandler;
  onOverlayMouseMove?: __React.MouseEventHandler;
  onOverlayMouseUp?: __React.MouseEventHandler;
  /**
   * Classnames object defining the component style.
   */
  theme?: DialogTheme;
  title?: string;
  type?: string;
}

export class Dialog extends __React.Component<DialogProps, {}> { }

export default Dialog;
