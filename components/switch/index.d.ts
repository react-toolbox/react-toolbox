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
export interface SwitchProps extends Props, Conditional {
	/**
	 * If true, the switch will be enabled.
	 */
	checked: boolean,
	/**
	 * If true, component will be disabled.
	 */
	disabled?: boolean,
	/**
	 * The text string to use for the floating label element.
	 */
	label?: string,
	/**
	 * The text string used as name of the input.
	 */
	name?: string,
	/**
	 * Callback function that is fired when when the switch is blurred.
	 */
	onBlur?: Function,
	/**
	 * Callback function that is fired when the components's value changes.
	 */
	onChange?: Function,
	/**
	 * Callback function fire when the switch is focused.
	 */
	onFocus?: Function,
}
export default class Switch extends React.Component<SwitchProps, {}> {
	render(): React.DOMElement<any, any>;
}