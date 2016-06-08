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
export interface Conditional {
	/**
	 * If true, component will be disabled
	 * @default false
	 */
	disabled?: boolean
}
export interface Option<T> {
	label: string,
	value: T,
}
/**
 * Properties of components that have values that can be changed (T is the type of the value)
 */
export interface Changeable<T> {
	/**
	 * Callback called when the picker value is changed.
	 * @param v Type of the value
	 */
	onChange?: (v: T) => void
}
export interface DropdownProps extends Props, Changeable<any>, Conditional {
	/**
	 * If true, the dropdown will open up or down depending on the position in the screen.
	 */
	auto?: boolean,
	/**
	 * The text string to use for the floating label element.
	 */
	label?: string,
	/**
	 * Array of data objects with the data to represent in the dropdown.
	 */
	source: Array<Option<any>>,
	/**
	 * Callback function that returns a JSX template to represent the element.
	 */
	template?: Function,
	/**
	 * Default value using JSON data.
	 */
	value: string,
}

export default class Dropdown extends React.Component<DropdownProps, {}> {
	render(): React.DOMElement<any, any>;
}