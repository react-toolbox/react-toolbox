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

export interface ChipProps extends Props {
	/**
	 * 	Child components, usually Avatar and inline elements
	 */
	children?: React.ReactNode;
	/**
	 * If true, the chip will be rendered with a delete icon.
	 */
	deletable?: boolean;
	/**
	 * Callback to be invoked when the delete icon is clicked.
	 */
	onDeleteClick?: React.MouseEventHandler
}
/**
 * Avatars can be used to represent people. 
 * For personal avatars, offer personalization options. 
 * As users may choose not to personalize an avatar, provide delightful defaults. 
 * When used with a specific logo, avatars can also be used to represent brand.
 */
export default class Chip extends React.Component<ChipProps, {}> {
	render(): React.ReactElement<any>;
}