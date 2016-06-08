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
/**
 * Properties of modal components (Drawer, Dialog)
 */
export interface Modal {
	/**
	 * If true, the dialog will be active.
	 */
	active: boolean,
	/**
	 * Callback called when the ESC key is pressed with the overlay active.
	 */
	onEscKeyDown?: Function,
	/**
	 * Callback to be invoked when the dialog overlay is clicked.
	 */
	onOverlayClick?: Function,
	/**
	 * Callback called when the mouse button is pressed on the overlay.
	 */
	onOverlayMouseDown?: Function,
	/**
	 * Callback called when the mouse is moving over the overlay.
	 */
	onOverlayMouseMove?: Function,
	/**
	 * Callback called when the mouse button is released over the overlay.
	 */
	onOverlayMouseUp?: Function,
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
export interface DialogProps extends Props, Modal {
	/**
	 * An array of objects representing the buttons for the dialog navigation area. The properties will be transferred to the buttons.
	 * @default []
	 */
	actions?: Array<ButtonProps>,
	/**
	 * The text string to use as standar title of the dialog.
	 */
	title?: string | boolean,
	/**
	 * Used to determine the size of the dialog. It can be small, normal or large.
	 * @default normal
	 */
	type?: string,
}
export default class Dialog extends React.Component<DialogProps, {}> {
	render(): React.DOMElement<any, any>;
}