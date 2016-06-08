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
export interface Clickable {
	/**
	 *  Callback called when the button is clicked.
	 */
	onClick?: Function
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

export interface ListProps extends Props {
	/**
	 * If true, each element in the list will have a ripple effect on click
	 * @default false
	 */
	ripple?: boolean,
	/**
	 * If true, the elements in the list will display a hover effect and a pointer cursor.
	 * @default false
	 */
	selectable?: boolean,
}
export class List extends React.Component<ListProps, {}> {
	render(): React.DOMElement<any, any>;
}
export interface ListItemProps extends Props, Conditional, Clickable {
	/**
	 * A string URL to specify an avatar in the left side of the item.
	 */
	avatar?: string,
	/**
	 * Main text of the item. Required.
	 */
	caption?: string,
	/**
	 * An element that will be displayed as the item. If set, this will override `caption` and `legend`.
	 */
	itemContent?: React.ReactElement<any>,
	/**
	 * 	A list of elements that are placed on the left side of the item and after the avatar attribute.
	 */
	leftActions?: React.ReactElement<any>[],
	/**
	 * A string key of a font icon to display an icon in the left side of the item.
	 */
	leftIcon?: string,
	/**
	 * Secondary text to display under the caption.
	 */
	legend?: string,
	/**
	 * 	A list of elements that are placed on the right side of the item and after the rightIcon attribute.
	 */
	rightActions?: React.ReactElement<any>[],
	/**
	 * The same as the leftIcon but in this case the icon is displayed in the right side.
	 */
	rightIcon?: string,
	/**
	 * If true, the item displays a ripple effect on click. By default it's inherited from the parent element.
	 * @default false
	 */
	ripple?: boolean,
	/**
	 * If true, the elements in the list will display a hover effect and a pointer cursor. Inherited from the parent
	 * @default false
	 */
	selectable?: boolean,
	/**
	 * In case you want to provide the item as a link, you can pass this property to specify the href.
	 */
	to?: string;
}
export class ListItem extends React.Component<ListItemProps, {}> {
	render(): React.DOMElement<any, any>;
}
export interface ListCheckboxProps extends Props, Conditional, Changeable<boolean> {
	/**
	 * Main text of the item. Required.
	 */
	caption?: string,
	/**
	 * If true the checkbox appears checked by default.
	 * @default false
	 */
	checked: boolean,
	/**
	 * Secondary text to display under the caption.
	 */
	legend?: string,
	/**
	 * Name for the checkbox input item.
	 */
	name?: string,
	/**
	 * Callback called when the input element is blurred.
	 */
	onBlur?: Function,
	/**
	 * Callback called when the input element is focused.
	 */
	onFocus?: Function,
}
export class ListCheckbox extends React.Component<ListCheckboxProps, {}> {
	render(): React.DOMElement<any, any>;
}
export interface ListSubHeaderProps extends Props {
	/**
	 * List header caption.
	 */
	caption: string;
}
export class ListSubHeader extends React.Component<ListSubHeaderProps, {}> {
	render(): React.DOMElement<any, any>;
}
export interface ListDividerProps extends Props {
	/**
	 * Indicates if the divider should be full width or should leave a space on the left side.
	 */
	inset: boolean;
}
export class ListDivider extends React.Component<ListDividerProps, {}> {
	render(): React.DOMElement<any, any>;
}