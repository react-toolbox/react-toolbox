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

export interface CardMediaTheme {
  /**
   * Added to the element root.
   */
  cardMedia?: string;
  /**
   * Used for the content element.
   */
  content?: string;
  /**
   * Added to content element if its overlayed.
   */
  contentOverlay?: string;
  /**
   * Added to content element if its squared.
   */
  square?: string;
  /**
   * Added to content element if its wide.
   */
  wide?: string;
}

export interface CardMediaProps extends ReactToolbox.Props {
  /**
   * Forces a 16:9 or 1:1 aspect ratio respectively. Unset, the media area will have a flexible height.
   */
  aspectRatio?: "wide" | "square";
  /**
   * Children to pass through the component.
   */
  children?: React.ReactNode;
  /**
   * Sets the background color.
   */
  color?: string;
  /**
   * Creates a dark overlay underneath the child components.
   */
  contentOverlay?: boolean;
  /**
   * Can be used instead of children. Accepts an element or a URL string.
   */
  image?: React.ReactNode | string;
  /**
   * Classnames object defining the component style.
   */
  theme?: CardMediaTheme;
  /**
   * Additional properties passed to component root.
   */
  [key: string]: any;
}

export class CardMedia extends React.Component<CardMediaProps, {}> { }

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
  avatar?: React.ReactNode | string;
  /**
   * Children to pass through the component.
   */
  children?: React.ReactNode;
  /**
   * Text used for the sub header of the card.
   */
  subtitle?: React.ReactNode | string;
  /**
   * Classnames object defining the component style.
   */
  theme?: CardTitleTheme;
  /**
   * Text used for the title of the card.
   */
  title?: React.ReactNode | string;
}

export class CardTitle extends React.Component<CardTitleProps, {}> { }
