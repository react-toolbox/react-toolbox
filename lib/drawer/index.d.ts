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
export interface DrawerProps extends Props, Modal {
	/**
	 * Type of drawer. It can be 'left' or 'right' to display the drawer on the left or right side of the screen.
	 * @default left
	 */
	type?: string
}
export default class Drawer extends React.Component<DrawerProps, {}> {
	render(): React.DOMElement<any, any>;
}