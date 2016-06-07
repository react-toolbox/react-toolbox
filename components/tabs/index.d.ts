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
export interface TabsProps extends Props, Changeable<number> {
	/**
	 * Current
	 */
	index: number,
}
export class Tabs extends React.Component<TabsProps, {}> {
	render(): React.DOMElement<any, any>;
}
export interface TabProps extends Props, Conditional {
	/**
	 * If true, the current component is visible.
	 * @default false
	 */
	active?: boolean,
	/**
	 * If true, the current component is not visible.
	 * @default false
	 */
	hidden?: boolean,
	/**
	 * Label text for navigation header
	 */
	label?: string,
	/**
	 * Callback function that is fired when the tab is activated.
	 */
	onActive?: Function,
}
export class Tab extends React.Component<TabProps, {}> {
	render(): React.DOMElement<any, any>;
}