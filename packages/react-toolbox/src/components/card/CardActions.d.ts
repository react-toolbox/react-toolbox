import * as React from "react";
import ReactToolbox from "../index";

export interface CardActionsTheme {
  /**
   * Used for a wrapper around actions as the root element.
   */
  cardActions?: string;
}

export interface CardActionsProps extends ReactToolbox.Props {
  /**
   * Children to pass through the component.
   */
  children?: React.ReactNode;
  /**
   * Classnames object defining the component style.
   */
  theme?: CardActionsTheme;
  /**
   * Additional properties passed to component root.
   */
  [key: string]: any;
}

export class CardActions extends React.Component<CardActionsProps, {}> { }
export default CardActions;
