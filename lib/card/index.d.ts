import __ReactToolbox from "../index.d.ts";

export interface CardTheme {
  card?: string;
  raised?: string;
}

interface CardProps extends __ReactToolbox.Props {
  /**
   * Children to pass through the component.
   */
  children?: __React.ReactNode;
  raised?: boolean;
  /**
   * Classnames object defining the component style.
   */
  theme?: CardTheme;
}

export class Card extends __React.Component<CardProps, {}> { }

export interface CardActionsTheme {
  cardActions?: string;
}

interface CardActionsProps extends __ReactToolbox.Props {
  /**
   * Children to pass through the component.
   */
  children?: __React.ReactNode;
  /**
   * Classnames object defining the component style.
   */
  theme?: CardActionsTheme;
}

export class CardActions extends __React.Component<CardActionsProps, {}> { }

export interface CardMediaTheme {
  cardMedia?: string;
  content?: string;
  contentOverlay?: string;
  square?: string;
  wide?: string;
}

interface CardMediaProps extends __ReactToolbox.Props {
  aspectRatio?: "wide" | "square";
  /**
   * Children to pass through the component.
   */
  children?: __React.ReactNode;
  color?: string;
  contentOverlay?: boolean;
  image?: __React.ReactNode | string;
  /**
   * Classnames object defining the component style.
   */
  theme?: CardMediaTheme;
}

export class CardMedia extends __React.Component<CardMediaProps, {}> { }

export interface CardTextTheme {
  cardText?: string;
}

interface CardTextProps extends __ReactToolbox.Props {
  /**
   * Children to pass through the component.
   */
  children?: __React.ReactNode;
  /**
   * Classnames object defining the component style.
   */
  theme?: CardTextTheme;
}

export class CardText extends __React.Component<CardTextProps, {}> { }

export interface CardTitleTheme {
  large?: string;
  title?: string;
  small?: string;
  subtitle?: string;
}

interface CardTitleProps extends __ReactToolbox.Props {
  avatar?: __React.ReactNode | string;
  /**
   * Children to pass through the component.
   */
  children?: __React.ReactNode;
  subtitle?: __React.ReactNode | string;
  /**
   * Classnames object defining the component style.
   */
  theme?: CardTitleTheme;
  title?: __React.ReactNode | string;
}

export class CardTitle extends __React.Component<CardTitleProps, {}> { }
