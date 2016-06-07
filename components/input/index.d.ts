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

export interface Iconic {
	/**
	 * Value of the icon (See icon component).
	 */
	icon?: string | __React.ReactElement<any> | __React.ReactHTMLElement<any>,
}

export interface InputProps extends Props, Conditional, Changeable<string>, Iconic {
	/**
	 * Give an error string to display under the field.
	 */
	error?: string,
	/**
	 * Indicates if the label is floating in the input field or not.
	 * @default true
	 */
	floating?: boolean,
	/**
	 * The text string to use for the floating label element.
	 */
	label?: string,
	/**
	 * Specifies the maximum number of characters allowed in the component.
	 */
	maxLength?: number,
	/**
	 * If true, a textarea element will be rendered. The textarea also grows and shrinks according to the number of lines.
	 * @default false
	 */
	multiline?: boolean,
	/**
	 * Callback function that is fired when components is blurred.
	 */
	onBlur?: Function,
	/**
	 * Callback function that is fired when components is focused.
	 */
	onFocus?: Function,
	/**
	 * Callback function that is fired when a key is pressed down.
	 */
	onKeyDown?: Function,
	/**
	 * Callback function that is fired when a key is pressed.
	 */
	onKeyPress?: Function,
	/**
	 * Callback function that is fired when a key is released.
	 */
	onKeyUp?: Function,
	/**
	 * If true, the html input has a required value.
	 * @default false
	 */
	required?: boolean,
	/**
	 * Type of the input element. It can be a valid HTML5 input type
	 * @default text
	 */
	type?: string,
	/**
	 * Current value of the input element.
	 */
	value?: string,
}
export default class Input extends React.Component<InputProps, {}> {
	render(): React.DOMElement<any, any>;
}