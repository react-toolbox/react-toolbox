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

export interface SnackbarProps extends Props, Modal, Iconic {
	/**
	 * For the action component inside the Snackbar.
	 */
	action?: string,
	/**
	 * Text to display in the content.
	 */
	label?: string,
	/**
	 * Callback function that will be called when the button action is clicked.
	 */
	onClick?: Function,
	/**
	 * Callback function when finish the set timeout.
	 */
	onTimeout?: Function, 
	/**
	 * amount of time after the Snackbar will be automatically hidden.
	 */
	timeout?: number,
	/**
	 * Indicates the action type. Can be 'accept', 'warning' or 'cancel'
	 */
	type?: string,
}
export default class Snackbar extends React.Component<SnackbarProps, {}> {
	render(): React.DOMElement<any, any>;
}