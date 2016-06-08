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
export interface Iconic {
	/**
	 * Value of the icon (See icon component).
	 */
	icon?: string | React.ReactElement<any> | React.ReactHTMLElement<any>,
}
export interface AvatarProps extends Props, Iconic {
	children?: any,
	image?: string | React.ReactElement<any> | React.ReactHTMLElement<any> | React.ClassicComponent<any, any>,
	title?: string | boolean,
}
/**
 * Avatars can be used to represent people. 
 * For personal avatars, offer personalization options. 
 * As users may choose not to personalize an avatar, provide delightful defaults. 
 * When used with a specific logo, avatars can also be used to represent brand.
 */
export default class Avatar extends React.Component<AvatarProps, {}> {
	render(): React.DOMElement<any, any>;
}