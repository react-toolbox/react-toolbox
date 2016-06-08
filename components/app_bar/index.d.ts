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

export interface AppBarProps extends Props {
	/**
	 * If true, the AppBar shows a shadow.
	 * @default false
	 */
	flat?: boolean,
	/**
	 * Determine if the bar should have position fixed (true) or relative (false)
	 * @default false
	 */
	fixed?: boolean,
}
/**
 * The app bar is a special kind of toolbar that’s used for branding, navigation, search, and actions. 
 * Usually it contains controls on the right and left side and a title with the current section or app name. 
 * You should give the content with children elements.
 */
export default class AppBar extends React.Component<AppBarProps, {}> {
	render(): React.DOMElement<any, any>;
}