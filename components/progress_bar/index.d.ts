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
export interface ProgressBarProps extends Props {
	/**
	 * Value of a secondary progress bar useful for buffering.
	 */
	buffer?: number,
	/**
	 * Maximum value permitted.
	 */
	max?: number, // 
	/**
	 * minimum value permitted.
	 */
	min?: number, // 
	/**
	 * Mode of the progress bar, it can be determinate or indeterminate.
	 */
	mode?: string, // 
	/**
	 * If true, the circular progress bar will be changing its color.
	 */
	multicolor?: boolean, // 
	/**
	 * Type of the progress bar, it can be circular or linear.
	 * @default linear
	 */
	type?: string,
	/**
	 * Value of the current progress.
	 */
	value?: number,
}
export default class ProgressBar extends React.Component<ProgressBarProps, {}> {
	render(): React.DOMElement<any, any>;
}