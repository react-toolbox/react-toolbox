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

export interface RadioGroupProps extends Props, Conditional, Changeable<any> {
	/**
	 * Name for the input element group.
	 */
	name?: string,
	/**
	 * Default value selected in the radio group.
	 */
	value?: any,
}
export class RadioGroup extends React.Component<RadioGroupProps, {}> {
	render(): React.DOMElement<any, any>;
}
export interface RadioButtonProps extends Props, Conditional {
	/**
	 * If true, the input element will be selected by default. Transferred from the parent.
	 */
	checked?: boolean,
	/**
	 * 	Label for the radio button.
	 */
	label?: string;
	/**
	 * Name for the input element.
	 */
	name?: string,
	/**
	 * Callback function that will be invoked when the input is blurred.
	 */
	onBlur?: Function,
	/**
	 * Callback function that will be invoked when the value changes.
	 */
	onChange?: Function,
	/**
	 * Callback function that will be invoked when the input is focused.
	 */
	onFocus?: Function,
	/**
	 * Value for the radio button.
	 */
	value: any,
}
export class RadioButton extends React.Component<RadioButtonProps, {}> {
	render(): React.DOMElement<any, any>;
}