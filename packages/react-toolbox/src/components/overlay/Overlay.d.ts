import * as React from "react";

export interface OverlayTheme {
  /**
   * Active class name.
   */
  active?: string;
  /**
   * Backdrop class name.
   */
  backdrop?: string;
  /**
   * Invisible class name.
   */
  invisible?: string;
  /**
   * Overlay class name.
   */
  overlay?: string;
}


export interface OverlayProps {
  /**
   * Whether overlay is active.
   */
  active?: boolean;
  /**
   * Nodes to be nested inside Overlay.
   */
  children?: React.ReactNode;
  /**
   * Additional class name(s) for root container.
   */
  className?: string;
  /**
   * Whether Overlay should have 'invisible' styles.
   * @default false
   */
  invisible?: boolean;
  /**
   * Callback invoked on Overlay click.
   */
  onClick?: Function;
  /**
   * Callback invoked on ESC key.
   */
  onEscKeyDown?: Function;
  /**
   * Overlay theme.
   */
  theme?: OverlayTheme;
}

export class Overlay extends React.Component<OverlayProps, {}> { }

export default Overlay;
