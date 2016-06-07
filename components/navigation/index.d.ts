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

export interface NavigationProps extends Props {
	/**
	 * Array of objects that represent buttons so the keys will be transferred as properties to those.
	 */
	actions?: Array<ButtonProps>,
	/**
	 * Array of objects similar to actions but that will be rendered as <Link/> component definition.
	 */
	routes?: Array<LinkProps>,
	/**
	 * Type of the navigation, it can be 'vertical' or 'horizontal'.
	 */
	type?: string,
}
export default class Navigation extends React.Component<NavigationProps, {}> {
	render(): React.DOMElement<any, any>;
}