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

// Interface for components with icons
export interface Iconic {
	/**
	 * Value of the icon (See icon component).
	 */
	icon?: string | React.ReactElement<any> | React.ReactHTMLElement<any>,
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
/**
 * A button clearly communicates what action will occur when the user touches it. 
 * It consists of text, an image, or both, designed in accordance with your app’s color theme.
 */
export class Button extends React.Component<ButtonProps, {}> {
	render(): React.DOMElement<any, any>;
}

export class IconButton extends React.Component<ButtonProps, {}> {
	render(): React.DOMElement<any, any>;
}