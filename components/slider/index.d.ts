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
export interface SliderProps extends Props {
	/**
	 * If true, an input is shown and the user can set the slider from keyboard value.
	 */
	editable?: boolean,
	/**
	 * Maximum value permitted.
	 */
	max?: number,
	/**
	 * Minimum value permitted.
	 */
	min?: number,
	/**
	 * Callback function that will be invoked when the slider value changes.
	 */
	onChange?: Function,
	/**
	 * If true, a pin with numeric value label is shown when the slider thumb is pressed. Use for settings for which users need to know the exact value of the setting.
	 */
	pinned?: boolean,
	/**
	 * If true, the slider thumb snaps to tick marks evenly spaced based on the step property value.
	 */
	snaps?: boolean,
	/**
	 * Amount to vary the value when the knob is moved or increase/decrease is called.
	 */
	step?: number,
	/**
	 * Current value of the slider.
	 */
	value: number,
}
export default class Slider extends React.Component<SliderProps, {}> {
	render(): React.DOMElement<any, any>;
}