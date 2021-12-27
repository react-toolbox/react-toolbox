import * as React from "react";
import ReactToolbox from "../index";

export interface CardTheme {
  /**
   * Class used for the root element.
   */
  card?: string;
  /**
    *Added to the root element in case the card is raised.
   */
  raised?: string;
}

export interface CardProps extends ReactToolbox.Props {
  /**
   * Children to pass through the component.
   */
  children?: React.ReactNode;
  /**
   * Increases the shadow depth to appear elevated.
   * @default false
   */
  raised?: boolean;
  /**
   * Classnames object defining the component style.
   */
  theme?: CardTheme;
  /**
   * Additional properties passed to component root.
   */
  [key: string]: any;
}

export class Card extends React.Component<CardProps, {}> { }

export default Card;
