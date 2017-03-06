import * as React from "react";
import ReactToolbox from "../index";

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
  image?: React.ReactNode;
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
export default CardMedia;
