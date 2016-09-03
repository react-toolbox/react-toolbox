import * as React from "react";
import ReactToolbox from "../index";

export interface CardTheme {
  card?: string;
  raised?: string;
}

interface CardProps extends ReactToolbox.Props {
  /**
   * Children to pass through the component.
   */
  children?: React.ReactNode;
  raised?: boolean;
  /**
   * Classnames object defining the component style.
   */
  theme?: CardTheme;
}

export class Card extends React.Component<CardProps, {}> { }

export interface CardActionsTheme {
  cardActions?: string;
}

interface CardActionsProps extends ReactToolbox.Props {
  /**
   * Children to pass through the component.
   */
  children?: React.ReactNode;
  /**
   * Classnames object defining the component style.
   */
  theme?: CardActionsTheme;
}

export class CardActions extends React.Component<CardActionsProps, {}> { }

export interface CardMediaTheme {
  cardMedia?: string;
  content?: string;
  contentOverlay?: string;
  square?: string;
  wide?: string;
}

interface CardMediaProps extends ReactToolbox.Props {
  aspectRatio?: "wide" | "square";
  /**
   * Children to pass through the component.
   */
  children?: React.ReactNode;
  color?: string;
  contentOverlay?: boolean;
  image?: React.ReactNode | string;
  /**
   * Classnames object defining the component style.
   */
  theme?: CardMediaTheme;
}

export class CardMedia extends React.Component<CardMediaProps, {}> { }

export interface CardTextTheme {
  cardText?: string;
}

interface CardTextProps extends ReactToolbox.Props {
  /**
   * Children to pass through the component.
   */
  children?: React.ReactNode;
  /**
   * Classnames object defining the component style.
   */
  theme?: CardTextTheme;
}

export class CardText extends React.Component<CardTextProps, {}> { }

export interface CardTitleTheme {
  large?: string;
  title?: string;
  small?: string;
  subtitle?: string;
}

interface CardTitleProps extends ReactToolbox.Props {
  avatar?: React.ReactNode | string;
  /**
   * Children to pass through the component.
   */
  children?: React.ReactNode;
  subtitle?: React.ReactNode | string;
  /**
   * Classnames object defining the component style.
   */
  theme?: CardTitleTheme;
  title?: React.ReactNode | string;
}

export class CardTitle extends React.Component<CardTitleProps, {}> { }
