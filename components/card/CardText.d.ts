import * as React from "react";
import ReactToolbox from "../index";

export interface CardTextTheme {
  /**
   * Used for the main root element.
   */
  cardText?: string;
}

export interface CardTextProps extends ReactToolbox.Props {
  /**
   * Children to pass through the component.
   */
  children?: React.ReactNode;
  /**
   * Classnames object defining the component style.
   */
  theme?: CardTextTheme;
  /**
   * Additional properties passed to component root.
   */
  [key: string]: any;
}

export class CardText extends React.Component<CardTextProps, {}> { }
export default CardText;
