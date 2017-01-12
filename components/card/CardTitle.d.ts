import * as React from "react";
import ReactToolbox from "../index";

export interface CardTitleTheme {
  /**
   * Class used for the root element.
   */
  cardTitle?: string;
  /**
   * Added to the root element when the card has no avatar.
   */
  large?: string;
  /**
   * Added to the title element.
   */
  title?: string;
  /**
   * Added to the root element when the card has avatar.
   */
  small?: string;
  /**
   * Added to the subtitle element.
   */
  subtitle?: string;
}

export interface CardTitleProps extends ReactToolbox.Props {
  /**
   * A string URL or Element to specify an avatar in the left side of the title.
   */
  avatar?: React.ReactNode;
  /**
   * Children to pass through the component.
   */
  children?: React.ReactNode;
  /**
   * Text used for the sub header of the card.
   */
  subtitle?: React.ReactNode;
  /**
   * Classnames object defining the component style.
   */
  theme?: CardTitleTheme;
  /**
   * Text used for the title of the card.
   */
  title?: React.ReactNode;
}

export class CardTitle extends React.Component<CardTitleProps, {}> { }
export default CardTitle;
