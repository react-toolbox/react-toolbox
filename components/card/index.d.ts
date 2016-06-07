import * as React from 'react';
export interface Props {
	/**
	 * Sets a CSS class on the component.
	 */
	className?: string,
	id?: string;
	/**
	 * A key used to uniquely identify the element within an Array
	 */
	key?: string,
	/**
	 * Inline style
	 */
	style?: any,
	/**
	 * Tooltip text
	 * APPLIES ONLY IF THE COMPONENT IS WRAPPED WITH Tooltip.
	 * @see http://react-toolbox.com/#/components/tooltip
	 */
	tooltip?: string,
	/**
	 * Amount of time in miliseconds spent before the tooltip is visible.
	 * APPLIES ONLY IF THE COMPONENT IS WRAPPED WITH Tooltip.
	 * @see http://react-toolbox.com/#/components/tooltip
	 */
	tooltipDelay?: number,
	/**
	 * If true, the Tooltip hides after a click in the host component.
	 * APPLIES ONLY IF THE COMPONENT IS WRAPPED WITH Tooltip.
	 * @default true
	 * @see http://react-toolbox.com/#/components/tooltip
	 */
	tooltipHideOnClick?: boolean,
}
export interface Iconic {
	/**
	 * Value of the icon (See icon component).
	 */
	icon?: string | __React.ReactElement<any> | __React.ReactHTMLElement<any>,
}

export interface Conditional {
	/**
	 * If true, component will be disabled
	 * @default false
	 */
	disabled?: boolean
}

/**
 * Properties of components that can be clicked
 */
export interface Clickable {
	/**
	 *  Callback called when the button is clicked.
	 */
	onClick?: Function
}
export interface ButtonProps extends Props, Clickable, Conditional, Iconic {
	/**
	 * Indicates if the button should have accent color.
	 * @default false
	 */
	accent?: boolean,
	/**
	 * If true, the button will have a flat look.
	 * @default false
	 */
	flat?: boolean,
	/**
	 * If true, the button will have a floating look.
	 * @default false
	 */
	floating?: boolean,
	/**
	 * If specified, the button will be rendered as an <a>
	 */
	href?: string,
	/**
	 * The text string to use for the name of the button.
	 */
	label?: string,
	/**
	 * If true, component will be disabled and show a loading animation.
	 * @default false
	 */
	loading?: boolean,
	/**
	 * To be used with floating button. If true the button will be smaller. 
	 * @default false
	 */
	mini?: boolean,
	/**
	 * Indicates if the button should have primary color.
	 * @default false
	 */
	primary?: boolean,
	/**
	 * If true, the button will have a raised look.
	 * @default false
	 */
	raised?: boolean,
	/**
	 * If true, component will have a ripple effect on click.
	 * @default true
	 */
	ripple?: boolean,
}
export interface CardProps extends Props, Clickable {
	/**
	 * Child components, usually Card subcomponents.
	 */
	children?: any,
	/**
	 * Increases the shadow depth to appear elevated.
	 */
	raised?: boolean,
	/**
	 * Array of objects describing actions. These actions will be rendered as buttons and the object fields will be transferred to those.
	 * @default []
	 */
	actions?: Array<ButtonProps>,
	/**
	 * Sets HEX or RGBA color to add a colored layer to the heading.
	 */
	color?: string,
	/**
	 * URL to set as a background image in the heading.
	 */
	image?: string,
	
	/**
	 * Type of the component to display general modifications. It can be 'wide' for a larger card, 'image' if it's an image card or 'event' which shows just a title on top.
	 */
	type?: string,
}
/**
 * A Card is a piece of paper with unique related data that serves as an entry point to more detailed information. 
 * For example, a card could contain a photo, text, and a link about a single subject.
 * Cards are composed of multiple subcomponents in React Toolbox. 
 * You can combine each of the subcomponents to create all different Material Design Cards given in the spec.
 */
export class Card extends React.Component<CardProps, {}> {
	render(): React.DOMElement<any, any>;
}
export interface CardTitleProps extends Props {
	avatar?: string | React.ReactElement<any> | React.ReactHTMLElement<any> | React.ClassicComponent<any, any>,
	/**
	 * Children to pass through the component.
	 */
	children?: any,
	/**
	 * Sets a complementary smaller text under the title.
	 */
	subtitle?: string,
	/**
	 * Sets the title of the card.
	 */
	title?: string | boolean,
}
/**
 * A versatile title block that can be used in various places on the card, including the media area. 
 * This component can also display an avatar next to the title content.
 */
export class CardTitle extends React.Component<CardTitleProps, {}> {
	render(): React.DOMElement<any, any>;
}
export interface CardMediaProps extends Props {
	/**
	 * Forces a ('wide' 16:9) or ('square' 1:1) aspect ratio respectively. 
	 * Unset, the media area will have a flexible height.
	 * @default ''
	 */
	aspectRatio?: string,
	/**
	 * Usually an image/video element or a <CardTitle> component.
	 */
	children?: any,
	/**
	 * Sets the background color
	 */
	color?: string,
	/**
	 * Creates a dark overlay underneath the child components.
	 */
	contentOverlay?: boolean,
	/**
	 * Can be used instead of children. Accepts an element or a URL string.
	 */
	image?: string | React.ReactElement<any> | React.ReactHTMLElement<any> | React.ClassicComponent<any, any>,
}
/**
 * Used for displaying media such as images or videos on a card. 
 * Can also be used with a solid background color instead of an image.
 */
export class CardMedia extends React.Component<CardMediaProps, {}> {
	render(): React.DOMElement<any, any>;
}
export interface CardTextProps extends Props {
	/**
	 * Children to pass through the component.
	 */
	children?: any,
}
/**
 * Basic card content container. 
 * Good for small descriptions or other supplementary text.
 */
export class CardText extends React.Component<CardTextProps, {}> {
	render(): React.DOMElement<any, any>;
}
export interface CardActionsProps extends Props {
	/**
	 * Children to pass through the component.
	 */
	children?: any,
}
/**
 * This component is used as a container for supplemental card actions. 
 * Supplemental actions within the card are explicitly called out using icons, text, and UI controls, typically placed at the bottom of the card.
 */
export class CardActions extends React.Component<CardActionsProps, {}> {
	render(): React.DOMElement<any, any>;
}